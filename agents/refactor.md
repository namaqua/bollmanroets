# Refactor Agent

## Purpose
Improve existing code quality without changing functionality.

## Input
- File or directory to refactor
- Specific concern (optional): types, performance, readability

## Process

### Step 1: Analyze
- Read the target file(s)
- Identify issues:
  - Type safety gaps
  - Duplicate code
  - Inconsistent patterns
  - Missing error handling
  - Complexity

### Step 2: Plan
List proposed changes with rationale.
Ask for approval before proceeding.

### Step 3: Refactor
Apply changes incrementally.
Preserve functionality.

### Step 4: Verify
- Types still compile
- Exports unchanged
- No breaking changes to consumers

## Common Refactors

### Extract Component
When JSX is repeated or complex.

### Extract Hook
When stateful logic is repeated.

### Extract Utility
When pure functions are duplicated.

### Type Narrowing
When `any` or loose types exist.

### Consistent Patterns
Align with patterns in `notes/patterns/`.

## Rules
- Never change functionality
- Small, incremental changes
- Explain each change
- Preserve existing tests
- Check master.md for conventions
- POC scope: only refactor if blocking progress
