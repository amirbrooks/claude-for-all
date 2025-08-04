# 🔧 MCP Servers Troubleshooting Guide

> Common issues and solutions for MCP server configuration and usage

## 📋 Table of Contents

1. [General Troubleshooting](#general-troubleshooting)
2. [Installation Issues](#installation-issues)
3. [Configuration Problems](#configuration-problems)
4. [Server-Specific Issues](#server-specific-issues)
5. [Performance Problems](#performance-problems)
6. [Debug Techniques](#debug-techniques)
7. [Common Error Messages](#common-error-messages)

## 🔍 General Troubleshooting

### Quick Diagnostic Checklist

```bash
# 1. Check Node.js version
node --version  # Should be >= 18.0.0

# 2. Verify Claude Code installation
claude --version

# 3. Check configuration file
cat .claude/settings.json | jq .mcpServers

# 4. Test environment variables
env | grep -E "(API_KEY|TOKEN)"

# 5. Try manual server execution
npx -y server-perplexity-ask --version
```

### Universal Fixes

1. **Restart Claude Code**
   ```bash
   # Exit current session
   exit
   # Start new session
   claude
   ```

2. **Clear NPX Cache**
   ```bash
   npx clear-npx-cache
   rm -rf ~/.npm/_npx/
   ```

3. **Reinstall Servers**
   ```bash
   npm uninstall -g server-name
   npm install -g server-name@latest
   ```

4. **Reset Configuration**
   ```bash
   cp .claude/settings.json .claude/settings.json.backup
   # Edit and simplify configuration
   ```

## 📦 Installation Issues

### Problem: "Cannot find module" Error

**Symptoms:**
```
Error: Cannot find module 'server-perplexity-ask'
```

**Solutions:**

1. **Use NPX prefix:**
   ```json
   {
     "command": "npx",
     "args": ["-y", "server-perplexity-ask"]
   }
   ```

2. **Install globally:**
   ```bash
   npm install -g server-perplexity-ask
   ```

3. **Check npm registry:**
   ```bash
   npm view server-perplexity-ask
   ```

### Problem: NPX Download Fails

**Symptoms:**
```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/server-name
```

**Solutions:**

1. **Verify package name:**
   ```bash
   # Search for correct package
   npm search mcp server
   ```

2. **Use alternative registry:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

3. **Install specific version:**
   ```bash
   npx -y server-name@1.0.0
   ```

### Problem: Permission Denied

**Symptoms:**
```
EACCES: permission denied
```

**Solutions:**

1. **Fix npm permissions:**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   ```

2. **Use sudo (not recommended):**
   ```bash
   sudo npm install -g server-name
   ```

3. **Change npm directory owner:**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

## ⚙️ Configuration Problems

### Problem: Server Not Loading

**Symptoms:**
- Server doesn't appear in `claude config show`
- No server functionality available

**Solutions:**

1. **Validate JSON syntax:**
   ```bash
   # Check for syntax errors
   jq . .claude/settings.json
   
   # Common issues:
   # - Missing commas
   # - Unclosed brackets
   # - Invalid quotes
   ```

2. **Check file permissions:**
   ```bash
   ls -la .claude/settings.json
   chmod 644 .claude/settings.json
   ```

3. **Verify structure:**
   ```json
   {
     "mcpServers": {
       "server-name": {
         "command": "string",
         "args": ["array"],
         "env": {}
       }
     }
   }
   ```

### Problem: Environment Variables Not Working

**Symptoms:**
```
Error: API key not found
PERPLEXITY_API_KEY is undefined
```

**Solutions:**

1. **Check .env file:**
   ```bash
   # Verify file exists
   ls -la .claude/.env
   
   # Check contents (be careful not to expose keys)
   cat .claude/.env | grep -E "^[A-Z_]+="
   ```

2. **Export variables manually:**
   ```bash
   export PERPLEXITY_API_KEY="your-key"
   export GITHUB_TOKEN="your-token"
   ```

3. **Use absolute paths:**
   ```json
   {
     "env": {
       "API_KEY": "/home/user/.claude/.env"
     }
   }
   ```

4. **Debug variable loading:**
   ```bash
   # Test variable substitution
   node -e "console.log(process.env.PERPLEXITY_API_KEY)"
   ```

### Problem: Wrong Configuration File

**Symptoms:**
- Changes to settings.json have no effect
- Old configuration still active

**Solutions:**

1. **Check all config locations:**
   ```bash
   # Project level
   cat .claude/settings.json
   
   # User level
   cat ~/.claude/settings.json
   
   # Desktop app
   cat ~/.claude/claude_desktop_config.json
   ```

2. **Identify active config:**
   ```bash
   claude config show --verbose
   ```

3. **Clear conflicting configs:**
   ```bash
   # Backup and remove user config
   mv ~/.claude/settings.json ~/.claude/settings.json.old
   ```

## 🔌 Server-Specific Issues

### Perplexity Server

**Problem: "Invalid API Key"**
```bash
# Verify key format (should start with pplx-)
echo $PERPLEXITY_API_KEY | grep "^pplx-"

# Test key directly
curl -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  https://api.perplexity.ai/chat/completions
```

**Problem: "Rate limit exceeded"**
```bash
# Check usage
claude "Show my Perplexity API usage"

# Implement caching
{
  "env": {
    "PERPLEXITY_CACHE": "true",
    "PERPLEXITY_CACHE_TTL": "3600"
  }
}
```

### Playwright Server

**Problem: "Browser not found"**
```bash
# Install browsers
npx playwright install

# Install specific browser
npx playwright install chromium

# Use system browsers
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
```

**Problem: "Timeout waiting for selector"**
```bash
# Increase timeout
{
  "env": {
    "TIMEOUT": "60000",
    "SLOW_MO": "100"
  }
}
```

### GitHub Server

**Problem: "Bad credentials"**
```bash
# Test token
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user

# Check token scopes
curl -I -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user | grep "x-oauth-scopes"
```

**Problem: "Repository not found"**
```bash
# Check repository access
claude "List my GitHub repositories"

# Verify organization access
claude "List my GitHub organizations"
```

## ⚡ Performance Problems

### Problem: Slow Server Startup

**Solutions:**

1. **Use global installation:**
   ```bash
   npm install -g server-name
   # Update config to use direct command
   {
     "command": "server-name"
   }
   ```

2. **Pre-cache packages:**
   ```bash
   # Download without executing
   npx -y server-name --version
   ```

3. **Increase timeout:**
   ```json
   {
     "timeout": 60000  // 60 seconds
   }
   ```

### Problem: High Memory Usage

**Solutions:**

1. **Limit concurrent servers:**
   ```bash
   # Only load needed servers
   # Remove unused servers from config
   ```

2. **Set memory limits:**
   ```json
   {
     "command": "node",
     "args": ["--max-old-space-size=512", "server.js"]
   }
   ```

3. **Enable garbage collection:**
   ```json
   {
     "env": {
       "NODE_OPTIONS": "--expose-gc --max-old-space-size=512"
     }
   }
   ```

### Problem: API Rate Limits

**Solutions:**

1. **Implement caching:**
   ```javascript
   const cache = new Map();
   const CACHE_TTL = 3600000; // 1 hour
   ```

2. **Use batch operations:**
   ```bash
   # Instead of multiple calls
   claude "Get issues 1, 2, 3 separately"
   
   # Use single batch call
   claude "Get issues 1-3 in one request"
   ```

3. **Add rate limiting:**
   ```javascript
   const rateLimit = {
     requests: 0,
     resetTime: Date.now() + 3600000
   };
   ```

## 🔍 Debug Techniques

### Enable Verbose Logging

1. **Claude verbose mode:**
   ```bash
   claude --verbose "test command"
   ```

2. **Server debug mode:**
   ```json
   {
     "args": ["--debug", "--verbose"],
     "env": {
       "DEBUG": "*",
       "LOG_LEVEL": "debug"
     }
   }
   ```

3. **System tracing:**
   ```bash
   # Linux/Mac
   strace -f claude "test command"
   
   # Network tracing
   tcpdump -i any port 443
   ```

### Manual Server Testing

```bash
# 1. Test server directly
npx -y server-perplexity-ask --help

# 2. Run in foreground
node $(npm root -g)/server-perplexity-ask/index.js

# 3. Check server health
curl http://localhost:3000/health

# 4. Monitor process
ps aux | grep mcp
top -p $(pgrep -f mcp)
```

### Configuration Debugging

```javascript
// debug-config.js
const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), '.claude/settings.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('MCP Servers:', JSON.stringify(config.mcpServers, null, 2));

// Validate each server
Object.entries(config.mcpServers).forEach(([name, server]) => {
  console.log(`\nValidating ${name}:`);
  console.log('- Command:', server.command);
  console.log('- Args:', server.args);
  console.log('- Env vars:', Object.keys(server.env || {}));
});
```

## ❌ Common Error Messages

### "ECONNREFUSED"
**Meaning:** Connection refused to server
**Fix:** Check if server is running, firewall settings

### "ETIMEDOUT"
**Meaning:** Operation timed out
**Fix:** Increase timeout, check network connectivity

### "ENOENT"
**Meaning:** File or directory not found
**Fix:** Verify paths, check file permissions

### "401 Unauthorized"
**Meaning:** Invalid or missing credentials
**Fix:** Check API keys, verify token permissions

### "429 Too Many Requests"
**Meaning:** Rate limit exceeded
**Fix:** Implement backoff, reduce request frequency

### "500 Internal Server Error"
**Meaning:** Server-side error
**Fix:** Check server logs, try again later

## 🚀 Prevention Tips

1. **Regular Maintenance:**
   ```bash
   # Weekly cleanup
   npx clear-npx-cache
   npm update -g
   ```

2. **Monitor Resources:**
   ```bash
   # Check disk space
   df -h ~/.npm
   
   # Monitor memory
   free -m
   ```

3. **Backup Configuration:**
   ```bash
   # Regular backups
   cp -r .claude .claude.backup.$(date +%Y%m%d)
   ```

4. **Test Changes:**
   ```bash
   # Test before applying
   claude config validate
   ```

## 📚 Getting Help

1. **Check Logs:**
   ```bash
   # Claude logs
   claude logs
   
   # System logs
   journalctl -f
   ```

2. **Community Support:**
   - [Discord Server](https://discord.gg/claude-code)
   - [GitHub Issues](https://github.com/claude-code-hub/issues)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/claude-code)

3. **Documentation:**
   - [Official Docs](https://docs.anthropic.com/claude-code)
   - [MCP Protocol](https://modelcontextprotocol.io/)
   - [Server Repos](https://github.com/modelcontextprotocol/servers)

---

Still having issues? Join our [Discord](https://discord.gg/claude-code) for real-time help!