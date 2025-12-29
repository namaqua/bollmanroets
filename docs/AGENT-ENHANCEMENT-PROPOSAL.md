# Agent Enhancement Proposal

> **STATUS: ✅ FULLY IMPLEMENTED**
>
> All three phases have been implemented. See individual agent files for details.

Analysis of available Task subagents and recommendations for improving the requirement-digester pipeline.

## Current Architecture

```
Requirement Digester → Alfred (Orchestrator)
                           ├── db-agent
                           ├── api-agent
                           ├── forms-agent
                           ├── ui-agent
                           └── qa-agent
```

## Available Task Subagents (Compound Engineering + Feature Dev)

### Research Agents
| Agent | Purpose | Pipeline Fit |
|-------|---------|--------------|
| `best-practices-researcher` | Research external docs/patterns | Pre-implementation research |
| `framework-docs-researcher` | Framework documentation lookup | Hono/Drizzle/React patterns |
| `repo-research-analyst` | Repository structure analysis | Understanding existing codebase |

### Architecture Agents
| Agent | Purpose | Pipeline Fit |
|-------|---------|--------------|
| `feature-dev:code-architect` | Design feature architectures | Pre-build planning |
| `Plan` | Software architect for implementation plans | Alfred planning phase |
| `spec-flow-analyzer` | Analyze specs for user flows/gaps | Requirement digestion |

### Review Agents
| Agent | Purpose | Pipeline Fit |
|-------|---------|--------------|
| `kieran-typescript-reviewer` | High-bar TypeScript review | Post-implementation |
| `security-sentinel` | Security audits, OWASP compliance | API routes |
| `performance-oracle` | Performance analysis, bottlenecks | API/DB optimization |
| `data-integrity-guardian` | Migration safety, data constraints | Schema changes |
| `pattern-recognition-specialist` | Detect patterns/anti-patterns | Code quality |
| `code-simplicity-reviewer` | YAGNI, minimize complexity | Final pass |
| `architecture-strategist` | Architectural compliance | Integration review |

### Design Agents
| Agent | Purpose | Pipeline Fit |
|-------|---------|--------------|
| `frontend-design` skill | High-quality UI generation | UI components |
| `design-iterator` | Iterative design refinement | Polish UI |

### Workflow Agents
| Agent | Purpose | Pipeline Fit |
|-------|---------|--------------|
| `lint` | Ruby/ERB linting | N/A (TypeScript project) |
| `bug-reproduction-validator` | Bug verification | QA debugging |

---

## Proposed Enhanced Architecture

```
                    ┌─────────────────────────┐
                    │  Requirement Digester   │
                    │  + spec-flow-analyzer   │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │     Research Agent      │  ← NEW
                    │  (best-practices +      │
                    │   framework-docs)       │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │   Architecture Agent    │  ← NEW
                    │  (code-architect +      │
                    │   Plan)                 │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │         Alfred          │
                    │     (Orchestrator)      │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼───────┐     ┌────────▼────────┐     ┌────────▼────────┐
│   db-agent    │     │   api-agent     │     │   ui-agent      │
│ + data-       │     │ + security-     │     │ + frontend-     │
│   integrity   │     │   sentinel      │     │   design skill  │
│   guardian    │     │ + performance-  │     │ + design-       │
└───────┬───────┘     │   oracle        │     │   iterator      │
        │             └────────┬────────┘     └────────┬────────┘
        │                      │                       │
        │             ┌────────▼────────┐              │
        │             │  forms-agent    │              │
        │             │ + kieran-ts-    │              │
        │             │   reviewer      │              │
        │             └────────┬────────┘              │
        │                      │                       │
        └──────────────────────┼───────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Review Agent      │  ← NEW
                    │ (pattern-recog +    │
                    │  simplicity +       │
                    │  architecture)      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │      qa-agent       │
                    │ (existing + bug-    │
                    │  reproduction)      │
                    └─────────────────────┘
```

---

## New Agents to Create

### 1. Research Agent (`agents/sub/research-agent.md`)

**Purpose:** Gather best practices and framework documentation before implementation.

**Uses Task subagents:**
- `best-practices-researcher` — External patterns, standards
- `framework-docs-researcher` — Hono, Drizzle, React, Zod docs

**Triggers:** Before each feature build

**Output:**
- `notes/working/research-{feature}.md` — Patterns to follow
- Informs Alfred's planning phase

---

### 2. Architecture Agent (`agents/sub/architecture-agent.md`)

**Purpose:** Design implementation plan with file structure before coding.

**Uses Task subagents:**
- `feature-dev:code-architect` — Design blueprints
- `Plan` — Step-by-step implementation plans

**Triggers:** After research, before Alfred delegates

**Output:**
- `notes/working/architecture-{feature}.md`
- File list, component designs, data flows, build sequence

---

### 3. Review Agent (`agents/sub/review-agent.md`)

**Purpose:** Multi-perspective code review before QA.

**Uses Task subagents:**
- `pattern-recognition-specialist` — Anti-patterns, consistency
- `code-simplicity-reviewer` — YAGNI, over-engineering
- `architecture-strategist` — Architectural compliance

**Triggers:** After all sub-agents complete, before QA

**Output:**
- Review findings with severity
- Suggested fixes

---

## Enhanced Existing Agents

### requirement-digester.md

**Add integration with:**
```
spec-flow-analyzer
```

**When:** During Step 3 (Clarify) and Step 4 (Consolidate)

**Benefit:** Automatically identifies user flows, edge cases, and missing elements in requirements.

---

### db-agent.md

**Add validation step using:**
```
data-integrity-guardian
```

**When:** After schema design, before `db:push`

**Benefit:** Catches migration safety issues, referential integrity problems, constraint violations.

---

### api-agent.md

**Add security/performance checks using:**
```
security-sentinel
performance-oracle
```

**When:** After route implementation, before integration

**Benefit:**
- Security: OWASP compliance, input validation, injection prevention
- Performance: Query optimization, bottleneck detection

---

### forms-agent.md

**Add TypeScript review using:**
```
kieran-typescript-reviewer
```

**When:** After form component creation

**Benefit:** High-quality TypeScript, proper type inference, convention adherence.

---

### ui-agent.md

**Add design quality tools:**
```
frontend-design skill
design-iterator (when UI needs polish)
```

**When:** Component creation and refinement

**Benefit:** Production-grade UI, avoids generic AI aesthetics.

---

### qa-agent.md

**Add debugging capability:**
```
bug-reproduction-validator
```

**When:** When tests fail or bugs reported

**Benefit:** Systematic reproduction and root cause analysis.

---

## Implementation Priority

### Phase 1: Quick Wins (High Impact, Low Effort) ✅ COMPLETE
1. ✅ **Enhance requirement-digester** with `spec-flow-analyzer`
2. ✅ **Enhance api-agent** with `security-sentinel`
3. ✅ **Enhance ui-agent** with `frontend-design` skill

### Phase 2: Architecture Improvements ✅ COMPLETE
4. ✅ **Create Research Agent** — `agents/sub/research-agent.md`
5. ✅ **Create Architecture Agent** — `agents/sub/architecture-agent.md`
6. ✅ **Enhance db-agent** with `data-integrity-guardian`

### Phase 3: Quality Gates ✅ COMPLETE
7. ✅ **Create Review Agent** (multi-perspective) — `agents/sub/review-agent.md`
8. ✅ **Enhance forms-agent** with TypeScript review
9. ✅ **Enhance qa-agent** with bug reproduction

---

## Updated Workflow

```
1. User drops requirements → notes/input/

2. Requirement Digester
   └── spec-flow-analyzer (identify flows, gaps)
   └── Output: handoff/requirements/REQ-{slug}.md

3. Research Agent (NEW)
   └── best-practices-researcher
   └── framework-docs-researcher
   └── Output: notes/working/research-{feature}.md

4. Architecture Agent (NEW)
   └── code-architect
   └── Plan
   └── Output: notes/working/architecture-{feature}.md

5. Alfred Orchestrates:
   └── db-agent + data-integrity-guardian
   └── api-agent + security-sentinel + performance-oracle
   └── forms-agent + kieran-typescript-reviewer
   └── ui-agent + frontend-design skill

6. Review Agent (NEW)
   └── pattern-recognition-specialist
   └── code-simplicity-reviewer
   └── architecture-strategist

7. QA Agent
   └── Existing checks
   └── bug-reproduction-validator (if failures)
```

---

## Expected Improvements

| Metric | Before | After |
|--------|--------|-------|
| Requirement completeness | Manual review | Automated flow analysis |
| Architecture decisions | Implicit | Explicit, documented |
| Security coverage | Basic validation | OWASP compliance |
| Code quality | TypeScript compile | Multi-perspective review |
| UI quality | Template-based | Design-system quality |
| Bug resolution | Trial and error | Systematic reproduction |

---

## Implementation Summary

All enhancements have been implemented:

| Item | Status | Location |
|------|--------|----------|
| Research Agent | ✅ Created | `agents/sub/research-agent.md` |
| Architecture Agent | ✅ Created | `agents/sub/architecture-agent.md` |
| Review Agent | ✅ Created | `agents/sub/review-agent.md` |
| requirement-digester + spec-flow-analyzer | ✅ Enhanced | `agents/requirement-digester.md` |
| db-agent + data-integrity-guardian | ✅ Enhanced | `agents/sub/db-agent.md` |
| api-agent + security-sentinel | ✅ Enhanced | `agents/sub/api-agent.md` |
| forms-agent + kieran-typescript-reviewer | ✅ Enhanced | `agents/sub/forms-agent.md` |
| ui-agent + frontend-design | ✅ Enhanced | `agents/sub/ui-agent.md` |
| qa-agent + bug-reproduction-validator | ✅ Enhanced | `agents/sub/qa-agent.md` |
| Alfred orchestrator | ✅ Updated | `agents/alfred.md` |
| README | ✅ Updated | `README.md` |

**Total: 3 new agents, 6 enhanced agents, 13 Task subagent integrations**
