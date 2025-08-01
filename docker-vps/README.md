# 🐳 Docker & VPS Deployment

> Deploy Claude Code anywhere - from local containers to cloud servers

## 📁 Directory Contents

### 🐳 [Docker Setup](docker-setup/)
Complete containerization guide for Claude Code with examples and best practices.

- **[Setup Guide](docker-setup/setup-guide.md)** - Comprehensive Docker tutorial
- **[Dockerfile](docker-setup/Dockerfile)** - Production-ready container definition
- **[docker-compose.yml](docker-setup/docker-compose.yml)** - Multi-service orchestration

### 🌐 [VPS Deployment](vps-deployment/)
Deploy Claude Code on various cloud providers with security best practices.

- **[DigitalOcean Guide](vps-deployment/digitalocean.md)** - Simple droplet deployment
- **[AWS EC2 Guide](vps-deployment/aws-ec2.md)** - Enterprise AWS deployment
- **[Linode Guide](vps-deployment/linode.md)** - Cost-effective hosting
- **[Security Guide](vps-deployment/security-guide.md)** - Hardening your deployment

### 🔄 [Remote Development](remote-development.md)
Set up Claude Code for remote development workflows.

## 🚀 Quick Start

### Local Docker

```bash
# Clone the repository
git clone https://github.com/claude-code-hub/claude-code-hub.git
cd claude-code-hub/docker-vps/docker-setup

# Build and run
docker build -t claude-code .
docker run -it -e ANTHROPIC_API_KEY="your-key" claude-code
```

### Docker Compose

```bash
# Copy example environment
cp .env.example .env
# Edit .env with your API keys

# Start services
docker-compose up -d

# Enter Claude container
docker-compose exec claude bash
```

### Quick VPS Deploy

```bash
# On your VPS (Ubuntu example)
curl -fsSL https://get.docker.com | sh
docker run -d \
  --name claude \
  --restart unless-stopped \
  -e ANTHROPIC_API_KEY="your-key" \
  -v /home/ubuntu/projects:/workspace \
  claude-code:latest
```

## 🎯 Use Cases

### 1. Development Environment
Consistent development environment across team members:
- Same Node.js version
- Identical dependencies
- Shared configurations
- No "works on my machine" issues

### 2. CI/CD Integration
Automated testing and deployment:
```yaml
# GitHub Actions example
- name: Run Claude Code Analysis
  run: |
    docker run \
      -e ANTHROPIC_API_KEY=${{ secrets.ANTHROPIC_API_KEY }} \
      -v ${{ github.workspace }}:/workspace \
      claude-code "Review this PR for security issues"
```

### 3. Team Collaboration
Shared Claude Code server:
- Central API key management
- Shared subagents and configurations
- Consistent tooling
- Resource optimization

### 4. Isolated Experimentation
Safe environment for testing:
- No system pollution
- Easy cleanup
- Version testing
- Security isolation

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Claude API key | Yes |
| `PERPLEXITY_API_KEY` | Web search capability | No |
| `GITHUB_TOKEN` | GitHub integration | No |
| `NODE_ENV` | Environment mode | No |
| `CLAUDE_HOME` | Config directory | No |

### Volume Mounts

| Mount Point | Purpose | Type |
|-------------|---------|------|
| `/workspace` | Your code | Bind mount |
| `/.claude` | Claude config | Named volume |
| `/.npm` | NPM cache | Named volume |
| `/.ssh` | SSH keys | Read-only bind |

### Resource Limits

```yaml
# Recommended settings
resources:
  limits:
    cpus: '2'
    memory: 4G
  reservations:
    cpus: '1'
    memory: 2G
```

## 📊 Performance Considerations

### Image Size Optimization
- **Base image**: 150MB (Alpine)
- **With Claude**: +120MB
- **Total**: ~270MB

### Build Time
- **Initial build**: 2-3 minutes
- **Cached build**: 10-15 seconds

### Runtime Performance
- **Startup time**: <5 seconds
- **Memory usage**: 200-500MB idle
- **CPU usage**: Minimal when idle

## 🔒 Security Best Practices

1. **Never commit API keys**
   ```dockerfile
   # Bad
   ENV ANTHROPIC_API_KEY="sk-ant-api03-xxx"
   
   # Good
   ENV ANTHROPIC_API_KEY=""
   ```

2. **Run as non-root**
   ```dockerfile
   USER claude
   ```

3. **Use secrets management**
   ```yaml
   secrets:
     api_key:
       external: true
   ```

4. **Network isolation**
   ```yaml
   networks:
     internal:
       internal: true
   ```

5. **Regular updates**
   ```bash
   docker pull claude-code:latest
   ```

## 🐛 Common Issues

### Issue: Permission Denied
```bash
# Fix: Adjust user permissions
docker exec -u root claude chown -R claude:claude /workspace
```

### Issue: Can't Connect to Docker
```bash
# Fix: Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Issue: Out of Space
```bash
# Fix: Clean up Docker
docker system prune -a
docker volume prune
```

## 📚 Advanced Topics

### Multi-Architecture Builds
```bash
# Build for multiple platforms
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t claude-code:latest \
  --push .
```

### Custom Entrypoints
```dockerfile
# Custom startup script
COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
```

### Health Monitoring
```yaml
healthcheck:
  test: ["CMD", "claude", "--version"]
  interval: 30s
  timeout: 3s
  retries: 3
```

## 🚀 Next Steps

1. **Local Development**: Start with [Docker Setup](docker-setup/setup-guide.md)
2. **Cloud Deployment**: Choose a [VPS provider](vps-deployment/)
3. **Security**: Review [Security Guide](vps-deployment/security-guide.md)
4. **Scale Up**: Explore Kubernetes deployment

## 💡 Pro Tips

1. **Use `.dockerignore`** to exclude unnecessary files
2. **Layer caching** - Order Dockerfile commands strategically
3. **Multi-stage builds** for smaller production images
4. **Volume strategy** - Named volumes for persistence
5. **Compose profiles** for optional services

## 🤝 Contributing

Have deployment tips or configurations to share?
1. Test your setup thoroughly
2. Document any special requirements
3. Submit a PR with your guide

---

Questions? Join our [Discord](https://discord.gg/claude-code) or check [GitHub Discussions](https://github.com/claude-code-hub/discussions)