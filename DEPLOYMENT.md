# Deployment Guide

## Overview

This guide covers deploying the Global Peace Pledge application to production environments.

## Prerequisites

- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)
- Production MySQL database
- Node.js hosting environment

## Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)

### Option 2: Platform as a Service (Heroku, Render, Railway)

### Option 3: Containerized (Docker + Kubernetes)

---

## Option 1: VPS Deployment (Ubuntu Server)

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install fonts required for certificate generation (IMPORTANT!)
sudo apt install -y fonts-dejavu fonts-dejavu-core fonts-dejavu-extra

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx as reverse proxy
sudo apt install nginx -y
```

### 2. MySQL Setup

```bash
# Log in to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE peace_pledge;
CREATE USER 'pledgeuser'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON peace_pledge.* TO 'pledgeuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import schema
mysql -u pledgeuser -p peace_pledge < backend/database/schema.sql
```

### 3. Deploy Backend

```bash
# Create app directory
sudo mkdir -p /var/www/peace-pledge
sudo chown $USER:$USER /var/www/peace-pledge

# Clone or upload your code
cd /var/www/peace-pledge
git clone <your-repo-url> .

# Install backend dependencies
cd backend
npm install --production

# Create production .env
cat > .env << EOL
DB_HOST=localhost
DB_USER=pledgeuser
DB_PASSWORD=strong_password
DB_NAME=peace_pledge
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
EOL

# Start with PM2
pm2 start server.js --name peace-pledge-api
pm2 save
pm2 startup
```

### 4. Build and Deploy Frontend

```bash
cd /var/www/peace-pledge/frontend

# Install dependencies
npm install

# Update API URL for production
echo "REACT_APP_API_URL=https://api.yourdomain.com" > .env.production

# Build
npm run build

# Move build to nginx directory
sudo cp -r build /var/www/peace-pledge-frontend
```

### 5. Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/peace-pledge
```

Add this configuration:

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/peace-pledge-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/peace-pledge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificates
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal is set up automatically
```

### 7. Firewall Setup

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## Option 2: Heroku Deployment

### Backend on Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
cd backend
heroku create peace-pledge-api

# Add MySQL addon (ClearDB or JawsDB)
heroku addons:create jawsdb:kitefin

# Get database URL
heroku config:get JAWSDB_URL

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend.herokuapp.com

# Update server.js to use process.env.JAWSDB_URL

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Run database migrations
heroku run node -e "require('./path-to-migration-script')"
```

### Frontend on Vercel/Netlify

**Vercel:**

```bash
npm install -g vercel
cd frontend
vercel
```

**Netlify:**

```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=build
```

---

## Option 3: Docker Deployment

### Dockerfile for Backend

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install fonts for certificate generation
RUN apk add --no-cache ttf-dejavu

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

### Dockerfile for Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: peace_pledge
      MYSQL_USER: pledgeuser
      MYSQL_PASSWORD: pledgepass
    volumes:
      - mysql_data:/var/lib/mysql
      - ./backend/database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    environment:
      DB_HOST: mysql
      DB_USER: pledgeuser
      DB_PASSWORD: pledgepass
      DB_NAME: peace_pledge
      PORT: 5000
    ports:
      - "5000:5000"
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

Deploy:

```bash
docker-compose up -d
```

---

## Environment Variables Checklist

### Backend (.env)

- [ ] DB_HOST
- [ ] DB_USER
- [ ] DB_PASSWORD
- [ ] DB_NAME
- [ ] PORT
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL

### Frontend (.env.production)

- [ ] REACT_APP_API_URL

---

## Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] **System fonts installed (DejaVu fonts for certificate generation)**
- [ ] Environment variables configured
- [ ] Database schema imported
- [ ] Frontend built and tested
- [ ] API endpoints tested
- [ ] Certificate generation tested with various names
- [ ] CORS configured correctly
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Error logging configured

---

## Post-Deployment

### 1. Test Everything

- [ ] Visit the website
- [ ] Submit a test pledge
- [ ] Download certificates
- [ ] Check database entries
- [ ] Test on mobile devices

### 2. Set Up Monitoring

**PM2 Monitoring:**

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

**Database Backups:**

```bash
# Create backup script
cat > /usr/local/bin/backup-peace-pledge << 'EOL'
#!/bin/bash
mysqldump -u pledgeuser -p'password' peace_pledge > /backups/peace_pledge_$(date +%Y%m%d_%H%M%S).sql
find /backups -name "peace_pledge_*.sql" -mtime +7 -delete
EOL

chmod +x /usr/local/bin/backup-peace-pledge

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-peace-pledge
```

### 3. Performance Optimization

**Enable Redis Caching (Optional):**

```bash
sudo apt install redis-server
```

**CDN for Static Assets:**
Consider using Cloudflare or AWS CloudFront

**Database Optimization:**

```sql
-- Add indexes for better performance
CREATE INDEX idx_created_at ON pledges(created_at DESC);
CREATE INDEX idx_country ON pledges(country);
```

---

## Troubleshooting

### Application won't start

```bash
pm2 logs peace-pledge-api
```

### Database connection issues

- Check MySQL is running: `sudo systemctl status mysql`
- Verify credentials in `.env`
- Check firewall rules

### High memory usage

```bash
pm2 restart peace-pledge-api --max-memory-restart 500M
```

### SSL certificate renewal

```bash
sudo certbot renew --dry-run
```

---

## Maintenance

### Update Application

```bash
cd /var/www/peace-pledge
git pull
cd backend
npm install
pm2 restart peace-pledge-api
cd ../frontend
npm install
npm run build
sudo cp -r build/* /var/www/peace-pledge-frontend/
```

### Monitor Logs

```bash
pm2 logs peace-pledge-api
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Support

For deployment assistance:

- Check logs first
- Review configuration files
- Contact hosting provider support
- Consult community forums

**Remember**: Always test in a staging environment before deploying to production!
