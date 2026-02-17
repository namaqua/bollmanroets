# Guard Security Audit: Contact Form Abuse Prevention

**Audit Date:** 2026-02-17
**Scope:** Contact form anti-spam, anti-bot, and abuse prevention

## Files Reviewed

- `src/server/routes/contact.ts`
- `src/server/index.ts`
- `src/client/pages/contact.tsx`
- `src/client/lib/use-tracking.ts`
- `src/client/lib/session-tracking.ts`
- `src/client/lib/scroll-tracking.ts`
- `src/client/lib/tracking.ts`

---

## Current Defenses

| Defense | Status |
|---|---|
| Rate limiting (IP-based, 5/hour) | Present |
| Zod schema validation | Present |
| CSRF protection (Hono csrf middleware) | Present |
| CORS origin whitelist | Present |
| Request body size limit (100KB) | Present |
| Honeypot field | **Missing** |
| Time-based form validation | **Missing** (data collected but never enforced) |
| CAPTCHA / challenge | **Missing** |
| Proof-of-work challenge | **Missing** |
| Client-side submit throttle | **Missing** |
| Bot behavioral analysis | **Missing** |

---

## Finding 1: No Honeypot Field (HIGH)

**What:** The form has zero invisible-field bot detection. Most spam bots auto-fill every field they find. A hidden field that humans never touch but bots populate is the single highest-value, zero-friction anti-spam measure.

**Where:**
- Client: `src/client/pages/contact.tsx` — no hidden field present
- Server: `src/server/routes/contact.ts` — no honeypot field in schema or validation

**Fix — Client side** (`contact.tsx`): Add a hidden input inside the form (visually hidden via CSS, not `display:none` or `type="hidden"` — bots detect those):

```tsx
{/* Honeypot - invisible to humans, bots will fill it */}
<div aria-hidden="true" style={{
  position: 'absolute',
  left: '-9999px',
  top: '-9999px',
  height: 0,
  width: 0,
  overflow: 'hidden',
  tabIndex: -1,
}}>
  <label htmlFor="website">Website</label>
  <input
    type="text"
    id="website"
    name="website"
    autoComplete="off"
    tabIndex={-1}
    value={honeypotValue}
    onChange={(e) => setHoneypotValue(e.target.value)}
  />
</div>
```

Add state: `const [honeypotValue, setHoneypotValue] = useState('')`

In `onSubmit`, include it in the payload: `website: honeypotValue`

**Fix — Server side** (`contact.ts`): Add honeypot to the schema and reject if filled:

```typescript
// Add to contactSchema
website: z.string().max(0, 'Bot detected').optional().default(''),
```

In the route handler, before rate limiting:

```typescript
const data = c.req.valid('json') as ContactFormData

// Honeypot check - reject silently if filled
if (data.website && data.website.length > 0) {
  // Return success to not alert the bot
  return c.json({
    success: true,
    message: 'Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb eines Werktags.',
  })
}
```

Note: return a fake success response so the bot thinks it worked.

---

## Finding 2: `timeOnFormPage` Is Collected But Never Enforced (HIGH)

**What:** The tracking code already collects `timeOnFormPage` from `scroll-tracking.ts` and sends it to the server. But the server **never checks it**. A bot submitting the form in under 3 seconds is obviously not human. This is free behavioral detection already being collected but not used.

**Where:** `src/server/routes/contact.ts`, lines 212-257 — no time validation.

**Fix — Server side** (`contact.ts`): Add a minimum time check after Zod validation but before processing:

```typescript
// Time-based bot detection: humans take at least 5 seconds to fill a form
const MIN_FORM_TIME_SECONDS = 5

if (data.timeOnFormPage !== undefined && data.timeOnFormPage < MIN_FORM_TIME_SECONDS) {
  // Silent rejection — return fake success
  console.log('Bot detected: form submitted too fast', {
    timeOnFormPage: data.timeOnFormPage,
    ip: clientIp,
  })
  return c.json({
    success: true,
    message: 'Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb eines Werktags.',
  })
}
```

**Additional hardening — also flag missing `timeOnFormPage`:** If a bot strips the field entirely, that is suspicious. Normal browser clients always send it because the tracking library always produces it:

```typescript
if (data.timeOnFormPage === undefined || data.timeOnFormPage === 0) {
  console.log('Suspicious submission: no form time data', { ip: clientIp })
  // Still process but flag — don't hard-reject to avoid false positives
  // from users with aggressive privacy extensions
}
```

---

## Finding 3: No Client-Side Submit Throttle (MEDIUM)

**What:** The submit button is disabled while `isSubmitting` is true, but after a successful submission, a user (or script) can immediately submit again. There is no cooldown. The server rate limit catches this eventually (after 5 submissions), but the client should prevent rapid re-submission.

**Where:** `src/client/pages/contact.tsx`, lines 89-126 and line 300.

**Fix:** Add a cooldown timer after successful submission:

```tsx
const [cooldownUntil, setCooldownUntil] = useState<number>(0)

const onSubmit = async (data: ContactFormData) => {
  // Prevent submission during cooldown
  if (Date.now() < cooldownUntil) return

  setIsSubmitting(true)
  // ... existing logic ...

  if (response.ok) {
    setSubmitStatus('success')
    setCooldownUntil(Date.now() + 60_000) // 60-second cooldown
    reset()
  }
}
```

Update the button:

```tsx
<Button
  type="submit"
  size="lg"
  disabled={isSubmitting || Date.now() < cooldownUntil}
>
  {isSubmitting ? t.form.sending : t.buttons.sendMessage}
</Button>
```

---

## Finding 4: Rate Limiter IP Extraction Fragility (HIGH)

**What:** The IP is extracted as:
```typescript
const ip = c.req.header('x-real-ip') || 'unknown'
```

Two problems:

1. **If nginx does not set `X-Real-IP`**, every request is rate-limited under the key `'unknown'`, meaning one bot hitting the limit blocks ALL users.
2. **`X-Real-IP` can be spoofed** if the upstream proxy does not strip/override it. A bot can send a different `X-Real-IP` with each request, completely bypassing rate limiting.

**Where:** `src/server/routes/contact.ts`, line 214.

**Fix:** Use a more robust IP extraction chain:

```typescript
function getClientIp(c: Context): string {
  // X-Real-IP is set by our nginx reverse proxy (trusted)
  const realIp = c.req.header('x-real-ip')
  if (realIp) return realIp

  // X-Forwarded-For: take the first (leftmost) IP
  const forwarded = c.req.header('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0].trim()
    if (first) return first
  }

  // Fallback: use a sentinel that still rate-limits (stricter limit)
  return 'no-ip-detected'
}
```

Apply a **stricter** rate limit for the fallback sentinel:

```typescript
const effectiveMax = ip === 'no-ip-detected' ? 2 : RATE_LIMIT_MAX
```

---

## Finding 5: Rate Limit Store Has No Maximum Size (MEDIUM)

**What:** The `rateLimitStore` Map grows unbounded. An attacker spoofing different `X-Real-IP` values (or a botnet with many IPs) creates one Map entry per unique IP. The cleanup interval (every 10 minutes) only removes expired entries. During a sustained attack, memory grows linearly with unique IPs.

**Where:** `src/server/routes/contact.ts`, line 6.

**Fix:** Add a maximum size check:

```typescript
const MAX_RATE_LIMIT_ENTRIES = 10_000

function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || record.resetAt < now) {
    // Prevent unbounded growth
    if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
      // Evict expired entries first
      for (const [key, val] of rateLimitStore) {
        if (val.resetAt < now) rateLimitStore.delete(key)
      }
      // If still too large, reject new IPs (fail closed)
      if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
        return { allowed: false, remaining: 0 }
      }
    }
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}
```

---

## Finding 6: No Email-Based Rate Limiting (MEDIUM)

**What:** Rate limiting is IP-only. An attacker behind a rotating proxy (Tor, residential proxies, botnet) can submit the same email address from thousands of IPs, flooding the Web Leads API.

**Where:** `src/server/routes/contact.ts`, lines 172-187.

**Fix:** Add a parallel email rate limit store:

```typescript
const emailRateLimitStore = new Map<string, { count: number; resetAt: number }>()
const EMAIL_RATE_LIMIT_MAX = 3 // 3 per hour per email address

function rateLimitByEmail(email: string): { allowed: boolean } {
  const normalizedEmail = email.toLowerCase().trim()
  const now = Date.now()
  const record = emailRateLimitStore.get(normalizedEmail)

  if (!record || record.resetAt < now) {
    emailRateLimitStore.set(normalizedEmail, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= EMAIL_RATE_LIMIT_MAX) {
    return { allowed: false }
  }

  record.count++
  return { allowed: true }
}
```

Add to the cleanup interval:

```typescript
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore) {
    if (record.resetAt < now) rateLimitStore.delete(ip)
  }
  for (const [email, record] of emailRateLimitStore) {
    if (record.resetAt < now) emailRateLimitStore.delete(email)
  }
}, 10 * 60 * 1000)
```

In the handler, check **after** Zod validation (so you have the parsed email):

```typescript
const { allowed: emailAllowed } = rateLimitByEmail(data.email)
if (!emailAllowed) {
  return c.json({
    success: false,
    error: 'Too many requests for this email. Please try again later.',
  }, 429)
}
```

---

## Finding 7: No Web Leads Failure Alerting (LOW)

**What:** The handler always returns `{ success: true }` even if `submitToWebLeads` fails. This is intentional for UX ("graceful degradation"), but it means submissions can be silently lost without any alerting.

**Where:** `src/server/routes/contact.ts`, lines 245-256.

**Fix:** Add a consecutive failure counter:

```typescript
let consecutiveWebLeadsFailures = 0

// In handler:
if (!webLeadsResult.success) {
  consecutiveWebLeadsFailures++
  if (consecutiveWebLeadsFailures >= 5) {
    console.error('ALERT: Web Leads API has failed 5+ consecutive times')
  }
} else {
  consecutiveWebLeadsFailures = 0
}
```

---

## Finding 8: No CAPTCHA / Challenge Mechanism (ADVISORY)

**What:** There is no CAPTCHA. For a B2B corporate site with low traffic, this is acceptable if findings 1-6 are implemented. Reserve as escalation if passive measures prove insufficient.

**Recommendation:** If needed, **Cloudflare Turnstile** is the best fit:
- Free tier is generous
- Privacy-friendly (DSGVO/GDPR compliant)
- Invisible mode available (no user interaction)
- Small JS bundle (~15KB)

**Integration sketch (only if needed):**

Client:
```tsx
<div id="cf-turnstile" className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
```

Server:
```typescript
cfTurnstileResponse: z.string().min(1, 'Challenge required'),

const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: data.cfTurnstileResponse,
    remoteip: clientIp,
  }),
})
```

---

## Priority Implementation Order

| Priority | Finding | Effort | Impact |
|---|---|---|---|
| 1 | F1: Honeypot field | 30 min | Blocks ~80% of dumb bots |
| 2 | F2: Enforce `timeOnFormPage` | 10 min | Blocks fast-submit bots (zero new client code) |
| 3 | F4: Fix IP extraction | 15 min | Prevents rate-limit bypass |
| 4 | F6: Email-based rate limiting | 20 min | Blocks proxy-rotating attackers |
| 5 | F5: Rate limit store max size | 15 min | Prevents memory exhaustion DoS |
| 6 | F3: Client-side cooldown | 10 min | Reduces unnecessary server load |
| 7 | F8: Turnstile CAPTCHA | 1 hour | Nuclear option — only if above fails |
| 8 | F7: Web Leads failure alerting | 10 min | Operational visibility |

**Recommendation:** Implement findings 1-6 first. They are all zero-dependency, no-external-service changes that layer together for robust defense-in-depth. Reserve Turnstile (F8) as escalation only if passive measures prove insufficient.
