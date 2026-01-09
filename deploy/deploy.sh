#!/bin/bash
# Bollman & Roets - Deployment Script
# Usage: ./deploy/deploy.sh

set -e

echo "========================================"
echo "Deploying Bollman & Roets"
echo "========================================"

# Configuration
REMOTE_USER="root"
REMOTE_HOST="104.248.247.65"
SSH_KEY="~/.ssh/id_ed25519_server"
REMOTE_PATH="/var/www/br.luluwaldhund.de"
PM2_APP_NAME="bollman-roets"
DOMAIN="br.luluwaldhund.de"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ------------------------------------------
echo ""
info "Step 1: Running pre-deploy checks..."
# ------------------------------------------

# TypeScript check
if ! bunx tsc --noEmit; then
    error "TypeScript errors found. Fix before deploying."
fi
info "TypeScript check passed"

# ------------------------------------------
echo ""
info "Step 2: Building application..."
# ------------------------------------------

# Build client
info "Building client..."
bunx vite build

# Build server
info "Building server..."
bun build src/server/index.ts --outdir dist/server

info "Build complete"

# ------------------------------------------
echo ""
info "Step 3: Creating server directories..."
# ------------------------------------------

ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}/dist/client ${REMOTE_PATH}/dist/server /var/log/bollman-roets"

# ------------------------------------------
echo ""
info "Step 4: Syncing files to server..."
# ------------------------------------------

# Sync dist folder
rsync -avz --delete -e "ssh -i ${SSH_KEY}" \
    dist/ \
    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/dist/

# Sync package.json for dependencies
rsync -avz -e "ssh -i ${SSH_KEY}" \
    package.json \
    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

# Sync ecosystem config
rsync -avz -e "ssh -i ${SSH_KEY}" \
    deploy/ecosystem.config.cjs \
    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

info "Files synced"

# ------------------------------------------
echo ""
info "Step 5: Installing dependencies on server..."
# ------------------------------------------

ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && npm install --production"

info "Dependencies installed"

# ------------------------------------------
echo ""
info "Step 6: Restarting application..."
# ------------------------------------------

ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && pm2 delete ${PM2_APP_NAME} 2>/dev/null || true && pm2 start ecosystem.config.cjs --env production && pm2 save"

info "Application restarted"

# ------------------------------------------
echo ""
info "Step 7: Verifying deployment..."
# ------------------------------------------

# Wait for server to start
sleep 3

# Check health endpoint
if curl -s https://${DOMAIN}/health | grep -q "ok"; then
    info "Health check passed"
else
    warn "Health check failed - verify manually at https://${DOMAIN}/health"
fi

echo ""
echo "========================================"
info "Deployment complete!"
echo "Site: https://${DOMAIN}"
echo "========================================"
