# CRUD Generator Agent

## Purpose
Generate complete CRUD implementation for an entity.

## Input
- Entity name
- Schema definition (from `src/db/schema.ts` or requirement)
- Reference: `handoff/requirements/REQ-{slug}.md`

## Output
Creates:
1. `src/db/schema.ts` — Entity table definition (if not exists)
2. `src/server/routes/{entity}.ts` — API routes
3. `src/client/pages/{entity}/index.tsx` — List page
4. `src/client/pages/{entity}/[id].tsx` — Detail/edit page
5. `src/client/components/forms/{Entity}Form.tsx` — Form component

## Process

### Step 1: Schema
Check if entity exists in `src/db/schema.ts`.
If not, generate using pattern: `notes/patterns/db/schema-entity.txt`

### Step 2: Validation
Generate Zod schema in `src/shared/types.ts`
Using pattern: `notes/patterns/forms/validation-schema.txt`

### Step 3: API Routes
Generate Hono routes using pattern: `notes/patterns/api/crud-routes.txt`
Include:
- GET / — list all
- GET /:id — get one
- POST / — create
- PUT /:id — update
- DELETE /:id — delete

### Step 4: List Page
Generate using:
- Tailwind UI reference for table layout
- Pattern: `notes/patterns/tables/basic-table.txt`
- Hook: `notes/patterns/hooks/use-crud.txt`

### Step 5: Form Component
Generate using:
- Tailwind UI reference for form layout
- Pattern: `notes/patterns/forms/basic-form.txt`

### Step 6: Detail Page
Combine form component with page wrapper.

## Rules
- Check master.md for project conventions
- Use existing shared types where possible
- Keep POC-simple — no pagination, filtering, sorting unless specified
- Include basic loading/error states only
