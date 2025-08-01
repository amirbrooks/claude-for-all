# 🌐 Remote Development with Claude Code

> Set up Claude Code for remote development workflows, enabling AI-assisted coding from anywhere

## 📋 Table of Contents

1. [Overview](#overview)
2. [Remote Development Patterns](#remote-development-patterns)
3. [VS Code Remote Setup](#vs-code-remote-setup)
4. [SSH Tunneling](#ssh-tunneling)
5. [Web-Based Access](#web-based-access)
6. [Team Collaboration](#team-collaboration)
7. [Security Considerations](#security-considerations)
8. [Performance Optimization](#performance-optimization)
9. [Troubleshooting](#troubleshooting)

## 🎯 Overview

Remote development with Claude Code enables:
- **🌍 Work from Anywhere**: Access your AI assistant from any device
- **💪 Server Resources**: Leverage powerful cloud hardware
- **👥 Team Collaboration**: Share Claude instances with your team
- **🔒 Secure Access**: Keep API keys on secure servers
- **📱 Cross-Device**: Work seamlessly across devices

## 🏗️ Remote Development Patterns

### 1. Direct SSH Access
```
Local Machine → SSH → VPS → Claude Code
```
Best for: Individual developers, simple setups

### 2. VS Code Remote
```
VS Code → Remote SSH → VPS → Claude Code + Dev Environment
```
Best for: Full IDE experience with Claude integration

### 3. Web Interface
```
Browser → HTTPS → Web Terminal → VPS → Claude Code
```
Best for: Any device access, team collaboration

### 4. API Gateway
```
Client App → API → Claude Service → Response
```
Best for: Custom integrations, mobile apps

## 🔌 VS Code Remote Setup

### 1. Install Remote Development

```bash
# On local machine, install VS Code extensions:
# - Remote - SSH
# - Remote - SSH: Editing Configuration Files
# - Remote - Containers (optional)
```

### 2. Configure SSH Connection

```json
// VS Code settings.json
{
  "remote.SSH.remotePlatform": {
    "claude-server": "linux"
  },
  "remote.SSH.connectTimeout": 30,
  "remote.SSH.maxReconnectionAttempts": 5
}
```

### 3. SSH Config

```bash
# ~/.ssh/config
Host claude-server
    HostName your-server-ip
    User claude
    Port 22
    IdentityFile ~/.ssh/claude-key
    ForwardAgent yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### 4. Connect and Configure

```bash
# In VS Code:
# 1. Ctrl/Cmd + Shift + P
# 2. "Remote-SSH: Connect to Host"
# 3. Select claude-server

# Once connected, in terminal:
claude "Help me set up my development environment"
```

### 5. Integrated Terminal Setup

```json
// VS Code integrated terminal settings
{
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.profiles.linux": {
    "claude-session": {
      "path": "bash",
      "args": ["-c", "claude"]
    }
  },
  "terminal.integrated.env.linux": {
    "ANTHROPIC_API_KEY": "${env:ANTHROPIC_API_KEY}"
  }
}
```

## 🔐 SSH Tunneling

### 1. Basic Port Forwarding

```bash
# Forward local port to remote Claude service
ssh -L 8080:localhost:8080 claude@your-server-ip

# Access Claude web interface locally
# http://localhost:8080
```

### 2. Dynamic SOCKS Proxy

```bash
# Create SOCKS proxy
ssh -D 9090 claude@your-server-ip

# Configure browser to use SOCKS proxy
# localhost:9090
```

### 3. Persistent Tunnels with autossh

```bash
# Install autossh
sudo apt install autossh

# Create persistent tunnel
autossh -M 0 -f -N \
  -o "ServerAliveInterval 30" \
  -o "ServerAliveCountMax 3" \
  -L 8080:localhost:8080 \
  claude@your-server-ip

# Add to systemd for auto-start
cat > ~/.config/systemd/user/claude-tunnel.service << EOF
[Unit]
Description=Claude SSH Tunnel
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/autossh -M 0 -N -o "ServerAliveInterval 30" -o "ServerAliveCountMax 3" -L 8080:localhost:8080 claude@your-server-ip
Restart=always
RestartSec=60

[Install]
WantedBy=default.target
EOF

systemctl --user enable claude-tunnel
systemctl --user start claude-tunnel
```

## 🌐 Web-Based Access

### 1. Web Terminal (ttyd)

```bash
# Install ttyd
wget https://github.com/tsl0922/ttyd/releases/latest/download/ttyd.x86_64
sudo mv ttyd.x86_64 /usr/local/bin/ttyd
sudo chmod +x /usr/local/bin/ttyd

# Run Claude in web terminal
ttyd -p 8080 -c claude:password claude

# Secure with SSL
ttyd -p 8080 -S -C /etc/letsencrypt/live/claude.example.com/fullchain.pem -K /etc/letsencrypt/live/claude.example.com/privkey.pem claude
```

### 2. Code-Server Integration

```bash
# Install code-server
curl -fsSL https://code-server.dev/install.sh | sh

# Configure
mkdir -p ~/.config/code-server
cat > ~/.config/code-server/config.yaml << EOF
bind-addr: 127.0.0.1:8443
auth: password
password: your-secure-password
cert: false
EOF

# Start code-server
sudo systemctl enable --now code-server@$USER

# Create Claude terminal
# In code-server: Terminal → New Terminal → Run 'claude'
```

### 3. Jupyter-Style Interface

```bash
# Create web interface for Claude
cat > ~/claude-web/app.py << 'EOF'
from flask import Flask, render_template, request, jsonify
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/claude', methods=['POST'])
def claude_api():
    prompt = request.json.get('prompt')
    try:
        result = subprocess.run(
            ['claude', prompt],
            capture_output=True,
            text=True,
            timeout=120
        )
        return jsonify({
            'response': result.stdout,
            'error': result.stderr
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
EOF

# Run with gunicorn
pip install flask gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 4. Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/claude-remote
server {
    listen 443 ssl http2;
    server_name claude.example.com;

    ssl_certificate /etc/letsencrypt/live/claude.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/claude.example.com/privkey.pem;

    # Basic auth for security
    auth_basic "Claude Access";
    auth_basic_user_file /etc/nginx/.htpasswd;

    # Code-server
    location / {
        proxy_pass http://localhost:8443;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Accept-Encoding gzip;
    }

    # Claude API endpoint
    location /api/claude {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_read_timeout 300s;
    }

    # Web terminal
    location /terminal {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 👥 Team Collaboration

### 1. Shared Claude Instance

```yaml
# docker-compose.yml for team
version: '3.8'

services:
  claude:
    image: claude-code:latest
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - CLAUDE_TEAM_MODE=true
      - CLAUDE_LOG_SESSIONS=true
    volumes:
      - shared-workspace:/workspace
      - claude-logs:/logs
    deploy:
      replicas: 3  # Multiple instances for team
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.claude.rule=Host(`claude.team.com`)"
      - "traefik.http.services.claude.loadbalancer.server.port=8080"

  traefik:
    image: traefik:v2.9
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml

volumes:
  shared-workspace:
    driver: local
    driver_opts:
      type: nfs
      o: addr=nfs-server.local,rw
      device: ":/exports/claude-workspace"
  claude-logs:
```

### 2. User Management

```bash
# Create team users
#!/bin/bash
TEAM_USERS=("alice" "bob" "carol" "dave")

for user in "${TEAM_USERS[@]}"; do
    # Create system user
    sudo useradd -m -s /bin/bash $user
    sudo usermod -aG claude-team $user
    
    # Create Claude config
    sudo -u $user mkdir -p /home/$user/.claude
    sudo -u $user cat > /home/$user/.claude/config.json << EOF
{
    "user": "$user",
    "team": "development",
    "permissions": ["read", "write", "execute"],
    "quota": {
        "daily_tokens": 1000000,
        "max_session_time": 7200
    }
}
EOF
done
```

### 3. Session Management

```bash
# Session tracking script
cat > /usr/local/bin/claude-sessions.sh << 'EOF'
#!/bin/bash

# List active sessions
echo "Active Claude Sessions:"
echo "======================"
docker ps --filter "label=claude.user" --format "table {{.Names}}\t{{.Label \"claude.user\"}}\t{{.Status}}"

# Show usage statistics
echo -e "\nUsage Statistics:"
echo "================="
for user in $(docker ps --filter "label=claude.user" -q); do
    USER=$(docker inspect -f '{{.Config.Labels.claude.user}}' $user)
    TOKENS=$(docker exec $user claude usage --json | jq -r .total_tokens)
    echo "$USER: $TOKENS tokens"
done
EOF

chmod +x /usr/local/bin/claude-sessions.sh
```

## 🔒 Security Considerations

### 1. Network Security

```bash
# VPN setup for remote access (WireGuard)
# On server
sudo apt install wireguard

# Generate keys
wg genkey | tee server-private.key | wg pubkey > server-public.key

# Configure
cat > /etc/wireguard/wg0.conf << EOF
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = $(cat server-private.key)

# Team member peers
[Peer]
# Alice
PublicKey = ALICE_PUBLIC_KEY
AllowedIPs = 10.0.0.2/32

[Peer]
# Bob
PublicKey = BOB_PUBLIC_KEY
AllowedIPs = 10.0.0.3/32
EOF

# Enable
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

### 2. Authentication & Authorization

```bash
# Multi-factor authentication with Google Authenticator
sudo apt install libpam-google-authenticator

# Configure PAM
echo "auth required pam_google_authenticator.so" | sudo tee -a /etc/pam.d/sshd

# OAuth2 proxy for web access
docker run -d \
  --name oauth2-proxy \
  -p 4180:4180 \
  -e OAUTH2_PROXY_CLIENT_ID="your-client-id" \
  -e OAUTH2_PROXY_CLIENT_SECRET="your-client-secret" \
  -e OAUTH2_PROXY_COOKIE_SECRET="$(openssl rand -base64 32)" \
  -e OAUTH2_PROXY_EMAIL_DOMAINS="yourcompany.com" \
  -e OAUTH2_PROXY_UPSTREAM="http://claude-web:5000" \
  quay.io/oauth2-proxy/oauth2-proxy:latest
```

### 3. Audit Logging

```bash
# Enhanced logging for remote access
cat > /etc/rsyslog.d/50-claude.conf << EOF
# Claude access logging
:programname, isequal, "claude" /var/log/claude/access.log
:programname, isequal, "sshd" /var/log/claude/ssh.log

# Forward to central logging
*.* @@central-log-server:514
EOF

# Log rotation
cat > /etc/logrotate.d/claude << EOF
/var/log/claude/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 claude claude
    sharedscripts
    postrotate
        /usr/bin/docker exec claude-code claude flush-logs
    endscript
}
EOF
```

## ⚡ Performance Optimization

### 1. Connection Optimization

```bash
# SSH optimization
cat >> ~/.ssh/config << EOF
Host claude-server
    ControlMaster auto
    ControlPath ~/.ssh/controlmasters/%r@%h:%p
    ControlPersist 10m
    Compression yes
    ServerAliveInterval 30
EOF

# Create control directory
mkdir -p ~/.ssh/controlmasters
```

### 2. Caching Strategy

```nginx
# Nginx caching for static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# API response caching
location /api/claude {
    proxy_cache claude_cache;
    proxy_cache_valid 200 1m;
    proxy_cache_methods GET HEAD;
    proxy_cache_key "$request_method$request_uri$request_body";
    add_header X-Cache-Status $upstream_cache_status;
}
```

### 3. Load Balancing

```yaml
# HAProxy configuration
global
    maxconn 1000
    log stdout local0

defaults
    mode http
    timeout connect 5s
    timeout client 30s
    timeout server 30s

frontend claude_frontend
    bind *:80
    default_backend claude_backend

backend claude_backend
    balance roundrobin
    option httpchk GET /health
    server claude1 10.0.0.10:8080 check
    server claude2 10.0.0.11:8080 check
    server claude3 10.0.0.12:8080 check
```

## 🔧 Troubleshooting

### Common Issues

**1. Slow Connection**
```bash
# Check latency
mtr your-server-ip

# Optimize SSH
ssh -C -o CompressionLevel=9 claude@server

# Use mosh for unreliable connections
sudo apt install mosh
mosh claude@your-server-ip
```

**2. Session Drops**
```bash
# Use tmux/screen for persistent sessions
tmux new -s claude
# Run claude inside tmux
claude

# Detach: Ctrl+B, D
# Reattach: tmux attach -t claude
```

**3. Authentication Issues**
```bash
# Debug SSH
ssh -vvv claude@server

# Check auth logs
sudo tail -f /var/log/auth.log

# Reset user password
sudo passwd claude
```

### Performance Monitoring

```bash
# Monitor connection quality
while true; do
    echo -n "$(date): "
    curl -w "@curl-format.txt" -o /dev/null -s https://claude.example.com/health
    sleep 5
done

# curl-format.txt:
time_namelookup:  %{time_namelookup}s\n
time_connect:  %{time_connect}s\n
time_appconnect:  %{time_appconnect}s\n
time_pretransfer:  %{time_pretransfer}s\n
time_redirect:  %{time_redirect}s\n
time_starttransfer:  %{time_starttransfer}s\n
time_total:  %{time_total}s\n
```

## 🎯 Best Practices

### 1. Development Workflow

```bash
# Remote development script
cat > ~/bin/claude-remote << 'EOF'
#!/bin/bash

# Start SSH tunnel
ssh -fN -L 8080:localhost:8080 claude-server

# Open VS Code
code --folder-uri vscode-remote://ssh-remote+claude-server/home/claude/workspace

# Open browser to web interface
xdg-open http://localhost:8080

echo "Remote Claude development environment ready!"
EOF

chmod +x ~/bin/claude-remote
```

### 2. Backup Remote Config

```bash
# Backup script
cat > backup-remote-config.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="$HOME/claude-remote-backup"
mkdir -p $BACKUP_DIR

# Backup SSH configs
cp -r ~/.ssh/config $BACKUP_DIR/
cp -r ~/.ssh/known_hosts $BACKUP_DIR/

# Backup VS Code settings
cp -r ~/.config/Code/User/settings.json $BACKUP_DIR/

# Backup Claude configs
rsync -avz claude@server:~/.claude/ $BACKUP_DIR/claude-config/

# Create archive
tar czf claude-remote-backup-$(date +%Y%m%d).tar.gz -C $BACKUP_DIR .
EOF
```

## 📚 Next Steps

1. **Mobile Access**: Set up mobile-friendly interface
2. **API Integration**: Build custom clients
3. **Monitoring**: Implement comprehensive logging
4. **Scaling**: Explore Kubernetes for large teams

## 🚀 Quick Reference

### Essential Commands

```bash
# SSH tunnel
ssh -L 8080:localhost:8080 claude@server

# VS Code remote
code --remote ssh-remote+claude-server /path/to/project

# Web terminal
ttyd -p 8080 claude

# Check connection
ssh claude@server 'claude --version'
```

### Security Checklist

- [ ] SSH key authentication only
- [ ] 2FA enabled
- [ ] VPN for sensitive access
- [ ] Regular security audits
- [ ] Encrypted connections only
- [ ] Session logging enabled
- [ ] Access control configured
- [ ] Backup strategy in place

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [FAQ](/resources/faq.md)