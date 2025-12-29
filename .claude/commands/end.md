Execute the session-end workflow:

1. **Read Project Config**
   Read `master.md` to get the project slug

2. **Summarize Session**
   Review the conversation and extract:
   - What was accomplished
   - Decisions made
   - Current state of work
   - Blockers or open questions
   - Logical next steps

3. **Present Summary**
   Show user:

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

4. **Persist to Database**
   After user confirms:
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

5. **Confirm**
   Say: "Session saved. Use `/start` to resume next time."

Rules:
- Always confirm summary before saving
- Keep summaries concise but complete
- Note file paths of work in progress
- Include unresolved questions
