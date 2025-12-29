# Requirement Digester Pipeline

Transform raw requirements into production-ready code through an AI-powered multi-agent pipeline.

## What It Does

Drop unstructured input (emails, meeting notes, transcripts) into a folder. The pipeline processes them through research, architecture, implementation, review, and QA stages — producing working code with security audits and quality checks.

```
notes/input/          →    Multi-Agent Pipeline    →    Working Feature
(raw docs)                 (8 specialized agents)        (tested code)
```

## Quick Start

```bash
# Clone
git clone git@github.com:namaqua/requirement-digester-pipeline.git
cd requirement-digester-pipeline

# Setup
bun install
cp .env.example .env
# Edit .env with your DATABASE_URL
bun run db:push

# Drop requirements
cp ~/Downloads/client-email.txt notes/input/

# Run with Claude
# Tell Claude: "digest all" then "build {feature}"
```

## Pipeline Stages

### Stage 1: Requirement Digestion
```
digest all
```
- Wizard-driven processing of raw requirements
- **spec-flow-analyzer** identifies user flows and gaps
- Outputs structured `REQ-{slug}.md`

### Stage 2: Research
```
research {feature}
```
- **best-practices-researcher** — External patterns and standards
- **framework-docs-researcher** — Hono, Drizzle, React, Zod documentation

### Stage 3: Architecture
```
architect {feature}
```
- **code-architect** — Design blueprints with file structures
- **Plan** — Step-by-step implementation plans

### Stage 4: Implementation
```
implement {feature}
```
| Agent | Specialization | Enhancement |
|-------|----------------|-------------|
| `db-agent` | Schema, migrations | + data-integrity-guardian |
| `api-agent` | Hono routes, validation | + security-sentinel |
| `forms-agent` | React Hook Form, Zod | + kieran-typescript-reviewer |
| `ui-agent` | React, Tailwind | + frontend-design skill |

### Stage 5: Review
```
review {feature}
```
Three perspectives in parallel:
- **pattern-recognition-specialist** — Anti-patterns, duplication
- **code-simplicity-reviewer** — YAGNI, over-engineering
- **architecture-strategist** — Blueprint compliance

### Stage 6: Quality Assurance
```
qa {feature}
```
- Static analysis, build verification
- API testing, browser checks
- **bug-reproduction-validator** for systematic debugging

## Full Build Command

```
build {feature}
```
Runs all stages: Research → Architecture → Implementation → Review → QA

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Requirement Digester                          │
│                    + spec-flow-analyzer                          │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌───────────────────────────┴─────────────────────────────────────┐
│                      Research Agent                              │
│         best-practices-researcher + framework-docs-researcher    │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌───────────────────────────┴─────────────────────────────────────┐
│                    Architecture Agent                            │
│                  code-architect + Plan                           │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌───────────────────────────┴─────────────────────────────────────┐
│                         Alfred                                   │
│                      (Orchestrator)                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │  db-agent   │ │  api-agent  │ │ forms-agent │ │  ui-agent  │ │
│  │  + data-    │ │  + security-│ │  + kieran-  │ │  + frontend│ │
│  │  integrity  │ │  sentinel   │ │  typescript │ │  -design   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌───────────────────────────┴─────────────────────────────────────┐
│                       Review Agent                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │   pattern-   │ │  simplicity- │ │ architecture-│  (parallel) │
│  │  recognition │ │   reviewer   │ │  strategist  │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌───────────────────────────┴─────────────────────────────────────┐
│                        QA Agent                                  │
│                + bug-reproduction-validator                      │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
├── notes/
│   ├── input/              # Drop raw requirements here
│   └── working/            # Research, architecture, review docs
├── handoff/
│   └── requirements/       # Digested specs (REQ-{slug}.md)
├── agents/
│   ├── requirement-digester.md
│   ├── alfred.md           # Orchestrator
│   └── sub/
│       ├── research-agent.md
│       ├── architecture-agent.md
│       ├── db-agent.md
│       ├── api-agent.md
│       ├── forms-agent.md
│       ├── ui-agent.md
│       ├── review-agent.md
│       └── qa-agent.md
├── templates/
│   └── requirement.template.md
├── src/
│   ├── server/             # Hono API
│   ├── client/             # React frontend
│   ├── db/                 # Drizzle schema
│   └── shared/             # Shared types
└── master.md               # Project config
```

## Agent Enhancements

| Agent | Task Subagent | Purpose |
|-------|---------------|---------|
| requirement-digester | spec-flow-analyzer | Auto-detect user flows, gaps |
| research-agent | best-practices-researcher | External patterns, standards |
| research-agent | framework-docs-researcher | Framework documentation |
| architecture-agent | code-architect | Design blueprints |
| architecture-agent | Plan | Implementation plans |
| db-agent | data-integrity-guardian | Migration safety |
| api-agent | security-sentinel | OWASP compliance |
| forms-agent | kieran-typescript-reviewer | TypeScript quality |
| ui-agent | frontend-design | Production-grade UI |
| review-agent | pattern-recognition-specialist | Anti-patterns |
| review-agent | code-simplicity-reviewer | YAGNI compliance |
| review-agent | architecture-strategist | Blueprint compliance |
| qa-agent | bug-reproduction-validator | Systematic debugging |

## POC Guardrails

The pipeline enforces prototype constraints:

| Resource | Max |
|----------|-----|
| Entities | 5 |
| Endpoints | 10 |
| Pages | 5 |
| Features | 5-7 |

## Commands Reference

| Command | Description |
|---------|-------------|
| `digest all` | Process all requirements in input folder |
| `digest {file}` | Process single requirement file |
| `build {feature}` | Full pipeline (research → QA) |
| `research {feature}` | Research phase only |
| `architect {feature}` | Architecture phase only |
| `implement {feature}` | Implementation phase only |
| `review {feature}` | Code review phase only |
| `qa {feature}` | QA validation only |
| `status` | Show build progress |

## Tech Stack

- **Runtime:** Bun
- **API:** Hono
- **Database:** PostgreSQL + Drizzle
- **Frontend:** React + Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Tables:** TanStack Table
- **State:** Zustand + TanStack Query

## QA Commands

```bash
bun run qa           # Quick static analysis + build check
bun run qa:full      # Full check including client build
bun run qa:browser   # API and browser smoke tests
bun run typecheck    # TypeScript only
```

## License

MIT
