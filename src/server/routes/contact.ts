import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Rate limiting store (in-memory for simplicity, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // 5 requests per hour

// Web Leads API configuration
const WEBLEADS_API_URL = 'https://dogfood.luluwaldhund.de/api/public/web-leads'

// Map frontend interest values to Web Leads API values
const interestValueMap: Record<string, string> = {
  discoveryDay: 'discovery_day',
  pilot: 'pilot_project',
  partnership: 'partnership_request',
  general: 'general_question',
}

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().min(1, 'Company is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional(),
  interest: z.enum(['discoveryDay', 'pilot', 'partnership', 'general']),
  message: z.string().min(1, 'Message is required').max(5000),
  privacy: z.boolean().refine((val) => val === true, 'Privacy consent required'),
})

type ContactFormData = z.infer<typeof contactSchema>

// Submit to Web Leads API
async function submitToWebLeads(
  data: ContactFormData,
  sourceUrl: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.WEBLEADS_API_KEY

  if (!apiKey) {
    console.error('WEBLEADS_API_KEY not configured')
    return { success: false, error: 'API key not configured' }
  }

  const payload: Record<string, unknown> = {
    name: data.name,
    company: data.company,
    email: data.email,
    interest: interestValueMap[data.interest] || 'general_question',
    message: data.message,
    privacyConsent: data.privacy,
    sourceUrl,
  }

  if (data.phone) {
    payload.phone = data.phone
  }

  try {
    const response = await fetch(WEBLEADS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'Origin': 'https://br.luluwaldhund.de',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Web Leads API error:', { status: response.status, result })
      return { success: false, error: result.error || 'Submission failed' }
    }

    return { success: true, id: result.id }
  } catch (error) {
    console.error('Web Leads API request failed:', error)
    return { success: false, error: 'Network error' }
  }
}

// Rate limit middleware
function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || record.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}

// Interest type labels for email
const interestLabels: Record<string, { de: string; en: string }> = {
  discoveryDay: { de: 'Discovery Day', en: 'Discovery Day' },
  pilot: { de: 'Pilotprojekt', en: 'Pilot Project' },
  partnership: { de: 'Partnerschaftsanfrage', en: 'Partnership Inquiry' },
  general: { de: 'Allgemeine Frage', en: 'General Question' },
}

const contact = new Hono()

// POST /api/contact - Submit contact form
contact.post(
  '/',
  zValidator('json', contactSchema, (result, c) => {
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }))
      return c.json({ success: false, errors }, 400)
    }
  }),
  async (c) => {
    // Get client IP for rate limiting
    const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown'
    const { allowed, remaining } = rateLimit(ip)

    // Set rate limit headers
    c.header('X-RateLimit-Limit', String(RATE_LIMIT_MAX))
    c.header('X-RateLimit-Remaining', String(remaining))

    if (!allowed) {
      return c.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        429
      )
    }

    const data = c.req.valid('json') as ContactFormData
    const sourceUrl = c.req.header('referer') || 'https://br.luluwaldhund.de/kontakt'

    // Log submission locally
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || 'not provided',
      interest: interestLabels[data.interest]?.en || data.interest,
      messageLength: data.message.length,
    })

    // Submit to Web Leads API (graceful degradation - don't fail user request if API fails)
    const webLeadsResult = await submitToWebLeads(data, sourceUrl)
    console.log('Web Leads API result:', {
      success: webLeadsResult.success,
      id: webLeadsResult.id,
      error: webLeadsResult.error,
    })

    return c.json({
      success: true,
      message: 'Thank you for your message. We will respond within one business day.',
    })
  }
)

// GET /api/contact/health - Health check for the contact endpoint
contact.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'contact' })
})

export { contact }
