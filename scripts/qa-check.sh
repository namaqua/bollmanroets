#!/bin/bash
# QA Check Script — Automated validation
# Usage: ./scripts/qa-check.sh

set -e

echo "========================================"
echo "QA Check: $(date)"
echo "========================================"

ERRORS=0
WARNINGS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass() { echo -e "${GREEN}✓${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; ERRORS=$((ERRORS+1)); }
warn() { echo -e "${YELLOW}!${NC} $1"; WARNINGS=$((WARNINGS+1)); }

# ------------------------------------------
echo ""
echo "Stage 1: Static Analysis"
echo "------------------------------------------"

# TypeScript check
if bunx tsc --noEmit 2>/dev/null; then
  pass "TypeScript compilation"
else
  fail "TypeScript errors found"
  bunx tsc --noEmit 2>&1 | head -20
fi

# ------------------------------------------
echo ""
echo "Stage 2: Build Verification"
echo "------------------------------------------"

# Server build
if bun build src/server/index.ts --outdir /tmp/qa-build-server 2>/dev/null; then
  pass "Server builds"
  rm -rf /tmp/qa-build-server
else
  fail "Server build failed"
fi

# Client build (optional, slower)
if [ "$1" = "--full" ]; then
  if bunx vite build 2>/dev/null; then
    pass "Client builds"
  else
    fail "Client build failed"
  fi
else
  warn "Client build skipped (use --full to include)"
fi

# ------------------------------------------
echo ""
echo "Stage 3: Database Check"
echo "------------------------------------------"

if [ -z "$DATABASE_URL" ]; then
  warn "DATABASE_URL not set, skipping DB checks"
else
  # Check connection
  if bunx drizzle-kit push --dry-run 2>/dev/null; then
    pass "Database connection"
  else
    fail "Database connection failed"
  fi
fi

# ------------------------------------------
echo ""
echo "Stage 4: API Check"
echo "------------------------------------------"

# Check if server is running
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
  pass "Server responding"
  
  # Health endpoint
  HEALTH=$(curl -s http://localhost:3000/health)
  if echo "$HEALTH" | grep -q "ok"; then
    pass "Health endpoint"
  else
    fail "Health endpoint not returning ok"
  fi
else
  warn "Server not running, skipping API checks"
  echo "    Start with: bun run dev"
fi

# ------------------------------------------
echo ""
echo "Stage 5: File Structure"
echo "------------------------------------------"

# Required files
REQUIRED_FILES=(
  "master.md"
  "package.json"
  "src/server/index.ts"
  "src/db/schema.ts"
  "src/client/main.tsx"
  "src/shared/types.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    pass "$file exists"
  else
    fail "$file missing"
  fi
done

# ------------------------------------------
echo ""
echo "========================================"
echo "Summary"
echo "========================================"
echo "Errors:   $ERRORS"
echo "Warnings: $WARNINGS"

if [ $ERRORS -gt 0 ]; then
  echo -e "${RED}FAILED${NC}"
  exit 1
else
  echo -e "${GREEN}PASSED${NC}"
  exit 0
fi
