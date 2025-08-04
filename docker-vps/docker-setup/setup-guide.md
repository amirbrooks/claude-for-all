# 🐳 Docker Setup Guide for Claude Code

> Run Claude Code in isolated containers for consistent development environments

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Basic Docker Setup](#basic-docker-setup)
4. [Advanced Configurations](#advanced-configurations)
5. [Docker Compose Setup](#docker-compose-setup)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Production Deployment](#production-deployment)

## 🎯 Introduction

Running Claude Code in Docker provides:
- **🔄 Consistency**: Same environment everywhere
- **🔒 Isolation**: Secure, contained execution
- **📦 Portability**: Easy deployment across platforms
- **🚀 Scalability**: Run multiple instances
- **🛡️ Security**: Controlled resource access

## 📋 Prerequisites

### System Requirements
- Docker Engine 20.10+
- Docker Compose 2.0+ (optional)
- 4GB RAM minimum
- 10GB disk space

### Install Docker

**Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**macOS/Windows:**
Download Docker Desktop from [docker.com](https://docker.com)

## 🚀 Basic Docker Setup

### Simple Dockerfile

Create `Dockerfile`:

```dockerfile
# Base image with Node.js
FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install Claude Code globally
RUN npm install -g @anthropic/claude-cli

# Create a non-root user
RUN useradd -m -s /bin/bash claude
USER claude

# Set up workspace
WORKDIR /home/claude/workspace

# Copy Claude configuration (if exists)
COPY --chown=claude:claude .claude/ /home/claude/.claude/

# Environment variables
ENV ANTHROPIC_API_KEY=""
ENV NODE_ENV=production

# Entry point
ENTRYPOINT ["claude"]
```

### Build and Run

```bash
# Build the image
docker build -t claude-code:latest .

# Run interactively
docker run -it \
  -e ANTHROPIC_API_KEY="your-api-key" \
  -v $(pwd):/home/claude/workspace \
  claude-code:latest

# Run with specific command
docker run -it \
  -e ANTHROPIC_API_KEY="your-api-key" \
  -v $(pwd):/home/claude/workspace \
  claude-code:latest "Help me build a React app"
```

## 🔧 Advanced Configurations

### Development Dockerfile

`Dockerfile.dev`:

```dockerfile
# Development image with more tools
FROM node:20

# Install development dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    build-essential \
    python3 \
    python3-pip \
    postgresql-client \
    redis-tools \
    vim \
    tmux \
    htop \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g \
    @anthropic/claude-cli \
    nodemon \
    typescript \
    ts-node \
    prettier \
    eslint

# Install Docker CLI (for Docker-in-Docker)
RUN curl -fsSL https://get.docker.com -o get-docker.sh && \
    sh get-docker.sh --dry-run

# Create development user
RUN useradd -m -s /bin/bash developer && \
    usermod -aG sudo developer

# Set up development environment
USER developer
WORKDIR /home/developer

# Copy dotfiles
COPY --chown=developer:developer dotfiles/ /home/developer/

# Install MCP servers
RUN npx -y server-perplexity-ask --help && \
    npx -y @modelcontextprotocol/server-playwright --help

# Environment setup
ENV ANTHROPIC_API_KEY=""
ENV PERPLEXITY_API_KEY=""
ENV GITHUB_TOKEN=""

# Volume for persistent data
VOLUME ["/home/developer/workspace", "/home/developer/.claude"]

# Keep container running
CMD ["tail", "-f", "/dev/null"]
```

### Multi-Stage Build

`Dockerfile.multistage`:

```dockerfile
# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /build
RUN npm install -g @anthropic/claude-cli

# Stage 2: Runtime
FROM node:20-alpine

# Copy only necessary files
COPY --from=builder /usr/local/lib/node_modules/@anthropic/claude-cli /usr/local/lib/node_modules/@anthropic/claude-cli
COPY --from=builder /usr/local/bin/claude /usr/local/bin/claude

# Minimal runtime dependencies
RUN apk add --no-cache \
    git \
    curl \
    bash

# Security: Non-root user
RUN adduser -D -s /bin/bash claude
USER claude
WORKDIR /home/claude

ENTRYPOINT ["claude"]
```

## 🎼 Docker Compose Setup

### Basic Compose

`docker-compose.yml`:

```yaml
version: '3.8'

services:
  claude:
    build: .
    image: claude-code:latest
    container_name: claude-code
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - NODE_ENV=development
    volumes:
      - ./workspace:/home/claude/workspace
      - claude-data:/home/claude/.claude
    stdin_open: true
    tty: true
    networks:
      - claude-network

  # Optional: PostgreSQL for development
  postgres:
    image: postgres:15-alpine
    container_name: claude-postgres
    environment:
      POSTGRES_USER: claude
      POSTGRES_PASSWORD: claude123
      POSTGRES_DB: claude_dev
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - claude-network

  # Optional: Redis for caching
  redis:
    image: redis:7-alpine
    container_name: claude-redis
    ports:
      - "6379:6379"
    networks:
      - claude-network

volumes:
  claude-data:
  postgres-data:

networks:
  claude-network:
    driver: bridge
```

### Development Compose

`docker-compose.dev.yml`:

```yaml
version: '3.8'

services:
  claude-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    image: claude-code:dev
    container_name: claude-dev
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - PERPLEXITY_API_KEY=${PERPLEXITY_API_KEY}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - NODE_ENV=development
    volumes:
      # Code volumes
      - ./workspace:/home/developer/workspace
      - ./projects:/home/developer/projects
      
      # Persistent data
      - claude-config:/home/developer/.claude
      - npm-cache:/home/developer/.npm
      
      # Docker socket (for Docker-in-Docker)
      - /var/run/docker.sock:/var/run/docker.sock
      
      # SSH keys (read-only)
      - ~/.ssh:/home/developer/.ssh:ro
      
    ports:
      - "3000:3000"  # React dev server
      - "8080:8080"  # API server
      - "9229:9229"  # Node debugger
    stdin_open: true
    tty: true
    networks:
      - dev-network
    depends_on:
      - postgres
      - redis

  # Development database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: devpass123
      POSTGRES_DB: development
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    networks:
      - dev-network

  # Redis for caching
  redis:
    image: redis:7
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    networks:
      - dev-network

  # Optional: Adminer for database management
  adminer:
    image: adminer
    ports:
      - "8081:8080"
    networks:
      - dev-network

volumes:
  claude-config:
  npm-cache:
  postgres-data:
  redis-data:

networks:
  dev-network:
    driver: bridge
```

### Usage Commands

```bash
# Start services
docker-compose up -d

# Enter Claude container
docker-compose exec claude bash

# Run Claude command
docker-compose exec claude claude "Create a TODO app"

# View logs
docker-compose logs -f claude

# Stop services
docker-compose down

# Remove everything
docker-compose down -v
```

## 📚 Best Practices

### 1. Security

```dockerfile
# Don't include API keys in image
# Use runtime environment variables
ENV ANTHROPIC_API_KEY=""

# Run as non-root
USER claude

# Minimal base images
FROM node:20-alpine

# Security scanning
# Run: docker scan claude-code:latest
```

### 2. Layer Caching

```dockerfile
# Copy package files first
COPY package*.json ./
RUN npm install

# Then copy source code
COPY . .

# This way, npm install is cached unless package.json changes
```

### 3. Environment Management

`.env` file:
```bash
# API Keys
ANTHROPIC_API_KEY=sk-ant-api03-xxx
PERPLEXITY_API_KEY=pplx-xxx
GITHUB_TOKEN=ghp_xxx

# Paths
WORKSPACE_PATH=./workspace
CLAUDE_CONFIG_PATH=./claude-config

# Settings
NODE_ENV=development
LOG_LEVEL=info
```

### 4. Volume Strategy

```yaml
volumes:
  # Code - bind mount for live updates
  - ./code:/workspace
  
  # Config - named volume for persistence
  - claude-config:/home/claude/.claude
  
  # Cache - named volume for performance
  - npm-cache:/home/claude/.npm
```

### 5. Resource Limits

```yaml
services:
  claude:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
```

## 🐛 Troubleshooting

### Common Issues

**1. Permission Denied**
```bash
# Fix ownership
docker exec claude chown -R claude:claude /home/claude/workspace

# Or run with user ID
docker run --user $(id -u):$(id -g) ...
```

**2. API Key Not Working**
```bash
# Check environment
docker exec claude env | grep ANTHROPIC

# Pass correctly
docker run -e ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" ...
```

**3. Can't Access Files**
```bash
# Check mount
docker inspect claude | grep Mounts

# Use absolute paths
docker run -v /absolute/path:/workspace ...
```

**4. Out of Memory**
```bash
# Increase memory
docker run -m 4g ...

# Or in compose
mem_limit: 4g
```

### Debug Commands

```bash
# Interactive shell
docker run -it --entrypoint /bin/bash claude-code:latest

# Check logs
docker logs -f container-name

# Inspect container
docker inspect container-name

# Resource usage
docker stats container-name
```

## 🚀 Production Deployment

### Production Dockerfile

```dockerfile
FROM node:20-alpine AS production

# Security updates
RUN apk update && apk upgrade

# Install Claude Code
RUN npm install -g @anthropic/claude-cli

# Security hardening
RUN adduser -D -s /bin/nologin claude
USER claude

# Read-only root filesystem
WORKDIR /home/claude
VOLUME ["/workspace", "/.claude"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD claude --version || exit 1

# Security options
ENTRYPOINT ["claude"]
```

### Kubernetes Deployment

`claude-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: claude-code
spec:
  replicas: 3
  selector:
    matchLabels:
      app: claude-code
  template:
    metadata:
      labels:
        app: claude-code
    spec:
      containers:
      - name: claude
        image: claude-code:production
        env:
        - name: ANTHROPIC_API_KEY
          valueFrom:
            secretKeyRef:
              name: claude-secrets
              key: api-key
        resources:
          limits:
            memory: "4Gi"
            cpu: "2"
          requests:
            memory: "2Gi"
            cpu: "1"
        volumeMounts:
        - name: workspace
          mountPath: /workspace
        - name: config
          mountPath: /.claude
      volumes:
      - name: workspace
        persistentVolumeClaim:
          claimName: claude-workspace-pvc
      - name: config
        configMap:
          name: claude-config
```

### Container Registry

```bash
# Tag for registry
docker tag claude-code:latest registry.example.com/claude-code:v1.0.0

# Push to registry
docker push registry.example.com/claude-code:v1.0.0

# Pull and run
docker pull registry.example.com/claude-code:v1.0.0
docker run registry.example.com/claude-code:v1.0.0
```

## 📊 Monitoring

### Prometheus Metrics

Add to Dockerfile:
```dockerfile
# Metrics exporter
RUN npm install -g prom-client
COPY metrics-server.js /usr/local/bin/
```

### Logging

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
    labels: "app=claude-code"
```

## 🎯 Quick Reference

### Essential Commands

```bash
# Build
docker build -t claude-code .

# Run interactive
docker run -it -e ANTHROPIC_API_KEY="$KEY" -v $(pwd):/workspace claude-code

# Run detached
docker run -d --name claude claude-code

# Execute command
docker exec claude claude "Your prompt"

# Clean up
docker system prune -a
```

### Compose Commands

```bash
# Start all
docker-compose up -d

# Stop all
docker-compose down

# Rebuild
docker-compose build --no-cache

# Logs
docker-compose logs -f

# Shell access
docker-compose exec claude bash
```

## 📚 Next Steps

- 🌐 [VPS Deployment Guide](../vps-deployment/)
- 🔒 [Security Best Practices](../vps-deployment/security-guide.md)
- 🚀 [CI/CD Integration](/workflows/automation-patterns.md)
- 📊 [Performance Monitoring](/performance/)

---

Need help? Check our [Discord](https://discord.gg/claude-code) or [GitHub Discussions](https://github.com/claude-code-hub/discussions)