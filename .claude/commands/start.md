Execute the session-start workflow:

1. **Read Project Config**
   Read `master.md` to get the project slug (under `## Project` > `**Slug:**`)

2. **Load Previous Session**
   Query the _sessions table using the slug:
   ```sql
   SELECT * FROM _sessions
   WHERE project_slug = '{slug}'
   ORDER BY ended_at DESC
   LIMIT 1;
   ```

   If found, present:
   - Last session date
   - Status and current focus
   - Recent decisions
   - Blockers/questions
   - Next steps

3. **Start Dev Servers**
   Run both in background:
   - `npm run dev` (backend on :3000)
   - `npm run dev:client` (frontend on :5173)
   Verify both are responding.

4. **Confirm Direction**
   Ask: "Continue from here, or start fresh?"

   If continue: proceed with loaded context
   If fresh: note previous session, ask what to work on

5. **Log New Session**
   ```sql
   INSERT INTO _sessions (project_slug, started_at, status, current_focus)
   VALUES ('{slug}', NOW(), 'active', '{confirmed focus}');
   ```

If no previous session exists, ask: "No previous session found. What are we working on today?"

If project slug is not set in master.md, prompt user to run setup first.
