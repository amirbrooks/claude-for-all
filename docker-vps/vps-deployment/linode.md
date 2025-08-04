# 🟢 Linode Deployment Guide

> Deploy Claude Code on Linode with excellent price-performance ratio

## 📋 Table of Contents

1. [Why Linode](#why-linode)
2. [Prerequisites](#prerequisites)
3. [Creating a Linode](#creating-a-linode)
4. [Initial Setup](#initial-setup)
5. [Docker Installation](#docker-installation)
6. [Claude Code Deployment](#claude-code-deployment)
7. [Linode-Specific Features](#linode-specific-features)
8. [Backup & Recovery](#backup--recovery)
9. [Monitoring](#monitoring)
10. [Cost Optimization](#cost-optimization)

## 🎯 Why Linode

### Advantages
- **Simple Pricing**: Predictable, transparent costs
- **High Performance**: NVMe SSD storage standard
- **Global Presence**: 11 data centers worldwide
- **Developer Friendly**: Excellent API and CLI tools
- **Free Extras**: Backups, NodeBalancers trial
- **Support**: 24/7 human support

### Recommended Plans
- **Nanode 1GB**: $5/month (Development)
- **Linode 4GB**: $20/month (Standard) ⭐
- **Dedicated 4GB**: $30/month (Production)
- **GPU Instances**: Starting $1000/month (ML/AI)

## 📋 Prerequisites

- Linode account ([Sign up - $100 credit](https://www.linode.com/))
- SSH key pair
- Linode CLI (optional)
- API keys for Claude

### Linode CLI Setup

```bash
# Install Linode CLI
pip3 install linode-cli

# Configure
linode-cli configure
# Enter your API token when prompted

# Verify
linode-cli --version
```

## 🚀 Creating a Linode

### Via Web Interface

1. Log in to [Linode Cloud Manager](https://cloud.linode.com/)
2. Click "Create Linode"
3. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Region**: Closest to your users
   - **Plan**: Linode 4GB ($20/month)
   - **Label**: claude-code-server
   - **Root Password**: Generate strong password
   - **SSH Keys**: Add your public key

### Via CLI

```bash
# List available plans
linode-cli linodes types

# List regions
linode-cli regions list

# Create Linode
linode-cli linodes create \
  --label claude-code-server \
  --root_pass "$(openssl rand -base64 32)" \
  --region us-east \
  --type g6-standard-2 \
  --image linode/ubuntu22.04 \
  --authorized_keys "$(cat ~/.ssh/id_rsa.pub)" \
  --tags claude ai docker

# Get IP address
linode-cli linodes list --label claude-code-server --format 'ipv4' --text
```

### Using StackScripts

```bash
# Create StackScript for automated setup
cat > claude-stackscript.sh << 'EOF'
#!/bin/bash
# <UDF name="claude_user" label="Claude Username" default="claude" />
# <UDF name="ssh_key" label="SSH Public Key" />
# <UDF name="anthropic_key" label="Anthropic API Key" />

# Update system
apt-get update && apt-get upgrade -y

# Create user
useradd -m -s /bin/bash $CLAUDE_USER
usermod -aG sudo $CLAUDE_USER

# Setup SSH
mkdir -p /home/$CLAUDE_USER/.ssh
echo "$SSH_KEY" >> /home/$CLAUDE_USER/.ssh/authorized_keys
chmod 700 /home/$CLAUDE_USER/.ssh
chmod 600 /home/$CLAUDE_USER/.ssh/authorized_keys
chown -R $CLAUDE_USER:$CLAUDE_USER /home/$CLAUDE_USER/.ssh

# Install Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker $CLAUDE_USER

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Setup Claude Code
su - $CLAUDE_USER << USEREOF
mkdir -p ~/claude-deployment
cd ~/claude-deployment
git clone https://github.com/claude-code-hub/claude-code-hub.git
cd claude-code-hub/docker-vps/docker-setup
echo "ANTHROPIC_API_KEY=$ANTHROPIC_KEY" > .env
docker-compose pull
docker-compose up -d
USEREOF

# Setup firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
EOF

# Create StackScript
linode-cli stackscripts create \
  --label "Claude Code Setup" \
  --description "Automated Claude Code deployment" \
  --images "linode/ubuntu22.04" \
  --is_public false \
  --script "$(cat claude-stackscript.sh)"
```

## 🔧 Initial Setup

### 1. Connect to Linode

```bash
# SSH as root (first time)
ssh root@your-linode-ip

# Create non-root user
adduser claude
usermod -aG sudo claude

# Copy SSH keys
rsync --archive --chown=claude:claude ~/.ssh /home/claude

# Switch to new user
su - claude
```

### 2. Secure the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Disable root SSH
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Install fail2ban
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Linode Longview (Monitoring)

```bash
# Install Longview agent
curl -s https://lv.linode.com/05AC7F6E-3B7C-4DDB-83D747B6EAE0C29C | sudo bash

# Verify installation
sudo systemctl status longview

# Configure for Docker monitoring
echo "location /longview {
    proxy_pass http://127.0.0.1:8000;
}" | sudo tee -a /etc/nginx/sites-available/default
```

## 🐳 Docker Installation

### Standard Installation

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in for group changes
exit
ssh claude@your-linode-ip

# Verify Docker
docker --version
docker run hello-world

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### Optimize Docker for Linode

```bash
# Configure Docker with Linode-optimized settings
sudo tee /etc/docker/daemon.json << EOF
{
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "metrics-addr": "127.0.0.1:9323",
  "experimental": true
}
EOF

sudo systemctl restart docker
```

## 🚀 Claude Code Deployment

### 1. Clone and Configure

```bash
# Create deployment directory
mkdir -p ~/claude-deployment
cd ~/claude-deployment

# Clone repository
git clone https://github.com/claude-code-hub/claude-code-hub.git
cd claude-code-hub/docker-vps/docker-setup

# Create environment file
cat > .env << EOF
# API Keys
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
PERPLEXITY_API_KEY=your-perplexity-key
GITHUB_TOKEN=your-github-token

# Environment
NODE_ENV=production

# Optional services
POSTGRES_USER=claude
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=claude_production

REDIS_PASSWORD=$(openssl rand -base64 32)
EOF

# Secure the file
chmod 600 .env
```

### 2. Deploy with Docker Compose

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

### 3. Single Container Alternative

```bash
# For simpler setups
docker run -d \
  --name claude-code \
  --restart unless-stopped \
  -e ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY}" \
  -v ~/workspace:/home/claude/workspace \
  -v claude-config:/home/claude/.claude \
  --memory="2g" \
  --cpus="1.5" \
  claude-code:latest
```

## 🌟 Linode-Specific Features

### 1. Block Storage Volumes

```bash
# Create volume via CLI
linode-cli volumes create \
  --label claude-data \
  --size 50 \
  --region us-east

# Attach to Linode
linode-cli volumes attach $VOLUME_ID --linode_id $LINODE_ID

# Format and mount (in Linode)
sudo mkfs.ext4 /dev/disk/by-id/scsi-0Linode_Volume_claude-data
sudo mkdir -p /mnt/claude-data
sudo mount /dev/disk/by-id/scsi-0Linode_Volume_claude-data /mnt/claude-data

# Persistent mount
echo '/dev/disk/by-id/scsi-0Linode_Volume_claude-data /mnt/claude-data ext4 defaults,noatime,nofail 0 2' | sudo tee -a /etc/fstab

# Use for Docker volumes
sudo mkdir -p /mnt/claude-data/{workspace,config,postgres}
sudo chown -R claude:claude /mnt/claude-data
```

### 2. NodeBalancer Setup

```bash
# Create NodeBalancer
linode-cli nodebalancers create \
  --label claude-lb \
  --region us-east \
  --client_conn_throttle 0

# Configure port
linode-cli nodebalancers config-create $NODEBALANCER_ID \
  --port 80 \
  --protocol http \
  --algorithm roundrobin \
  --check http \
  --check_path /health \
  --check_attempts 3 \
  --check_timeout 30 \
  --check_interval 5

# Add nodes
linode-cli nodebalancers node-create \
  $NODEBALANCER_ID $CONFIG_ID \
  --address "$LINODE_IP:80" \
  --label claude-node-1 \
  --weight 100 \
  --mode accept
```

### 3. Linode Object Storage

```bash
# Install s3cmd
sudo apt install -y s3cmd

# Configure for Linode
s3cmd --configure
# Use:
# Access Key: Your Linode Object Storage Key
# Secret Key: Your Linode Object Storage Secret
# Default Region: us-east-1
# S3 Endpoint: us-east-1.linodeobjects.com

# Create bucket for backups
s3cmd mb s3://claude-backups

# Backup script
cat > backup-to-object-storage.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup Docker volumes
docker run --rm \
  -v claude-config:/data:ro \
  -v $(pwd):/backup \
  alpine tar czf /backup/claude-config-$TIMESTAMP.tar.gz -C /data .

# Upload to Object Storage
s3cmd put claude-config-$TIMESTAMP.tar.gz s3://claude-backups/
s3cmd put --encrypt claude-config-$TIMESTAMP.tar.gz s3://claude-backups/encrypted/

# Clean local backup
rm claude-config-$TIMESTAMP.tar.gz

# List backups
s3cmd ls s3://claude-backups/
EOF

chmod +x backup-to-object-storage.sh
```

### 4. Linode DNS

```bash
# Create domain
linode-cli domains create \
  --domain claude.example.com \
  --type master \
  --soa_email admin@example.com

# Add A record
linode-cli domains records-create $DOMAIN_ID \
  --type A \
  --name www \
  --target $LINODE_IP \
  --ttl_sec 300

# Add CNAME
linode-cli domains records-create $DOMAIN_ID \
  --type CNAME \
  --name claude \
  --target www.claude.example.com \
  --ttl_sec 300
```

## 💾 Backup & Recovery

### 1. Linode Backup Service

```bash
# Enable backups ($2/month for Linode 4GB)
linode-cli linodes backups-enable $LINODE_ID

# Take manual snapshot
linode-cli linodes snapshot $LINODE_ID --label "claude-pre-update"

# List backups
linode-cli linodes backups-list $LINODE_ID

# Restore from backup
linode-cli linodes backup-restore $LINODE_ID $BACKUP_ID
```

### 2. Automated Backup Script

```bash
cat > /usr/local/bin/claude-backup.sh << 'EOF'
#!/bin/bash
set -euo pipefail

# Configuration
BACKUP_DIR="/mnt/claude-data/backups"
S3_BUCKET="s3://claude-backups"
RETENTION_DAYS=7
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup Docker volumes
for volume in claude-config claude-workspace postgres-data; do
  docker run --rm \
    -v ${volume}:/source:ro \
    -v $BACKUP_DIR:/backup \
    alpine tar czf /backup/${volume}-${TIMESTAMP}.tar.gz -C /source .
done

# Backup Docker Compose config
tar czf $BACKUP_DIR/docker-config-${TIMESTAMP}.tar.gz \
  ~/claude-deployment/claude-code-hub/docker-vps/docker-setup/

# Upload to Object Storage
s3cmd sync $BACKUP_DIR/ $S3_BUCKET/ --skip-existing

# Clean old local backups
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete

# Clean old S3 backups
s3cmd ls $S3_BUCKET/ | grep -E "[0-9]{8}_[0-9]{6}" | \
  while read -r line; do
    file_date=$(echo $line | grep -oE "[0-9]{8}")
    if [[ $(date -d "$file_date" +%s) -lt $(date -d "$RETENTION_DAYS days ago" +%s) ]]; then
      s3cmd rm "$S3_BUCKET/$(echo $line | awk '{print $4}')"
    fi
  done

echo "Backup completed: $TIMESTAMP"
EOF

chmod +x /usr/local/bin/claude-backup.sh

# Schedule backups
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/claude-backup.sh >> /var/log/claude-backup.log 2>&1") | crontab -
```

## 📊 Monitoring

### 1. Linode Cloud Manager

Built-in monitoring includes:
- CPU usage
- Network traffic
- Disk I/O
- Available in Cloud Manager dashboard

### 2. Longview (Advanced Monitoring)

```bash
# Install Longview
curl -s https://lv.linode.com/YOUR_API_KEY | sudo bash

# Configure MySQL monitoring (if using)
sudo mysql -e "CREATE USER 'longview'@'localhost' IDENTIFIED BY 'password';"
sudo mysql -e "GRANT SELECT ON *.* TO 'longview'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Configure Nginx monitoring
echo "location /nginx_status {
    stub_status on;
    access_log off;
    allow 127.0.0.1;
    deny all;
}" | sudo tee -a /etc/nginx/sites-available/default

sudo nginx -t && sudo systemctl reload nginx
```

### 3. Custom Monitoring

```bash
# Health check endpoint
cat > ~/claude-deployment/health-check.sh << 'EOF'
#!/bin/bash
# Simple health check script

# Check if Claude container is running
if docker ps | grep -q claude-code; then
    echo "Claude Code: OK"
else
    echo "Claude Code: DOWN"
    docker-compose up -d claude
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "Disk Usage: WARNING ($DISK_USAGE%)"
else
    echo "Disk Usage: OK ($DISK_USAGE%)"
fi

# Check memory
MEM_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
if [ $MEM_USAGE -gt 80 ]; then
    echo "Memory Usage: WARNING ($MEM_USAGE%)"
else
    echo "Memory Usage: OK ($MEM_USAGE%)"
fi
EOF

chmod +x ~/claude-deployment/health-check.sh

# Add to cron
(crontab -l 2>/dev/null; echo "*/5 * * * * ~/claude-deployment/health-check.sh >> /var/log/claude-health.log 2>&1") | crontab -
```

## 💰 Cost Optimization

### 1. Right-Sizing

```bash
# Monitor resource usage
docker stats --no-stream

# Check Linode metrics
linode-cli linodes stats $LINODE_ID --period 7days

# Resize if needed (requires reboot)
linode-cli linodes resize $LINODE_ID --type g6-standard-1
```

### 2. Use Linode Images

```bash
# Create custom image after setup
linode-cli images create \
  --disk_id $DISK_ID \
  --label claude-code-image \
  --description "Claude Code ready-to-deploy image"

# Deploy new instances from image
linode-cli linodes create \
  --image private/$IMAGE_ID \
  --root_pass "$(openssl rand -base64 32)" \
  --type g6-standard-2 \
  --region us-west \
  --label claude-code-west
```

### 3. Billing Alerts

```bash
# Set up billing alerts via API
curl -H "Authorization: Bearer $LINODE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST -d '{
    "threshold": 50,
    "enabled": true
  }' \
  https://api.linode.com/v4/account/settings/billing-alert
```

## 🔧 Troubleshooting

### Common Issues

**1. High CPU Usage**
```bash
# Check top processes
htop

# Docker specific
docker stats
docker top claude-code

# Limit container resources
docker update --cpus="1.5" --memory="3g" claude-code
```

**2. Network Issues**
```bash
# Check Linode network
mtr google.com

# Check firewall
sudo ufw status numbered

# Check Docker network
docker network ls
docker network inspect claude-network
```

**3. Storage Issues**
```bash
# Check disk usage
df -h
du -sh /var/lib/docker/*

# Clean Docker
docker system prune -a --volumes

# Expand volume
linode-cli volumes resize $VOLUME_ID --size 100
sudo resize2fs /dev/disk/by-id/scsi-0Linode_Volume_claude-data
```

## 🚀 Performance Optimization

### 1. Linode-Specific Optimizations

```bash
# Enable dedicated CPU (if using Dedicated plan)
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# Optimize network
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728
sudo sysctl -w net.ipv4.tcp_rmem="4096 87380 134217728"
sudo sysctl -w net.ipv4.tcp_wmem="4096 65536 134217728"

# Make permanent
echo "net.core.rmem_max=134217728
net.core.wmem_max=134217728
net.ipv4.tcp_rmem=4096 87380 134217728
net.ipv4.tcp_wmem=4096 65536 134217728" | sudo tee -a /etc/sysctl.conf
```

### 2. Application Optimization

```yaml
# Optimized docker-compose.yml
version: '3.8'

services:
  claude:
    image: claude-code:latest
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 3G
        reservations:
          cpus: '0.5'
          memory: 1G
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "claude", "--version"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📚 Additional Resources

### Linode-Specific
- [Linode Docs](https://www.linode.com/docs/)
- [Linode Community](https://www.linode.com/community/)
- [Linode API](https://www.linode.com/api/v4/)

### Integration Guides
- [Terraform for Linode](https://registry.terraform.io/providers/linode/linode/latest/docs)
- [Ansible for Linode](https://docs.ansible.com/ansible/latest/scenario_guides/guide_linode.html)

## 🎯 Next Steps

1. **SSL Setup**: Configure Let's Encrypt
2. **Monitoring**: Set up Prometheus/Grafana
3. **CI/CD**: Integrate with GitHub Actions
4. **Scaling**: Explore Kubernetes (LKE)

---

Need help? Visit [Linode Community](https://www.linode.com/community/questions/) or our [Discord](https://discord.gg/claude-code)