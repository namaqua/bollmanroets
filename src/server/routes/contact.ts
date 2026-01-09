import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Rate limiting store (in-memory for simplicity, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // 5 requests per hour

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

    // Log submission (in production, store to database)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || 'not provided',
      interest: interestLabels[data.interest]?.en || data.interest,
      messageLength: data.message.length,
    })

    // TODO: Send email notification
    // await sendEmailNotification(data)

    // TODO: Send auto-responder to user
    // await sendAutoResponder(data.email, data.name)

    // TODO: Store submission in database for GDPR compliance
    // await storeSubmission(data, ip)

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
