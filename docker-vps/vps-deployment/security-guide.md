# 🔒 VPS Security Guide

> Comprehensive security hardening for Claude Code deployments

## 📋 Table of Contents

1. [Security Principles](#security-principles)
2. [Initial Server Hardening](#initial-server-hardening)
3. [SSH Security](#ssh-security)
4. [Firewall Configuration](#firewall-configuration)
5. [Docker Security](#docker-security)
6. [API Key Management](#api-key-management)
7. [Network Security](#network-security)
8. [Monitoring & Intrusion Detection](#monitoring--intrusion-detection)
9. [Backup & Recovery](#backup--recovery)
10. [Incident Response](#incident-response)

## 🎯 Security Principles

### Defense in Depth
- Multiple layers of security
- No single point of failure
- Assume breach methodology
- Regular security audits

### Least Privilege
- Minimal necessary permissions
- Role-based access control
- Regular permission reviews
- Service isolation

### Zero Trust
- Verify everything
- Never trust, always verify
- Encrypt everything
- Monitor continuously

## 🛡️ Initial Server Hardening

### 1. System Updates

```bash
#!/bin/bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Enable automatic security updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# Configure automatic updates
cat > /etc/apt/apt.conf.d/50unattended-upgrades << EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
    "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    "\${distro_id}ESM:\${distro_codename}-infra-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::InstallOnShutdown "false";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
EOF
```

### 2. User Management

```bash
# Create non-root user
sudo adduser claude --gecos "" --disabled-password
echo "claude:$(openssl rand -base64 32)" | sudo chpasswd

# Add to necessary groups
sudo usermod -aG sudo,docker claude

# Disable root login
sudo passwd -l root

# Set up sudo without password (for automation)
echo "claude ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/claude

# Restrict su command
sudo dpkg-statoverride --update --add root adm 4750 /bin/su
```

### 3. Kernel Hardening

```bash
# Sysctl security settings
cat > /etc/sysctl.d/99-security.conf << EOF
# IP Spoofing protection
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0

# Disable source packet routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Log Martians
net.ipv4.conf.all.log_martians = 1

# Ignore ICMP ping requests
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Ignore Directed pings
net.ipv4.icmp_ignore_bogus_error_responses = 1

# Enable TCP/IP SYN cookies
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_syn_retries = 5

# Disable IPv6 if not needed
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
EOF

# Apply settings
sudo sysctl -p /etc/sysctl.d/99-security.conf
```

## 🔐 SSH Security

### 1. SSH Configuration

```bash
# Backup original config
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# Secure SSH configuration
cat > /etc/ssh/sshd_config.d/99-security.conf << EOF
# Disable root login
PermitRootLogin no

# Use SSH Protocol 2 only
Protocol 2

# Disable password authentication
PasswordAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no

# Enable public key authentication
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Limit user logins
AllowUsers claude

# Disable X11 forwarding
X11Forwarding no

# Disable TCP forwarding
AllowTcpForwarding no

# Set idle timeout
ClientAliveInterval 300
ClientAliveCountMax 2

# Limit authentication attempts
MaxAuthTries 3
MaxSessions 2

# Use strong ciphers only
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org

# Logging
LogLevel VERBOSE
SyslogFacility AUTH

# Banner
Banner /etc/ssh/banner.txt
EOF

# Create SSH banner
cat > /etc/ssh/banner.txt << EOF
****************************************************************************
                            AUTHORIZED ACCESS ONLY
 Unauthorized access to this system is forbidden and will be prosecuted
 by law. By accessing this system, you consent to monitoring and logging.
****************************************************************************
EOF

# Restart SSH
sudo systemctl restart sshd
```

### 2. SSH Key Management

```bash
# Generate strong SSH key (on client)
ssh-keygen -t ed25519 -a 100 -C "claude@example.com"

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# Use SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Two-Factor Authentication

```bash
# Install Google Authenticator
sudo apt install -y libpam-google-authenticator

# Configure PAM
echo "auth required pam_google_authenticator.so" | sudo tee -a /etc/pam.d/sshd

# Enable in SSH
echo "ChallengeResponseAuthentication yes" | sudo tee -a /etc/ssh/sshd_config.d/99-security.conf

# Set up for user
google-authenticator -t -d -f -r 3 -R 30 -W
```

## 🔥 Firewall Configuration

### 1. UFW (Uncomplicated Firewall)

```bash
# Install and enable UFW
sudo apt install -y ufw

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw default deny forward

# Allow specific services
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Rate limiting for SSH
sudo ufw limit 22/tcp

# Enable firewall
sudo ufw --force enable

# Check status
sudo ufw status verbose
```

### 2. iptables Advanced Rules

```bash
# Save current rules
sudo iptables-save > /etc/iptables/rules.v4

# DDoS protection
cat > /etc/iptables/ddos-protection.sh << 'EOF'
#!/bin/bash

# Connection tracking
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Drop invalid packets
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP

# Syn-flood protection
iptables -A INPUT -p tcp ! --syn -m conntrack --ctstate NEW -j DROP

# XMAS packets
iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP

# NULL packets
iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP

# Rate limiting
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
EOF

chmod +x /etc/iptables/ddos-protection.sh
```

### 3. Fail2ban Configuration

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Configure for SSH
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
destemail = admin@example.com
sendername = Fail2Ban
action = %(action_mwl)s

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[sshd-ddos]
enabled = true
port = 22
filter = sshd-ddos
logpath = /var/log/auth.log
maxretry = 10

[docker-claude]
enabled = true
filter = docker-claude
logpath = /var/lib/docker/containers/*/*-json.log
maxretry = 5
bantime = 3600
EOF

# Create custom filter
cat > /etc/fail2ban/filter.d/docker-claude.conf << EOF
[Definition]
failregex = .*Authentication failed.*<HOST>.*
            .*Invalid API key.*<HOST>.*
ignoreregex =
EOF

# Start fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 🐳 Docker Security

### 1. Docker Daemon Security

```bash
# Configure Docker daemon
cat > /etc/docker/daemon.json << EOF
{
  "icc": false,
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "userland-proxy": false,
  "no-new-privileges": true,
  "selinux-enabled": false,
  "seccomp-profile": "/etc/docker/seccomp.json",
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "live-restore": true,
  "userland-proxy-path": "/usr/bin/docker-proxy"
}
EOF

# Restart Docker
sudo systemctl restart docker
```

### 2. Container Security

```dockerfile
# Secure Dockerfile practices
FROM node:20-alpine AS base

# Run as non-root
RUN addgroup -g 1001 -S claude && \
    adduser -S -u 1001 -G claude claude

# Security scanning
RUN apk add --no-cache dumb-init

# Drop capabilities
USER claude

# Read-only root filesystem
# Add to docker-compose.yml:
# read_only: true
# tmpfs:
#   - /tmp
#   - /var/run

# Security options
# security_opt:
#   - no-new-privileges:true
#   - seccomp:unconfined
```

### 3. Docker Compose Security

```yaml
version: '3.8'

services:
  claude:
    image: claude-code:latest
    user: "1001:1001"
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - DAC_OVERRIDE
    tmpfs:
      - /tmp:noexec,nosuid,size=1G
    environment:
      - ANTHROPIC_API_KEY_FILE=/run/secrets/anthropic_key
    secrets:
      - anthropic_key
    networks:
      - claude-network
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '0.5'
          memory: 1G

secrets:
  anthropic_key:
    file: ./secrets/anthropic_key.txt

networks:
  claude-network:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.name: claude-br
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## 🔑 API Key Management

### 1. Secrets Storage

```bash
# Create encrypted secrets directory
sudo mkdir -p /etc/claude/secrets
sudo chmod 700 /etc/claude/secrets

# Store encrypted API keys
echo -n "sk-ant-api03-xxx" | sudo openssl enc -aes-256-cbc -salt -out /etc/claude/secrets/anthropic.enc -k "your-password"

# Decrypt at runtime
openssl enc -aes-256-cbc -d -in /etc/claude/secrets/anthropic.enc -k "your-password"
```

### 2. Environment Security

```bash
# Use systemd credentials
cat > /etc/systemd/system/claude.service << EOF
[Unit]
Description=Claude Code Service
After=docker.service

[Service]
Type=simple
User=claude
Group=claude
LoadCredential=anthropic:/etc/claude/secrets/anthropic.enc
Environment="ANTHROPIC_API_KEY_FILE=%d/anthropic"
ExecStart=/usr/bin/docker-compose up
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

### 3. HashiCorp Vault Integration

```bash
# Install Vault
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install vault

# Configure Vault
cat > /etc/vault.d/vault.hcl << EOF
storage "file" {
  path = "/opt/vault/data"
}

listener "tcp" {
  address     = "127.0.0.1:8200"
  tls_disable = 1
}

api_addr = "http://127.0.0.1:8200"
cluster_addr = "https://127.0.0.1:8201"
ui = false
EOF

# Store secrets in Vault
vault kv put secret/claude anthropic_key="sk-ant-api03-xxx"
```

## 🌐 Network Security

### 1. VPN Setup (WireGuard)

```bash
# Install WireGuard
sudo apt install -y wireguard

# Generate keys
wg genkey | tee privatekey | wg pubkey > publickey

# Configure server
cat > /etc/wireguard/wg0.conf << EOF
[Interface]
Address = 10.0.0.1/24
PrivateKey = $(cat privatekey)
ListenPort = 51820

[Peer]
PublicKey = CLIENT_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32
EOF

# Enable and start
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

### 2. SSL/TLS Configuration

```bash
# Generate strong SSL certificate
sudo certbot certonly --standalone -d claude.example.com \
  --key-type ecdsa \
  --elliptic-curve secp384r1

# Nginx SSL configuration
cat > /etc/nginx/sites-available/claude-ssl << EOF
server {
    listen 443 ssl http2;
    server_name claude.example.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/claude.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/claude.example.com/privkey.pem;
    
    # Strong SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        
        # Security headers for proxied requests
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
```

## 📊 Monitoring & Intrusion Detection

### 1. AIDE (Advanced Intrusion Detection Environment)

```bash
# Install AIDE
sudo apt install -y aide

# Initialize database
sudo aideinit

# Configure monitoring
cat > /etc/aide/aide.conf.d/99-claude << EOF
/home/claude/workspace R
/etc/claude R+sha256
/usr/local/bin R+sha256
/var/lib/docker R
EOF

# Create cron job
echo "0 3 * * * /usr/bin/aide --check | mail -s 'AIDE Report' admin@example.com" | sudo crontab -
```

### 2. OSSEC

```bash
# Install OSSEC
wget -q -O - https://updates.atomicorp.com/installers/atomic | sudo bash
sudo yum install ossec-hids ossec-hids-server

# Configure
cat > /var/ossec/etc/ossec.conf << EOF
<ossec_config>
  <global>
    <email_notification>yes</email_notification>
    <email_to>admin@example.com</email_to>
    <smtp_server>localhost</smtp_server>
  </global>
  
  <syscheck>
    <frequency>7200</frequency>
    <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
    <directories check_all="yes">/home/claude</directories>
  </syscheck>
  
  <rootcheck>
    <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
    <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
  </rootcheck>
  
  <alerts>
    <log_alert_level>1</log_alert_level>
    <email_alert_level>7</email_alert_level>
  </alerts>
</ossec_config>
EOF
```

### 3. Log Monitoring

```bash
# Install logwatch
sudo apt install -y logwatch

# Configure
cat > /etc/logwatch/conf/logwatch.conf << EOF
LogDir = /var/log
TmpDir = /var/cache/logwatch
Output = mail
Format = html
Encode = none
MailTo = admin@example.com
MailFrom = logwatch@claude.example.com
Range = yesterday
Detail = High
Service = All
Service = -zz-disk_space
EOF

# Custom Claude service
cat > /etc/logwatch/scripts/services/claude << 'EOF'
#!/bin/bash
echo "Claude Code Activity Report"
echo "=========================="
docker logs claude-code --since 24h 2>&1 | grep -E "(ERROR|WARNING|CRITICAL)" | tail -20
EOF

chmod +x /etc/logwatch/scripts/services/claude
```

## 💾 Backup & Recovery

### 1. Automated Backups

```bash
# Create backup script
cat > /usr/local/bin/claude-backup.sh << 'EOF'
#!/bin/bash
set -euo pipefail

BACKUP_DIR="/backup/claude"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup Docker volumes
docker run --rm \
  -v claude-config:/source:ro \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/claude-config-$TIMESTAMP.tar.gz -C /source .

# Backup system configuration
tar czf $BACKUP_DIR/system-config-$TIMESTAMP.tar.gz \
  /etc/claude \
  /etc/docker \
  /etc/nginx \
  /etc/ssh/sshd_config.d

# Encrypt backups
gpg --encrypt -r backup@example.com \
  $BACKUP_DIR/claude-config-$TIMESTAMP.tar.gz
rm $BACKUP_DIR/claude-config-$TIMESTAMP.tar.gz

# Upload to S3 (example)
aws s3 sync $BACKUP_DIR s3://claude-backups/ --storage-class GLACIER

# Clean old backups
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete
EOF

chmod +x /usr/local/bin/claude-backup.sh

# Schedule backups
echo "0 2 * * * /usr/local/bin/claude-backup.sh" | crontab -
```

### 2. Disaster Recovery Plan

```bash
# Recovery script
cat > /usr/local/bin/claude-recover.sh << 'EOF'
#!/bin/bash
set -euo pipefail

if [ $# -ne 1 ]; then
    echo "Usage: $0 <backup-timestamp>"
    exit 1
fi

TIMESTAMP=$1
BACKUP_DIR="/backup/claude"

# Decrypt backup
gpg --decrypt $BACKUP_DIR/claude-config-$TIMESTAMP.tar.gz.gpg > \
  $BACKUP_DIR/claude-config-$TIMESTAMP.tar.gz

# Restore Docker volumes
docker run --rm \
  -v claude-config:/target \
  -v $BACKUP_DIR:/backup \
  alpine tar xzf /backup/claude-config-$TIMESTAMP.tar.gz -C /target

# Restore system configuration
tar xzf $BACKUP_DIR/system-config-$TIMESTAMP.tar.gz -C /

# Restart services
docker-compose restart
systemctl restart nginx
EOF

chmod +x /usr/local/bin/claude-recover.sh
```

## 🚨 Incident Response

### 1. Incident Response Plan

```bash
# Create incident response checklist
cat > /etc/claude/incident-response.md << EOF
# Incident Response Checklist

## 1. Detection & Analysis
- [ ] Identify the incident type
- [ ] Document initial observations
- [ ] Preserve evidence (logs, memory dumps)
- [ ] Determine scope and impact

## 2. Containment
- [ ] Isolate affected systems
- [ ] Block malicious IPs
- [ ] Disable compromised accounts
- [ ] Stop affected services

## 3. Eradication
- [ ] Remove malware/backdoors
- [ ] Patch vulnerabilities
- [ ] Update security rules
- [ ] Reset credentials

## 4. Recovery
- [ ] Restore from clean backups
- [ ] Verify system integrity
- [ ] Monitor for re-infection
- [ ] Gradually restore services

## 5. Post-Incident
- [ ] Document lessons learned
- [ ] Update security measures
- [ ] Conduct training
- [ ] Review and update plans
EOF
```

### 2. Forensics Tools

```bash
# Install forensics tools
sudo apt install -y \
  sleuthkit \
  volatility \
  tcpdump \
  wireshark \
  chkrootkit \
  rkhunter

# Memory dump for analysis
sudo dd if=/dev/mem of=/tmp/memory.dump bs=1M

# Network capture
sudo tcpdump -i any -w /tmp/capture.pcap

# Check for rootkits
sudo chkrootkit
sudo rkhunter --check
```

### 3. Emergency Contacts

```bash
# Create contacts file
cat > /etc/claude/emergency-contacts.txt << EOF
# Emergency Contacts

## Internal
Security Team: security@example.com
On-Call: +1-555-0123

## External
ISP Abuse: abuse@isp.com
Law Enforcement: local-cybercrime@police.gov

## Services
AWS Support: https://console.aws.amazon.com/support
DigitalOcean: https://www.digitalocean.com/support
EOF

# Secure the file
chmod 600 /etc/claude/emergency-contacts.txt
```

## 🔍 Security Auditing

### 1. Regular Audits

```bash
# Security audit script
cat > /usr/local/bin/security-audit.sh << 'EOF'
#!/bin/bash
echo "Security Audit Report - $(date)"
echo "================================"

echo -e "\n## Open Ports"
ss -tuln

echo -e "\n## Failed Login Attempts"
grep "Failed password" /var/log/auth.log | tail -10

echo -e "\n## Sudo Usage"
grep sudo /var/log/auth.log | tail -10

echo -e "\n## Docker Security"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"

echo -e "\n## Disk Usage"
df -h

echo -e "\n## System Updates"
apt list --upgradable

echo -e "\n## Firewall Status"
ufw status verbose
EOF

chmod +x /usr/local/bin/security-audit.sh

# Run weekly
echo "0 9 * * 1 /usr/local/bin/security-audit.sh | mail -s 'Weekly Security Audit' admin@example.com" | crontab -
```

### 2. Compliance Checks

```bash
# CIS Benchmark check
git clone https://github.com/CISOfy/lynis
cd lynis
sudo ./lynis audit system

# OpenSCAP
sudo apt install -y libopenscap8
oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_standard \
  /usr/share/xml/scap/ssg/content/ssg-ubuntu2004-ds.xml
```

## 📚 Best Practices Summary

### Do's ✅
1. **Regular Updates**: Keep systems patched
2. **Least Privilege**: Minimal necessary permissions
3. **Strong Authentication**: SSH keys + 2FA
4. **Encryption**: Encrypt data at rest and in transit
5. **Monitoring**: Continuous security monitoring
6. **Backups**: Regular, encrypted, tested backups
7. **Documentation**: Keep security docs updated
8. **Training**: Regular security awareness

### Don'ts ❌
1. **Default Credentials**: Always change defaults
2. **Weak Passwords**: Use strong, unique passwords
3. **Open Ports**: Close unnecessary services
4. **Root Access**: Never run services as root
5. **Unencrypted Data**: Always use encryption
6. **Ignored Logs**: Monitor and act on alerts
7. **Untested Backups**: Test recovery procedures
8. **Security by Obscurity**: Don't rely on hiding

## 🚀 Next Steps

1. **Implement Gradually**: Don't apply all at once
2. **Test Thoroughly**: Verify each change
3. **Document Changes**: Keep security log
4. **Regular Reviews**: Monthly security assessments
5. **Stay Updated**: Follow security advisories

---

Need security help? Check [OWASP](https://owasp.org/) or our [Discord](https://discord.gg/claude-code)