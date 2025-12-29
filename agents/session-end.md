# Session End Agent

## Purpose
Capture session context before ending work for persistence to next session.

## Trigger
User says: "session end", "end session", "wrap up", "stopping for now", "save session"

## Process

### Step 1: Summarize Session
Review conversation and extract:
- What was accomplished
- Decisions made
- Current state of work
- Any blockers or open questions
- Logical next steps

### Step 2: Confirm Summary
Present to user:

**Session Summary**

**Accomplished:**
- {list}

**Decisions Made:**
- {list}

**Current State:**
{description}

**Blockers/Questions:**
- {list or "None"}

**Suggested Next Steps:**
1. {step}
2. {step}
3. {step}

Ask: "Does this capture the session? Anything to add or change?"

### Step 3: Persist to Database
```sql
UPDATE _sessions 
SET 
  ended_at = NOW(),
  status = 'completed',
  accomplished = '{accomplished}',
  decisions = '{decisions}',
  current_focus = '{current state}',
  blockers = '{blockers}',
  next_steps = '{next steps}'
WHERE project_slug = '{slug}' 
  AND ended_at IS NULL;
```

### Step 4: Confirm
Say: "Session saved. Next time say 'session start' to resume."

## Rules
- Always confirm summary before saving
- Keep summaries concise but complete
- Focus on what's actionable for next session
- Include any unresolved questions
- Note file paths of work in progress
