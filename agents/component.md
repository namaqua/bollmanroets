# Component Builder Agent

## Purpose
Build UI components from spec, using Tailwind UI references.

## Reference Library
Location: `notes/tailwindui/`
Index: `notes/tailwindui/index.md`

## Process

### Step 1: Check requirement
What component is needed?
- Type (modal, table, form, card, etc.)
- Purpose
- Data it displays/collects

### Step 2: Scan index
Is there a relevant Tailwind UI reference?
Check `notes/tailwindui/index.md` for available components.

### Step 3: Load reference
Read the .txt file for the closest match.

### Step 4: Adapt
Modify for:
- Project entity/types from master.md
- Specific props needed
- Integration with existing components
- TypeScript types

### Step 5: Output
Place in appropriate location:
- Base UI: `src/client/components/ui/`
- Forms: `src/client/components/forms/`
- Domain-specific: `src/client/components/{domain}/`

## Component Standards

### Props
```typescript
interface ComponentProps {
  // Required props first
  data: EntityType
  // Optional props with defaults
  variant?: 'default' | 'compact'
  // Event handlers
  onAction?: () => void
}
```

### Structure
```typescript
export function ComponentName({ data, variant = 'default', onAction }: ComponentProps) {
  // Hooks at top
  // Event handlers
  // Render
}
```

## Rules
- Always check tailwindui/ first before building from scratch
- Reference is a starting point, not copy-paste
- Maintain project's type conventions
- Keep POC-simple — don't over-engineer the reference
- Export from component index files
