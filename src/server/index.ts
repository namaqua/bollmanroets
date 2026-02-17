// Server entry point
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { contact } from './routes/contact'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:5177', 'https://br.luluwaldhund.de', 'https://bollmann-roets.de', 'https://www.bollmann-roets.de'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}))

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

// API routes
app.route('/api/contact', contact)

// Start server
const port = Number(process.env.PORT) || 3004

const server = Bun.serve({
  port,
  fetch: app.fetch,
})

console.log(`Server running on http://localhost:${server.port}`)
