#!/bin/bash
# Initialize new project from skeleton
# Usage: ./init-project.sh <repo-url> [project-folder]

set -e

REPO_URL=$1
PROJECT_NAME=$2

if [ -z "$REPO_URL" ]; then
  echo "Usage: ./init-project.sh <repo-url> [project-folder]"
  echo ""
  echo "Examples:"
  echo "  ./init-project.sh https://github.com/user/my-crm"
  echo "  ./init-project.sh https://github.com/user/my-crm ~/dev/my-crm"
  exit 1
fi

# Extract project name from repo URL if not provided
if [ -z "$PROJECT_NAME" ]; then
  PROJECT_NAME=$(basename "$REPO_URL" .git)
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$(dirname "$SCRIPT_DIR")/$PROJECT_NAME"

echo "==================================="
echo "Initializing: $PROJECT_NAME"
echo "From skeleton: $SCRIPT_DIR"
echo "Target: $TARGET_DIR"
echo "Remote: $REPO_URL"
echo "==================================="

# Check target doesn't exist
if [ -d "$TARGET_DIR" ]; then
  echo "Error: $TARGET_DIR already exists"
  exit 1
fi

# Copy skeleton
echo "→ Copying skeleton..."
cp -r "$SCRIPT_DIR" "$TARGET_DIR"

# Remove skeleton's git and init fresh
cd "$TARGET_DIR"
rm -rf .git
rm -f init-project.sh  # Remove this script from new project

echo "→ Initializing git..."
git init
git remote add origin "$REPO_URL"

echo "→ Initial commit..."
git add .
git commit -m "Initialize from skeleton"

echo "→ Pushing to remote..."
git branch -M main
git push -u origin main

echo ""
echo "==================================="
echo "✓ Done!"
echo "==================================="
echo ""
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  Tell Claude: 'setup'"
echo ""
