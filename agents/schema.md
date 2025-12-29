# Schema Designer Agent

## Purpose
Design database schema from requirements.

## Input
- `handoff/requirements/REQ-{slug}.md`
- Existing `src/db/schema.ts`

## Output
- Updated `src/db/schema.ts`
- Corresponding Zod schemas in `src/shared/types.ts`

## Process

### Step 1: Extract Entities
From requirement, identify:
- Entities (nouns)
- Attributes (properties)
- Relationships (foreign keys)

### Step 2: Check Existing
Review `src/db/schema.ts` for:
- Existing entities to reference
- Naming conventions in use
- Common patterns

### Step 3: Design Tables
For each entity, define:
- Primary key (uuid)
- Required fields
- Optional fields
- Audit fields (createdAt, updatedAt, deletedAt)
- Foreign keys

Using pattern: `notes/patterns/db/schema-entity.txt`

### Step 4: Define Relations
Using pattern: `notes/patterns/db/relations.txt`

### Step 5: Generate Types
Create Zod schemas that match Drizzle schema.
Using pattern: `notes/patterns/forms/validation-schema.txt`

## POC Constraints
- Max 5 entities
- Prefer flat structures over deep nesting
- Defer complex relations to later iterations
- Use soft deletes (deletedAt) over hard deletes

## Naming Conventions
- Tables: plural, snake_case (`contacts`, `order_items`)
- Columns: snake_case (`created_at`)
- Types: PascalCase (`Contact`, `OrderItem`)
- Zod schemas: camelCase with Schema suffix (`contactSchema`)

## Rules
- Check master.md for project-specific constraints
- Always include audit fields
- Always export inferred types
- Keep schemas simple for POC
