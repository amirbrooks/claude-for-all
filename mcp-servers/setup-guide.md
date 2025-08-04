# 🔧 MCP Servers Setup Guide

> Complete guide to installing, configuring, and managing MCP servers for Claude Code

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Configuration Deep Dive](#configuration-deep-dive)
4. [Platform-Specific Setup](#platform-specific-setup)
5. [Advanced Configuration](#advanced-configuration)
6. [Testing & Validation](#testing--validation)
7. [Performance Optimization](#performance-optimization)
8. [Security Hardening](#security-hardening)

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher (LTS recommended)
- **npm/npx**: Version 8.0.0 or higher
- **Claude Code**: Latest version installed
- **Memory**: 2GB RAM minimum (4GB recommended)
- **Network**: Stable internet connection

### Check Prerequisites
```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Check npm version
npm --version   # Should be >= 8.0.0

# Check Claude Code installation
claude --version

# Check npx availability
npx --version
```

## 🚀 Installation Methods

### Method 1: NPX (Recommended)

NPX automatically downloads and runs the latest version:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"]
    }
  }
}
```

**Advantages:**
- Always uses latest version
- No manual installation needed
- Minimal disk space usage
- Easy to update

### Method 2: Global Installation

Install servers globally for faster startup:

```bash
# Install globally
npm install -g server-perplexity-ask
npm install -g @executeautomation/playwright-mcp-server
npm install -g @modelcontextprotocol/server-github

# Configure to use global installation
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "server-perplexity-ask"
    }
  }
}
```

**Advantages:**
- Faster startup time
- Offline availability
- Version control
- Reduced network usage

### Method 3: Local Installation

Install in project directory:

```bash
# In your project root
npm install server-perplexity-ask
npm install @executeautomation/playwright-mcp-server

# Configure with local path
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "node",
      "args": ["./node_modules/server-perplexity-ask/index.js"]
    }
  }
}
```

**Advantages:**
- Project-specific versions
- Reproducible environments
- Version locking
- Team consistency

## 🔧 Configuration Deep Dive

### Configuration File Locations

1. **Project Level**: `.claude/settings.json`
   - Shared team configuration
   - Version controlled
   - Project-specific servers

2. **User Level**: `~/.claude/settings.json`
   - Personal preferences
   - Global servers
   - Private API keys

3. **Desktop App**: `~/.claude/claude_desktop_config.json`
   - Desktop-specific settings
   - GUI preferences
   - System integrations

### Configuration Schema

```json
{
  "mcpServers": {
    "server-identifier": {
      "command": "string",           // Command to execute
      "args": ["array", "of", "strings"],  // Command arguments
      "env": {                       // Environment variables
        "KEY": "value",
        "DYNAMIC": "$ENV_VAR"        // Reference from .env
      },
      "cwd": "/optional/working/directory",  // Working directory
      "timeout": 30000,              // Startup timeout (ms)
      "restartOnFailure": true,      // Auto-restart policy
      "maxRestarts": 3               // Maximum restart attempts
    }
  }
}
```

### Environment Variable Management

Create `.claude/.env`:
```bash
# API Keys
ANTHROPIC_API_KEY=sk-ant-api03-xxx
PERPLEXITY_API_KEY=pplx-xxx
GITHUB_TOKEN=ghp_xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx

# Environment Settings
NODE_ENV=development
LOG_LEVEL=debug
MCP_TIMEOUT=60000

# Feature Flags
ENABLE_CACHING=true
ENABLE_RETRY=true
MAX_RETRIES=3
```

### Loading Environment Variables

```json
{
  "mcpServers": {
    "example": {
      "command": "npx",
      "args": ["-y", "server-name"],
      "env": {
        "API_KEY": "$API_KEY",                    // From .env
        "TIMEOUT": "${MCP_TIMEOUT:-30000}",       // With default
        "MODE": "$NODE_ENV",                      // Environment mode
        "COMPOSITE": "${API_URL}/${API_VERSION}"  // Composite values
      }
    }
  }
}
```

## 🖥️ Platform-Specific Setup

### Windows

1. **PowerShell Configuration**:
```powershell
# Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Add to PowerShell profile
notepad $PROFILE
# Add: $env:ANTHROPIC_API_KEY = "your-key"
```

2. **Path Configuration**:
```json
{
  "mcpServers": {
    "custom": {
      "command": "C:\\Program Files\\nodejs\\node.exe",
      "args": ["C:\\path\\to\\server.js"]
    }
  }
}
```

3. **Common Issues**:
- Use forward slashes or escaped backslashes in paths
- Ensure Node.js is in system PATH
- Check Windows Defender/Firewall settings

### macOS

1. **Shell Configuration**:
```bash
# Add to ~/.zshrc or ~/.bash_profile
export ANTHROPIC_API_KEY="your-key"
export PATH="/opt/homebrew/bin:$PATH"
```

2. **Permissions**:
```bash
# Grant terminal permissions if needed
# System Preferences > Security & Privacy > Privacy > Full Disk Access
```

3. **Homebrew Installation**:
```bash
# Install Node.js via Homebrew
brew install node

# Install specific servers
brew tap claude-code/tap
brew install mcp-servers
```

### Linux/WSL

1. **System Setup**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install build essentials (for native modules)
sudo apt-get install -y build-essential
```

2. **Permission Configuration**:
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## 🚀 Advanced Configuration

### Dynamic Server Loading

```javascript
// .claude/dynamic-servers.js
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mcpServers: {
    ...(isDevelopment && {
      "debug-server": {
        "command": "node",
        "args": ["./debug-server.js"]
      }
    }),
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": isDevelopment 
          ? "$PERPLEXITY_DEV_KEY" 
          : "$PERPLEXITY_PROD_KEY"
      }
    }
  }
};
```

### Server Chaining

```json
{
  "mcpServers": {
    "data-pipeline": {
      "command": "node",
      "args": ["./servers/pipeline.js"],
      "env": {
        "UPSTREAM_SERVERS": "firecrawl,processor,storage"
      }
    }
  }
}
```

### Conditional Loading

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "condition": "${ENABLE_BROWSER_AUTOMATION:-false}"
    }
  }
}
```

## 🧪 Testing & Validation

### 1. Individual Server Testing

```bash
# Test Perplexity
npx -y server-perplexity-ask --version
echo $PERPLEXITY_API_KEY

# Test Playwright
npx -y @executeautomation/playwright-mcp-server --help

# Test GitHub
npx -y @modelcontextprotocol/server-github --test
```

### 2. Configuration Validation

```bash
# Validate JSON syntax
jq . .claude/settings.json

# Check environment variables
env | grep -E "(API_KEY|TOKEN|MCP)"

# Test configuration loading
claude config validate
```

### 3. Integration Testing

```bash
# Create test script
cat > test-mcp.sh << 'EOF'
#!/bin/bash
echo "Testing MCP Servers..."

# Test web search
claude "Search for 'test query' and summarize results" || echo "Perplexity failed"

# Test GitHub
claude "List my GitHub repositories" || echo "GitHub failed"

# Test browser automation
claude "Navigate to example.com and take a screenshot" || echo "Playwright failed"
EOF

chmod +x test-mcp.sh
./test-mcp.sh
```

### 4. Health Check Script

```javascript
// health-check.js
const servers = [
  { name: 'perplexity', test: 'Search for "hello"' },
  { name: 'github', test: 'Get user info' },
  { name: 'playwright', test: 'Check browser' }
];

async function checkServers() {
  for (const server of servers) {
    try {
      console.log(`Testing ${server.name}...`);
      // Add actual test logic here
      console.log(`✅ ${server.name} is working`);
    } catch (error) {
      console.error(`❌ ${server.name} failed: ${error.message}`);
    }
  }
}

checkServers();
```

## ⚡ Performance Optimization

### 1. Startup Optimization

```json
{
  "mcpServers": {
    "frequently-used": {
      "command": "server-name",  // Use global install
      "priority": "high",        // Start first
      "preload": true            // Keep warm
    },
    "occasionally-used": {
      "command": "npx",          // Download on demand
      "args": ["-y", "server"],
      "lazy": true               // Start when needed
    }
  }
}
```

### 2. Resource Management

```json
{
  "mcpServers": {
    "heavy-server": {
      "command": "node",
      "args": ["--max-old-space-size=512", "server.js"],
      "env": {
        "NODE_OPTIONS": "--max-old-space-size=512"
      }
    }
  }
}
```

### 3. Caching Configuration

```bash
# Enable npx cache
npm config set cache-min 9999999

# Pre-download servers
npx -y server-perplexity-ask --version
npx -y @executeautomation/playwright-mcp-server --version
npx -y @modelcontextprotocol/server-github --version
```

## 🔒 Security Hardening

### 1. API Key Security

```bash
# Encrypt sensitive data
openssl enc -aes-256-cbc -salt -in .env -out .env.enc

# Decrypt when needed
openssl enc -aes-256-cbc -d -in .env.enc -out .env
```

### 2. Access Control

```json
{
  "mcpServers": {
    "production-db": {
      "command": "supabase-mcp",
      "env": {
        "ALLOWED_OPERATIONS": "SELECT,INSERT",
        "RATE_LIMIT": "100/hour",
        "IP_WHITELIST": "127.0.0.1,10.0.0.0/8"
      }
    }
  }
}
```

### 3. Audit Logging

```javascript
// audit-wrapper.js
const originalServer = require('original-server');

module.exports = {
  ...originalServer,
  execute: async (command) => {
    console.log(`[AUDIT] ${new Date().toISOString()} - ${command}`);
    return originalServer.execute(command);
  }
};
```

## 🔧 Troubleshooting Common Issues

### Issue: Server Won't Start

```bash
# Check Node.js version
node --version

# Clear npx cache
npx clear-npx-cache
rm -rf ~/.npm/_npx/

# Try direct execution
npx -y server-name --debug

# Check permissions
ls -la .claude/
chmod 600 .claude/.env
```

### Issue: API Key Not Found

```bash
# Debug environment loading
node -e "console.log(process.env.PERPLEXITY_API_KEY)"

# Check file permissions
ls -la .claude/.env

# Try direct export
export PERPLEXITY_API_KEY="your-key"
claude "test search"
```

### Issue: Performance Problems

```bash
# Monitor resource usage
ps aux | grep node
top -p $(pgrep -f mcp)

# Check server logs
claude logs mcp-server-name

# Restart servers
claude restart-servers
```

## 📚 Next Steps

1. **Install Your First Server**: Start with [Perplexity](examples/perplexity/)
2. **Set Up Multiple Servers**: Follow our [examples](examples/)
3. **Create Custom Server**: Use our [development guide](development-guide.md)
4. **Optimize Performance**: Apply [best practices](#performance-optimization)

---

Need help? Check our [Troubleshooting Guide](troubleshooting.md) or join [Discord](https://discord.gg/claude-code)