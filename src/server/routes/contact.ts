import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Rate limiting store (in-memory for simplicity, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // 5 requests per hour

// Cleanup expired rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore) {
    if (record.resetAt < now) {
      rateLimitStore.delete(ip)
    }
  }
}, 10 * 60 * 1000)

// Web Leads API configuration
const WEBLEADS_API_URL = process.env.WEBLEADS_API_URL || 'https://dogfood.luluwaldhund.de/api/public/web-leads'

// Map frontend interest values to Web Leads API values
const interestValueMap: Record<string, string> = {
  discoveryDay: 'discovery_day',
  pilot: 'pilot_project',
  partnership: 'partnership_request',
  investment: 'investment_inquiry',
  general: 'general_question',
}

// Contact form schema with tracking fields
const contactSchema = z.object({
  // Required form fields
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().min(1, 'Company is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional(),
  interest: z.enum(['discoveryDay', 'pilot', 'partnership', 'investment', 'general']),
  message: z.string().min(1, 'Message is required').max(5000),
  privacy: z.boolean().refine((val) => val === true, 'Privacy consent required'),
  marketingConsent: z.boolean().optional(),

  // Source & Attribution
  sourceUrl: z.string().url().optional(),
  referrerUrl: z.string().nullable().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  utmContent: z.string().nullable().optional(),
  utmTerm: z.string().nullable().optional(),

  // Visitor Context
  timezone: z.string().optional(),
  browserLanguage: z.string().optional(),

  // Device & Browser
  deviceType: z.enum(['desktop', 'tablet', 'mobile']).optional(),
  os: z.string().optional(),
  browserName: z.string().optional(),
  browserVersion: z.string().nullable().optional(),
  screenResolution: z.string().optional(),

  // Session Data
  sessionId: z.string().optional(),
  entryPage: z.string().optional(),
  pagesViewed: z.array(z.string()).optional(),
  pageCount: z.number().int().optional(),
  timeOnSite: z.number().int().optional(),
  returningVisitor: z.boolean().optional(),
  scrollDepth: z.number().int().min(0).max(100).optional(),
  timeOnFormPage: z.number().int().optional(),

  // Form metadata
  formName: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

// Submit to Web Leads API
async function submitToWebLeads(
  data: ContactFormData,
  clientIp: string,
  userAgent: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.WEBLEADS_API_KEY

  if (!apiKey) {
    console.error('WEBLEADS_API_KEY not configured')
    return { success: false, error: 'API key not configured' }
  }

  // Build payload with all tracking fields
  // Only include non-null/non-undefined values
  const payload: Record<string, unknown> = {
    // Required fields
    name: data.name,
    company: data.company,
    email: data.email,
    interest: interestValueMap[data.interest] || 'general_question',
    message: data.message,
    privacyConsent: data.privacy,
  }

  // Optional form fields
  if (data.phone) payload.phone = data.phone
  if (data.marketingConsent !== undefined) payload.marketingConsent = data.marketingConsent
  if (data.formName) payload.formName = data.formName

  // Source & Attribution
  if (data.sourceUrl) payload.sourceUrl = data.sourceUrl
  if (data.referrerUrl) payload.referrerUrl = data.referrerUrl
  if (data.utmSource) payload.utmSource = data.utmSource
  if (data.utmMedium) payload.utmMedium = data.utmMedium
  if (data.utmCampaign) payload.utmCampaign = data.utmCampaign
  if (data.utmContent) payload.utmContent = data.utmContent
  if (data.utmTerm) payload.utmTerm = data.utmTerm

  // Visitor Context
  if (data.timezone) payload.timezone = data.timezone
  if (data.browserLanguage) payload.browserLanguage = data.browserLanguage

  // Device & Browser
  if (data.deviceType) payload.deviceType = data.deviceType
  if (data.os) payload.os = data.os
  if (data.browserName) payload.browserName = data.browserName
  if (data.browserVersion) payload.browserVersion = data.browserVersion
  if (data.screenResolution) payload.screenResolution = data.screenResolution

  // Session Data
  if (data.sessionId) payload.sessionId = data.sessionId
  if (data.entryPage) payload.entryPage = data.entryPage
  if (data.pagesViewed) payload.pagesViewed = data.pagesViewed
  if (data.pageCount !== undefined) payload.pageCount = data.pageCount
  if (data.timeOnSite !== undefined) payload.timeOnSite = data.timeOnSite
  if (data.returningVisitor !== undefined) payload.returningVisitor = data.returningVisitor
  if (data.scrollDepth !== undefined) payload.scrollDepth = data.scrollDepth
  if (data.timeOnFormPage !== undefined) payload.timeOnFormPage = data.timeOnFormPage

  try {
    const response = await fetch(WEBLEADS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'Origin': 'https://bollmann-roets.de',
        'X-Forwarded-For': clientIp,
        'User-Agent': userAgent,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Web Leads API error:', {
        status: response.status,
        error: typeof result === 'object' ? result.error || 'Unknown error' : 'Unknown error',
      })
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
  investment: { de: 'Investitionsanfrage', en: 'Investment Inquiry' },
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
    const ip = c.req.header('x-real-ip') || 'unknown'
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

    // Get client IP and User-Agent for forwarding to Web Leads API
    const clientIp = c.req.header('x-real-ip') || 'unknown'
    const userAgent = c.req.header('user-agent') || ''

    // Log submission metadata (no PII for DSGVO compliance)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      interest: interestLabels[data.interest]?.en || data.interest,
      messageLength: data.message.length,
      hasTracking: !!(data.sessionId || data.utmSource),
    })

    // Submit to Web Leads API (graceful degradation - don't fail user request if API fails)
    const webLeadsResult = await submitToWebLeads(data, clientIp, userAgent)
    console.log('Web Leads API result:', {
      success: webLeadsResult.success,
      id: webLeadsResult.id,
      error: webLeadsResult.error,
    })

    return c.json({
      success: true,
      message: 'Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb eines Werktags.',
    })
  }
)

// GET /api/contact/health - Health check for the contact endpoint
contact.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'contact' })
})

export { contact }
