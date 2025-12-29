// Shared types and schemas
// Used by both client and server

import { z } from 'zod'

// Common field schemas
export const emailField = z.string().email('Invalid email')
export const phoneField = z.string().regex(/^[+]?[\d\s-()]+$/, 'Invalid phone')
export const urlField = z.string().url('Invalid URL')
export const uuidField = z.string().uuid('Invalid ID')

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(['asc', 'desc']).default('desc'),
})

export type PaginationQuery = z.infer<typeof paginationSchema>

// API Response wrapper
export interface ApiResponse<T> {
  data: T
  meta?: {
    total: number
    page: number
    pageSize: number
  }
}

// Add entity schemas here following pattern:
// notes/patterns/forms/validation-schema.txt
