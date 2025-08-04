# 🌊 DigitalOcean Deployment Guide

> Deploy Claude Code on DigitalOcean droplets with step-by-step instructions

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Droplet](#creating-a-droplet)
3. [Initial Server Setup](#initial-server-setup)
4. [Installing Docker](#installing-docker)
5. [Deploying Claude Code](#deploying-claude-code)
6. [Setting Up Persistence](#setting-up-persistence)
7. [Security Configuration](#security-configuration)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Cost Optimization](#cost-optimization)
10. [Troubleshooting](#troubleshooting)

## 📋 Prerequisites

- DigitalOcean account ([Sign up](https://www.digitalocean.com/))
- SSH key pair for secure access
- Domain name (optional, for web access)
- API keys (Anthropic, etc.)

## 🚀 Creating a Droplet

### 1. Choose Configuration

**Recommended Specs:**
- **Basic**: 2GB RAM / 1 CPU ($12/month)
- **Standard**: 4GB RAM / 2 CPU ($24/month)
- **Performance**: 8GB RAM / 4 CPU ($48/month)

### 2. Create via Web Console

1. Click "Create" → "Droplets"
2. Choose Ubuntu 22.04 LTS
3. Select datacenter closest to you
4. Choose droplet size
5. Add SSH key
6. Set hostname: `claude-code-server`
7. Add tags: `claude`, `ai`, `development`

### 3. Create via CLI

```bash
# Install doctl
brew install doctl  # macOS
# or
snap install doctl  # Linux

# Authenticate
doctl auth init

# Create droplet
doctl compute droplet create claude-code \
  --image ubuntu-22-04-x64 \
  --size s-2vcpu-4gb \
  --region nyc3 \
  --ssh-keys $(doctl compute ssh-key list --format ID --no-header) \
  --tag-names claude,ai,development
```

## 🔧 Initial Server Setup

### 1. Connect to Droplet

```bash
# Get IP address
doctl compute droplet list

# SSH into server
ssh root@your-droplet-ip
```

### 2. Create Non-Root User

```bash
# Create user
adduser claude
usermod -aG sudo claude

# Copy SSH keys
rsync --archive --chown=claude:claude ~/.ssh /home/claude

# Test new user
su - claude
```

### 3. Basic Security

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

## 🐳 Installing Docker

### Automated Installation

```bash
# Download and run Docker install script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker claude

# Start and enable Docker
sudo systemctl enable docker
sudo systemctl start docker

# Verify installation
docker --version
```

### Install Docker Compose

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

## 🚀 Deploying Claude Code

### 1. Clone Repository

```bash
# Create directory
mkdir -p ~/claude-deployment
cd ~/claude-deployment

# Clone configuration
git clone https://github.com/claude-code-hub/claude-code-hub.git
cd claude-code-hub/docker-vps/docker-setup
```

### 2. Configure Environment

```bash
# Create environment file
cat > .env << EOF
# API Keys
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
PERPLEXITY_API_KEY=your-perplexity-key
GITHUB_TOKEN=your-github-token

# Database (optional)
POSTGRES_USER=claude
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=claude_dev

# Redis (optional)
REDIS_PASSWORD=$(openssl rand -base64 32)

# Ports
POSTGRES_PORT=5432
REDIS_PORT=6379
ADMINER_PORT=8080
EOF

# Secure the file
chmod 600 .env
```

### 3. Deploy with Docker Compose

```bash
# Pull images
docker-compose pull

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f claude
```

### 4. Single Container Deployment

```bash
# Alternative: Run standalone
docker run -d \
  --name claude-code \
  --restart unless-stopped \
  -e ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY}" \
  -v /home/claude/workspace:/home/claude/workspace \
  -v claude-config:/home/claude/.claude \
  claude-code:latest
```

## 💾 Setting Up Persistence

### 1. DigitalOcean Volumes

```bash
# Create volume via CLI
doctl compute volume create claude-data \
  --size 10GiB \
  --region nyc3

# Attach to droplet
doctl compute volume-action attach volume-id droplet-id

# Format and mount
sudo mkfs.ext4 /dev/disk/by-id/scsi-0DO_Volume_claude-data
sudo mkdir -p /mnt/claude-data
sudo mount /dev/disk/by-id/scsi-0DO_Volume_claude-data /mnt/claude-data

# Auto-mount on boot
echo '/dev/disk/by-id/scsi-0DO_Volume_claude-data /mnt/claude-data ext4 defaults,nofail,discard 0 0' | sudo tee -a /etc/fstab
```

### 2. Docker Volumes

```yaml
# docker-compose.yml modification
volumes:
  claude-config:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /mnt/claude-data/config
  
  workspace:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /mnt/claude-data/workspace
```

### 3. Backup Strategy

```bash
# Create backup script
cat > backup-claude.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/mnt/claude-data/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup Docker volumes
docker run --rm \
  -v claude-config:/source:ro \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/claude-config-$TIMESTAMP.tar.gz -C /source .

# Backup database (if using)
docker-compose exec -T postgres pg_dumpall -U claude | gzip > $BACKUP_DIR/postgres-$TIMESTAMP.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
EOF

chmod +x backup-claude.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /home/claude/backup-claude.sh") | crontab -
```

## 🔒 Security Configuration

### 1. SSL/TLS with Let's Encrypt

```bash
# Install Certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Get certificate
sudo certbot certonly --standalone -d claude.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 2. Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Configure for Claude Code
sudo tee /etc/nginx/sites-available/claude << 'EOF'
server {
    listen 80;
    server_name claude.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name claude.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/claude.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/claude.yourdomain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/claude /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Fail2ban Configuration

```bash
# Install fail2ban
sudo apt install fail2ban -y

# Configure for SSH
sudo tee /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
EOF

sudo systemctl restart fail2ban
```

## 📊 Monitoring & Maintenance

### 1. DigitalOcean Monitoring

```bash
# Enable monitoring
doctl compute droplet-action enable-monitoring droplet-id

# Install monitoring agent
curl -sSL https://repos.insights.digitalocean.com/install.sh | sudo bash
```

### 2. Docker Monitoring

```bash
# Resource usage
docker stats

# Disk usage
docker system df

# Logs
docker-compose logs --tail=100 -f

# Health checks
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### 3. Automated Alerts

```bash
# Create monitoring script
cat > monitor-claude.sh << 'EOF'
#!/bin/bash

# Check if Claude container is running
if ! docker ps | grep -q claude-code; then
    echo "Claude Code container is down!" | mail -s "Alert: Claude Down" admin@example.com
    docker-compose up -d claude
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "Disk usage is at ${DISK_USAGE}%" | mail -s "Alert: Disk Space" admin@example.com
fi
EOF

chmod +x monitor-claude.sh

# Add to cron (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/claude/monitor-claude.sh") | crontab -
```

## 💰 Cost Optimization

### 1. Right-Sizing

Monitor actual usage:
```bash
# CPU and Memory usage over time
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# If consistently under 50%, consider downgrading
doctl compute droplet-action resize droplet-id --size s-1vcpu-2gb
```

### 2. Snapshots vs Backups

```bash
# Create snapshot (cheaper than keeping large droplet)
doctl compute droplet-action snapshot droplet-id --snapshot-name claude-code-snapshot

# Restore when needed
doctl compute droplet create claude-code-restored \
  --image snapshot-id \
  --size s-2vcpu-4gb \
  --region nyc3
```

### 3. Reserved Capacity

For long-term deployments:
- Consider DigitalOcean Reserved Droplets (up to 30% savings)
- Use object storage for backups instead of block storage

## 🐛 Troubleshooting

### Common Issues

**1. Cannot Connect to Docker**
```bash
# Check Docker status
sudo systemctl status docker

# Restart Docker
sudo systemctl restart docker

# Check logs
sudo journalctl -u docker.service
```

**2. Out of Memory**
```bash
# Check memory usage
free -h

# Add swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**3. Slow Performance**
```bash
# Check I/O wait
iostat -x 1

# Check network
iftop

# Docker cleanup
docker system prune -a --volumes
```

### Debugging Commands

```bash
# System information
doctl compute droplet get droplet-id

# Console access
doctl compute droplet-action get-console droplet-id

# Recent events
doctl compute droplet-action list droplet-id
```

## 🚀 Advanced Configuration

### Load Balancing

```bash
# Create multiple droplets
for i in {1..3}; do
  doctl compute droplet create claude-code-$i \
    --image docker-20-04 \
    --size s-2vcpu-4gb \
    --region nyc3
done

# Create load balancer
doctl compute load-balancer create \
  --name claude-lb \
  --region nyc3 \
  --forwarding-rules protocol:http,entry_port:80,target_port:3000
```

### Auto-Scaling

Use DigitalOcean App Platform for automatic scaling:
```yaml
name: claude-code-app
services:
- name: claude
  image:
    registry_type: DOCKER_HUB
    registry: claude-code
    repository: claude-code
    tag: latest
  instance_count: 2
  instance_size_slug: basic-xs
  http_port: 3000
```

## 📚 Next Steps

- 🔒 Review [Security Guide](security-guide.md)
- 🏗️ Explore [AWS Deployment](aws-ec2.md) for enterprise features
- 🔄 Set up [CI/CD Integration](/workflows/automation-patterns.md)
- 📊 Implement [Monitoring](/performance/monitoring-usage.md)

---

Need help? Check DigitalOcean [Community](https://www.digitalocean.com/community) or our [Discord](https://discord.gg/claude-code)