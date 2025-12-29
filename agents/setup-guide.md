# Setup Guide Agent

## Purpose
Walk user through first-time project configuration after cloning skeleton.

## Trigger
User says: "setup", "configure", "first steps", "get started"

## Steps

### Step 1: Project Identity
**File:** `master.md`

Fill in the Project section:
- Name
- Slug
- Description  
- Repository (optional)
- Type

### Step 2: Environment
**File:** `.env`

Copy from `.env.example` and set:
- DATABASE_URL (PostgreSQL connection string)

Options:
- Local Docker: `postgresql://postgres:postgres@localhost:5432/mydb`
- Neon: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname`
- Supabase: `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres`

### Step 3: Features
**File:** `master.md`

Check features needed for POC:
- [ ] Authentication
- [ ] Multi-tenancy
- [ ] Soft deletes
- [ ] Audit timestamps

Keep minimal for POC.

### Step 4: Domain Model
**File:** `master.md`

List initial entities (max 5 for POC):
| Entity | Table | Description | Status |

### Step 5: Install & Verify
```bash
bun install
bun run db:push    # Creates tables including _sessions
bun run dev
```

The `_sessions` table is created automatically for session tracking.

## Checklist Output

When complete, confirm:
- [ ] master.md — Project section filled
- [ ] master.md — Features checked
- [ ] master.md — Domain Model drafted
- [ ] .env — DATABASE_URL set
- [ ] `bun install` — Dependencies installed
- [ ] `bun run db:push` — Schema pushed

## Next Steps
1. Say "session start" to begin tracked session
2. Drop raw requirements into `notes/input/`
3. Run requirement-digester agent
4. Build from `handoff/requirements/`
5. Say "session end" before stopping work
