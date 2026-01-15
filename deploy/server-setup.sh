#!/bin/bash
# Bollman + Roets - Server Setup Script
# Run this on the server ONCE before first deployment
# Usage: ssh root@104.248.247.65 'bash -s' < deploy/server-setup.sh

set -e

DOMAIN="br.luluwaldhund.de"
APP_PATH="/var/www/${DOMAIN}"

echo "========================================"
echo "Setting up server for ${DOMAIN}"
echo "========================================"

# ------------------------------------------
echo ""
echo "[1/6] Creating directories..."
# ------------------------------------------
mkdir -p ${APP_PATH}/dist/client
mkdir -p ${APP_PATH}/dist/server
mkdir -p /var/log/bollman-roets

# ------------------------------------------
echo ""
echo "[2/6] Installing Node.js and PM2 if needed..."
# ------------------------------------------
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# ------------------------------------------
echo ""
echo "[3/6] Setting up nginx config (HTTP only first)..."
# ------------------------------------------

# Create HTTP-only config first (needed for Let's Encrypt)
cat > /etc/nginx/sites-available/${DOMAIN} << 'NGINX'
server {
    listen 80;
    server_name br.luluwaldhund.de;

    root /var/www/br.luluwaldhund.de/dist/client;
    index index.html;

    location /.well-known/acme-challenge/ {
        root /var/www/br.luluwaldhund.de/dist/client;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3004;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://127.0.0.1:3004;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

# Enable site
ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/

# Test and reload nginx
nginx -t && systemctl reload nginx

echo "HTTP nginx config installed"

# ------------------------------------------
echo ""
echo "[4/6] Obtaining Let's Encrypt certificate..."
# ------------------------------------------
if ! command -v certbot &> /dev/null; then
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Get certificate (will modify nginx config)
certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email admin@luluwaldhund.de --redirect

echo "SSL certificate obtained"

# ------------------------------------------
echo ""
echo "[5/6] Applying final nginx config with SSL..."
# ------------------------------------------

# Now apply the full SSL config
cat > /etc/nginx/sites-available/${DOMAIN} << 'NGINX'
server {
    listen 80;
    server_name br.luluwaldhund.de;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name br.luluwaldhund.de;

    ssl_certificate /etc/letsencrypt/live/br.luluwaldhund.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/br.luluwaldhund.de/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=63072000" always;

    root /var/www/br.luluwaldhund.de/dist/client;
    index index.html;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';" always;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /health {
        proxy_pass http://127.0.0.1:3004;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ /\. {
        deny all;
    }
}
NGINX

nginx -t && systemctl reload nginx

# ------------------------------------------
echo ""
echo "[6/6] Setting up PM2 startup..."
# ------------------------------------------
pm2 startup systemd -u root --hp /root
echo "PM2 startup configured"

echo ""
echo "========================================"
echo "Server setup complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Run ./deploy/deploy.sh from your local machine"
echo "2. Site will be available at https://${DOMAIN}"
