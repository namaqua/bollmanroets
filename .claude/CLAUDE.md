# Skeleton Project Template

## Session Start Directive

When a conversation begins (you see "Session start" in the first message), automatically execute:

1. **Read Project Config**
   Read `master.md` to get project slug and context

2. **Load Session Context**
   ```sql
   SELECT * FROM _sessions
   WHERE project_slug = '{slug from master.md}'
   ORDER BY ended_at DESC
   LIMIT 1;
   ```
   Present: status, current_focus, decisions, blockers, next_steps

3. **Start Dev Servers** (in background)
   - Backend: `npm run dev` (http://localhost:3004)
   - Frontend: `npm run dev:client` (http://localhost:5177)

4. **Confirm Direction**
   Ask: "Continue from here, or start fresh?"

## Session End Directive

When user says "wrap up", "stopping for now", "end session", or "save session":

1. Summarize: accomplishments, decisions, current state, blockers, next steps
2. Present summary and confirm with user
3. Persist to `_sessions` table (UPDATE with ended_at = NOW())
4. Confirm saved

## Standing Directives

- Always read `master.md` for project slug, context, and constraints
- After code changes, restart relevant dev server
- Reference `agents/` directory for specialized workflows
- Use `handoff/requirements/` for feature specifications

## Quick Reference

- Config: `master.md` (fill in Slug, Name, Domain Model)
- DB prefix: Set in master.md
- Backend: Hono + Drizzle + PostgreSQL
- Frontend: React + Vite + TailwindCSS
- Agents: See `agents/` directory
