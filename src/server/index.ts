// Server entry point
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

// API routes
// app.route('/api/contacts', contactRoutes)

// Start server
const port = process.env.PORT || 3004
console.log(`Server running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
