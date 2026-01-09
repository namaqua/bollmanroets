# Project Configuration

## Project
- **Name:** Bollman & Roets
- **Slug:** bollman_roets
- **Description:** Corporate website for bespoke software consultancy
- **Repository:**
- **Type:** web-app

## Database
- **Provider:** PostgreSQL
- **Connection:** DATABASE_URL
- **Prefix:**

## Ports (Project #4)
| Service | Standard | This Project |
|---------|----------|--------------|
| Backend (Hono) | 3000 | 3004 |
| Frontend (Vite) | 5173 | 5177 |
| PostgreSQL | 5432 | 5432 (shared, db: `bollman_roets`) |
| Drizzle Studio | 4983 | 4987 |

## Domain Model
| Entity | Table | Description | Status |
|--------|-------|-------------|--------|
|        |       |             |        |

## Features
- [ ] Authentication
- [ ] Multi-tenancy
- [ ] Soft deletes
- [ ] Audit timestamps
- [ ] API versioning
- [ ] Rate limiting

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Bun | Fast, built-in TS |
| Framework | Hono | Light, flexible |
| ORM | Drizzle | Type-safe, light |
| Validation | Zod | Shared client/server |
| Frontend | React | Claude fluency |
| UI | Tailwind UI | Component library |
| Forms | React Hook Form | Claude generates well |
| Tables | TanStack Table | Powerful, typed |
| Data fetching | TanStack Query | Caching, mutations |
| State | Zustand | Simple, scalable |

## Agents

### Orchestrator
| Agent | Model | Purpose |
|-------|-------|---------|
| alfred | opus | Coordinate all agents, break down features |

### Session & Setup
| Agent | Purpose |
|-------|---------|
| setup-guide | First-time project configuration |
| session-start | Load context from previous session |
| session-end | Save context for next session |

### Development
| Agent | Purpose |
|-------|---------|
| requirement-digester | Transform raw requirements to specs |
| crud | Generate entity CRUD |
| component | Build UI from spec |
| schema | Design tables from requirements |
| refactor | Code improvements |

### Sub-Agents (under Alfred)
| Agent | Model | Specialization |
|-------|-------|----------------|
| db-agent | sonnet | Database schema, Drizzle, migrations |
| api-agent | sonnet | Hono routes, middleware, validation |
| ui-agent | sonnet | React components, Tailwind UI |
| forms-agent | sonnet | React Hook Form, Zod schemas |
| qa-agent | sonnet | Testing, validation, browser checks |

## Constraints
<!-- Project-specific rules agents must follow -->

## Notes
Working docs in `/notes` (gitignored)
