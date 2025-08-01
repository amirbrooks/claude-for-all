# 🔧 Troubleshooting Guide

Having issues with Claude Code? This comprehensive guide covers common problems and their solutions.

## 🚨 Quick Diagnostics

Run this diagnostic script to check your setup:

```bash
#!/bin/bash
echo "=== Claude Code Diagnostics ==="
echo "Date: $(date)"
echo "Platform: $(uname -s)"
echo "Node Version: $(node --version 2>/dev/null || echo 'Not installed')"
echo "NPM Version: $(npm --version 2>/dev/null || echo 'Not installed')"
echo "Claude Version: $(claude --version 2>/dev/null || echo 'Not installed')"
echo "API Key Set: ${ANTHROPIC_API_KEY:+Yes (${ANTHROPIC_API_KEY:0:10}...)}"
echo "Claude Path: $(which claude 2>/dev/null || echo 'Not found')"
echo "NPM Global: $(npm config get prefix 2>/dev/null)"
echo "==============================="
```

## 🔴 Installation Issues

### "claude: command not found"

**Cause**: Claude CLI not in PATH or not installed correctly.

**Solutions**:

1. **Check if installed:**
   ```bash
   npm list -g @anthropic/claude-cli
   ```

2. **Reinstall:**
   ```bash
   npm uninstall -g @anthropic/claude-cli
   npm install -g @anthropic/claude-cli
   ```

3. **Fix PATH:**
   ```bash
   # Find npm global bin
   npm config get prefix
   
   # Add to PATH (example for /usr/local)
   export PATH="/usr/local/bin:$PATH"
   
   # Make permanent
   echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```

### "EACCES: permission denied"

**Cause**: NPM trying to install in system directories without permission.

**Solutions**:

1. **Change npm directory (Recommended):**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   npm install -g @anthropic/claude-cli
   ```

2. **Fix permissions:**
   ```bash
   sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
   ```

3. **Use npx (no install):**
   ```bash
   npx @anthropic/claude-cli
   ```

### "Cannot find module"

**Cause**: Corrupted installation or missing dependencies.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules globally
rm -rf $(npm config get prefix)/lib/node_modules/@anthropic/claude-cli

# Reinstall
npm install -g @anthropic/claude-cli
```

## 🔑 API Key Issues

### "Missing API key"

**Cause**: ANTHROPIC_API_KEY not set or not loaded.

**Solutions**:

1. **Check current value:**
   ```bash
   echo $ANTHROPIC_API_KEY
   ```

2. **Set temporarily:**
   ```bash
   export ANTHROPIC_API_KEY="sk-ant-api03-your-key"
   ```

3. **Set permanently:**
   
   **Linux/macOS:**
   ```bash
   echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key"' >> ~/.bashrc
   source ~/.bashrc
   ```
   
   **Windows PowerShell:**
   ```powershell
   [Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "your-key", "User")
   ```

4. **Project-specific:**
   ```bash
   # Create .env file
   echo "ANTHROPIC_API_KEY=sk-ant-api03-your-key" > .env
   ```

### "Invalid API key"

**Cause**: Incorrect key or formatting issues.

**Solutions**:

1. **Verify key format:**
   - Should start with `sk-ant-api03-`
   - No extra spaces or quotes
   - Complete key (not truncated)

2. **Test key directly:**
   ```bash
   curl https://api.anthropic.com/v1/messages \
     -H "x-api-key: $ANTHROPIC_API_KEY" \
     -H "anthropic-version: 2023-06-01" \
     -H "content-type: application/json" \
     -X POST \
     -d '{"model":"claude-3-opus-20240229","messages":[{"role":"user","content":"Hello"}],"max_tokens":10}'
   ```

3. **Check for special characters:**
   ```bash
   # Remove any hidden characters
   export ANTHROPIC_API_KEY=$(echo $ANTHROPIC_API_KEY | tr -d '\r\n')
   ```

## 🌐 Network Issues

### "Connection timeout"

**Cause**: Network connectivity or firewall issues.

**Solutions**:

1. **Test connectivity:**
   ```bash
   # Test Anthropic API
   curl -I https://api.anthropic.com
   
   # Test DNS
   nslookup api.anthropic.com
   ```

2. **Proxy configuration:**
   ```bash
   # HTTP proxy
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=http://proxy.company.com:8080
   
   # For npm
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy http://proxy.company.com:8080
   ```

3. **Firewall rules:**
   - Ensure port 443 (HTTPS) is open
   - Whitelist `api.anthropic.com`

### "SSL certificate problem"

**Cause**: Corporate firewall or outdated certificates.

**Solutions**:

1. **Update certificates:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update && sudo apt-get install ca-certificates
   
   # macOS
   brew install ca-certificates
   ```

2. **Corporate proxy:**
   ```bash
   # Add corporate certificate
   export NODE_EXTRA_CA_CERTS="/path/to/corporate-cert.crt"
   ```

3. **Temporary workaround (NOT for production):**
   ```bash
   export NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

## 💻 Runtime Issues

### "JavaScript heap out of memory"

**Cause**: Large context or insufficient memory allocation.

**Solutions**:

1. **Increase memory:**
   ```bash
   # Set heap size to 4GB
   export NODE_OPTIONS="--max-old-space-size=4096"
   
   # Or run with flag
   node --max-old-space-size=4096 $(which claude)
   ```

2. **Reduce context:**
   - Use more specific file patterns
   - Break large tasks into smaller ones
   - Clear context periodically with `/clear`

### "Session not found" when resuming

**Cause**: Session expired or cleared.

**Solutions**:

1. **Check session history:**
   ```bash
   claude history
   ```

2. **Find session file:**
   ```bash
   # Default location
   ls ~/.claude/sessions/
   ```

3. **Start fresh:**
   ```bash
   claude  # Start new session
   ```

### Slow response times

**Cause**: Large context, network latency, or system resources.

**Solutions**:

1. **Check context size:**
   ```bash
   # In Claude session
   /context
   ```

2. **Optimize file reading:**
   ```bash
   # Instead of
   claude --file "**/*"
   
   # Use specific patterns
   claude --file "src/**/*.js"
   ```

3. **System resources:**
   ```bash
   # Check CPU and memory
   top  # Linux/macOS
   # or
   taskmgr  # Windows
   ```

## 🐛 Platform-Specific Issues

### macOS: "xcrun: error"

**Cause**: Xcode Command Line Tools not installed.

**Solution**:
```bash
xcode-select --install
```

### Windows: Execution Policy

**Cause**: PowerShell blocking scripts.

**Solution**:
```powershell
# Check policy
Get-ExecutionPolicy

# Set to RemoteSigned
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### WSL: Clock sync issues

**Cause**: WSL time drift causing API failures.

**Solution**:
```bash
# Sync time
sudo hwclock -s

# Or automatic fix
sudo ntpdate time.windows.com
```

### Linux: Missing shared libraries

**Cause**: Missing system dependencies.

**Solution**:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y build-essential

# Fedora
sudo dnf groupinstall "Development Tools"
```

## 🔌 MCP Server Issues

### "MCP server not found"

**Cause**: Server not installed or configured.

**Solutions**:

1. **Install server:**
   ```bash
   # Example: Perplexity
   npx -y server-perplexity-ask
   ```

2. **Check configuration:**
   ```json
   // .claude/settings.json
   {
     "mcpServers": {
       "server-name": {
         "command": "npx",
         "args": ["-y", "server-name"]
       }
     }
   }
   ```

### "MCP server crashed"

**Cause**: Server error or missing dependencies.

**Solutions**:

1. **Test server directly:**
   ```bash
   npx server-name --help
   ```

2. **Check logs:**
   ```bash
   # Enable debug logging
   export DEBUG=mcp:*
   claude
   ```

## 🎯 Common Error Messages

### "Rate limit exceeded"

**Cause**: Too many API requests.

**Solution**:
- Wait a few minutes
- Check usage: `claude usage`
- Upgrade API plan if needed

### "Context window exceeded"

**Cause**: Too much content in conversation.

**Solutions**:
1. Clear context: `/clear`
2. Start new session
3. Use subagents for specific tasks

### "Invalid JSON in response"

**Cause**: Network interruption or API issue.

**Solutions**:
1. Retry the command
2. Check network stability
3. Use `--no-stream` flag

## 🛠️ Debug Mode

Enable detailed logging:

```bash
# Set debug environment
export CLAUDE_DEBUG=true
export DEBUG=*

# Run with verbose flag
claude --verbose "test command"

# Log to file
claude "test" 2>&1 | tee debug.log
```

## 📞 Getting Help

### 1. Self-Help Resources

- Check this guide first
- Search [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- Read [Official Docs](https://docs.anthropic.com/claude/docs/claude-code)

### 2. Community Support

- [Discord Server](https://discord.gg/claude-code)
- [Telegram Group](https://t.me/claudecodeusers)
- [GitHub Discussions](https://github.com/claude-code-hub/discussions)

### 3. Reporting Issues

When reporting issues, include:

```markdown
**Environment:**
- OS: [e.g., macOS 14.0]
- Node: [e.g., v20.0.0]
- Claude Code: [e.g., 2.0.0]
- Shell: [e.g., zsh]

**Issue:**
[Clear description]

**Steps to Reproduce:**
1. Run command X
2. See error Y

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Debug Log:**
```
[Paste relevant logs]
```
```

## 🔄 Reset & Cleanup

### Complete Reset

```bash
#!/bin/bash
# Backup settings
cp -r ~/.claude ~/.claude.backup

# Remove Claude Code
npm uninstall -g @anthropic/claude-cli

# Clear cache
rm -rf ~/.claude/cache
rm -rf ~/.claude/sessions

# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g @anthropic/claude-cli
```

### Cache Cleanup

```bash
# Clear session cache
rm -rf ~/.claude/sessions/*

# Clear MCP cache
rm -rf ~/.claude/mcp-cache/*

# Clear npm cache
npm cache clean --force
```

## 💡 Prevention Tips

1. **Keep Updated:**
   ```bash
   npm update -g @anthropic/claude-cli
   ```

2. **Regular Backups:**
   ```bash
   # Backup Claude config
   tar -czf claude-backup.tar.gz ~/.claude
   ```

3. **Monitor Usage:**
   ```bash
   # Check regularly
   claude usage
   ```

4. **Test Changes:**
   ```bash
   # Test in isolated environment
   npm install @anthropic/claude-cli --dry-run
   ```

---

Still having issues? Join our [Discord](https://discord.gg/claude-code) for real-time help!