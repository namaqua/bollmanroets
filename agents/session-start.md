# Session Start Agent

## Purpose
Load context from previous session when starting work on this project.

## Trigger
User says: "session start", "start session", "resume", "where were we"

## Process

### Step 1: Load Session Context
Query the session table for this project:

```sql
SELECT * FROM _sessions 
WHERE project_slug = '{slug from master.md}'
ORDER BY ended_at DESC 
LIMIT 1;
```

### Step 2: Present Context
If session found, present:

**Last Session: {ended_at}**

**Status:** {status}

**Working On:**
{current_focus}

**Recent Decisions:**
{decisions}

**Blockers/Questions:**
{blockers}

**Next Steps (from last session):**
{next_steps}

### Step 3: Confirm
Ask: "Continue from here, or start fresh?"

If continue → proceed with context loaded
If fresh → note previous session, start clean

### Step 4: Log Session Start
```sql
INSERT INTO _sessions (project_slug, started_at, status, current_focus)
VALUES ('{slug}', NOW(), 'active', '{confirmed focus}');
```

## If No Previous Session
Say: "No previous session found. What are we working on today?"

Then create new session record.

## Rules
- Always check master.md for project_slug
- Present context concisely
- Don't overwhelm with old details
- Focus on actionable next steps
