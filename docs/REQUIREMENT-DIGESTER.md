# Requirement Digester Pipeline — Detailed Documentation

Transform raw requirements into Claude-developer-ready specifications with automated flow analysis.

## Overview

The Requirement Digester is the entry point to the multi-agent pipeline. It processes unstructured input (emails, notes, transcripts) into structured requirement documents, enhanced by the `spec-flow-analyzer` Task subagent for automated user flow detection.

```
notes/input/              handoff/requirements/
    |                            |
    |  ┌─────────────────────┐   |
    +->│ Requirement Digester│---+
       │ + spec-flow-analyzer│
       └─────────────────────┘
              |
       templates/requirement.template.md
```

## Quick Start

1. Drop raw requirements into `notes/input/`
2. Tell Claude: `digest all` or `digest {filename}`
3. Answer clarifying questions (enhanced by flow analysis)
4. Review output in `handoff/requirements/REQ-{slug}.md`
5. Continue with `build {feature}` to run full pipeline

## Directory Structure

```
skeleton/
├── notes/
│   ├── input/           # Drop raw requirements here
│   └── working/         # Research, architecture, review outputs
├── handoff/
│   └── requirements/    # Digested specs appear here
├── templates/
│   └── requirement.template.md
└── agents/
    └── requirement-digester.md
```

## Wizard Flow (7 Steps)

### Step 1: Inventory
Scans `notes/input/` and lists all files.

**Prompt:** "Process all, or select specific files?"

### Step 2: Ingest
Extracts from each file:
- Format (email, notes, transcript, bullets)
- Key stakeholder/source
- Date if apparent

### Step 3: Analyze Flows (Task Subagent)
**NEW:** Automatically invokes `spec-flow-analyzer`

Identifies:
- All user flows (happy path + alternatives)
- Edge cases and error scenarios
- Missing information that needs clarification
- Implicit assumptions to validate

### Step 4: Clarify
Presents understanding summary **including flow analysis findings**.

Asks clarifying questions:
- "Is {X} an entity or an attribute?"
- "Should {Y} be in v1 scope?"
- "Who is the primary user?"
- **Questions surfaced by flow analysis**

### Step 5: Consolidate
- Merges multiple input files into single requirement
- Flags conflicts between sources
- Includes all identified flows from analysis

### Step 6: Generate
Outputs to `handoff/requirements/REQ-{slug}.md` using the template.

### Step 7: Confirm
Presents summary:
- Entities identified
- Features count
- User flows mapped
- Open questions remaining

**Prompt:** "Ready to handoff, or refine?"

## Commands

| Command | Description |
|---------|-------------|
| `digest all` | Process entire input folder |
| `digest {filename}` | Process single file |
| `status` | Show pending inputs vs completed handoffs |

## spec-flow-analyzer Integration

The `spec-flow-analyzer` Task subagent automatically analyzes requirements to identify:

```
Task: spec-flow-analyzer
Prompt: "Analyze this specification for user flows:
{ingested_content}

Identify:
1. All user flows (happy path + alternatives)
2. Edge cases and error scenarios
3. Missing information that needs clarification
4. Implicit assumptions to validate"
```

**Benefits:**
- Catches missing user flows before implementation
- Surfaces edge cases early
- Identifies ambiguous requirements
- Validates assumptions with stakeholders

## POC Guardrails

The digester enforces prototype constraints:

### Size Limits
| Resource | Max |
|----------|-----|
| Entities | 5 |
| Endpoints | 10 |
| Pages | 5 |
| Components | 10 |
| Features | 5-7 |

### Scope Challenges
For each feature, the agent asks:
- "Is this needed to PROVE the concept, or to SHIP the product?"
- Ship-only features move to Out of Scope

### Acceptance Criteria Rules
Must be:
- Observable in a demo
- Binary pass/fail
- Achievable in timebox

## Output Template

Generated `REQ-{slug}.md` includes:

- **Prototype Scope** — Type, timebox, purpose
- **Source** — Raw input reference, stakeholder, date
- **Problem Statement** — What we're validating
- **Entities** — Data model (max 3-5)
- **Features** — Functionality list with constraints
- **User Flows** — Step-by-step interactions (from flow analysis)
- **API Endpoints** — Method, path, purpose
- **UI Components** — With Tailwind UI references
- **Business Rules** — Core logic
- **Out of Scope** — Explicit exclusions
- **Acceptance Criteria** — Testable success conditions
- **Done When** — Completion checklist

## Rules

- Never delete input files (user manages cleanup)
- Always flag assumptions
- Keep asking until ambiguity resolved
- Reference `master.md` for project context
- One REQ file per logical requirement (may combine inputs)
- Run spec-flow-analyzer for comprehensive flow detection

## Example Workflow

```
User: digest all

Agent: Found 3 files in notes/input/:
       - client-email.txt
       - meeting-notes.md
       - feature-list.pdf

       Process all, or select specific files?

User: all

Agent: Ingesting files...

       Running spec-flow-analyzer...

       Flow Analysis Results:
       ✓ 3 user flows identified
       ✓ 2 edge cases found
       ⚠ 4 clarification questions

       I've extracted the following understanding:

       Entities: Customer, Order, Product (3)
       Features: Create order, View orders, Export CSV (3)
       Stakeholder: Sales team

       User Flows Identified:
       1. Customer creates new order (happy path)
       2. Customer views order history
       3. Admin exports orders to CSV

       Edge Cases Found:
       - What happens if order is empty?
       - How to handle partial saves?

       Questions:
       1. Is "Product" a full entity or just a reference?
       2. Should CSV export be in v1?
       3. Can orders be edited after creation?
       4. What's the maximum order size?

User: Product is just a reference. CSV can wait.
      Orders can't be edited. No max size for POC.

Agent: Generated: handoff/requirements/REQ-order-management.md

       Summary:
       - 2 entities (Customer, Order)
       - 2 features (Create, View)
       - 2 user flows documented
       - 0 open questions

       Ready to handoff, or refine?

User: handoff

Agent: ✓ Requirement ready at handoff/requirements/REQ-order-management.md

       Next: Run `build order-management` to start the full pipeline.
```

## Integration with Full Pipeline

After digestion, requirements flow through the complete pipeline:

```
REQ-{slug}.md
     ↓
Research Agent (best-practices + framework-docs)
     ↓
Architecture Agent (code-architect + Plan)
     ↓
Alfred (Orchestrator)
     ├── db-agent + data-integrity-guardian
     ├── api-agent + security-sentinel
     ├── forms-agent + kieran-typescript-reviewer
     └── ui-agent + frontend-design
     ↓
Review Agent (pattern + simplicity + architecture)
     ↓
QA Agent + bug-reproduction-validator
```

## Tips

- **Multiple sources?** The digester will merge and flag conflicts
- **Too big?** Agent will suggest decomposition into smaller POCs
- **Unclear requirements?** Flow analysis surfaces hidden questions
- **Changed scope?** Re-run digester with updated inputs
- **Ready to build?** Run `build {feature}` for full pipeline
