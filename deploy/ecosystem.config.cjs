// PM2 Ecosystem Configuration
// Place this on the server and run: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'bollman-roets',
      script: './dist/server/index.js',
      interpreter: '/root/.bun/bin/bun',
      cwd: '/var/www/bollman-roets.de',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 3004,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3004,
      },
      error_file: '/var/log/bollman-roets/error.log',
      out_file: '/var/log/bollman-roets/out.log',
      log_file: '/var/log/bollman-roets/combined.log',
      time: true,
    },
  ],
}
