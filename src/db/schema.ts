// Database schema
// Add entity tables here following pattern: notes/patterns/db/schema-entity.txt

import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

// ===========================================
// SESSION TRACKING (do not modify)
// ===========================================

export const sessions = pgTable('_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectSlug: text('project_slug').notNull(),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  endedAt: timestamp('ended_at', { withTimezone: true }),
  status: text('status').default('active'),
  
  // Context
  currentFocus: text('current_focus'),
  accomplished: text('accomplished'),
  decisions: text('decisions'),
  blockers: text('blockers'),
  nextSteps: text('next_steps'),
  
  // Metadata
  filesTouched: text('files_touched'),
  entitiesModified: text('entities_modified'),
  notes: text('notes'),
})

export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert

// ===========================================
// PROJECT ENTITIES (add below)
// ===========================================

// Example entity - replace with your domain entities
export const examples = pgTable('examples', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  
  // Audit fields
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export type Example = typeof examples.$inferSelect
export type NewExample = typeof examples.$inferInsert
