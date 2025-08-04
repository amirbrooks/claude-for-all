# 🔌 MCP Servers - Extend Claude Code

> Model Context Protocol (MCP) servers enable Claude Code to interact with external tools, services, and APIs, dramatically expanding its capabilities

## 📖 What are MCP Servers?

MCP servers are external processes that provide additional capabilities to Claude Code through a standardized protocol. They enable:

- 🌐 **Web Search**: Real-time information retrieval
- 🤖 **Browser Automation**: Web scraping and testing
- 🐙 **GitHub Integration**: Repository management
- 🗄️ **Database Operations**: Direct database access
- 🔥 **Web Scraping**: Advanced content extraction
- ∞ **Custom Tools**: Build your own integrations

## 🚀 Quick Start

### 1. Basic Configuration

Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY"
      }
    }
  }
}
```

### 2. Environment Setup

Create `.claude/.env`:

```bash
# API Keys for MCP Servers
PERPLEXITY_API_KEY=your_perplexity_key
GITHUB_TOKEN=your_github_pat
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 3. Test Your Setup

```bash
# Check MCP servers are loaded
claude config show

# Test web search
claude "Search for the latest AI news"

# Test GitHub integration
claude "List my recent GitHub repositories"
```

## 📚 Available MCP Servers

### 🔍 [Perplexity](examples/perplexity/)
Real-time web search with AI-powered synthesis
- Current information retrieval
- Source attribution
- Time-based filtering

### 🎭 [Playwright](examples/playwright/)
Browser automation and web scraping
- Automated testing
- Screenshot capture
- Form interaction

### 🐙 [GitHub](examples/github/)
Complete GitHub API integration
- Repository management
- Issue/PR operations
- Actions workflow control

### 🗄️ [Supabase](examples/supabase/)
PostgreSQL database operations
- Direct SQL queries
- Data manipulation
- Real-time subscriptions

### 🔥 [Firecrawl](examples/firecrawl/)
Advanced web scraping and crawling
- Site mapping
- Content extraction
- Structured data parsing

### 🛠️ [Custom Server](examples/custom-server/)
Build your own MCP server
- Template starter code
- Protocol documentation
- Example implementations

## 🔧 Configuration Guide

### Project-Level Configuration

`.claude/settings.json`:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "command-to-run",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR": "$ENV_VAR_NAME"
      }
    }
  }
}
```

### User-Level Configuration

`~/.claude/claude_desktop_config.json` (Desktop app):
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {
        "API_KEY": "actual_key_value"
      }
    }
  }
}
```

### Environment Variables

Best practices for API key management:
1. Use `.env` files (git-ignored)
2. Reference with `$VAR_NAME` in config
3. Never commit actual keys
4. Use separate keys for dev/prod

## 🚀 Common Patterns

### 1. Multiple Server Setup

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {"PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY"}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "$GITHUB_TOKEN"}
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

### 2. Development vs Production

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "$SUPABASE_URL",
        "SUPABASE_KEY": "$NODE_ENV === 'production' ? $SUPABASE_PROD_KEY : $SUPABASE_DEV_KEY"
      }
    }
  }
}
```

### 3. Custom Server with Local Path

```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["./mcp-servers/custom/index.js"],
      "env": {
        "CONFIG_PATH": "./config/custom-server.json"
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**1. Server Not Starting**
```bash
# Check if npx can find the package
npx -y server-name --version

# Clear npx cache
npx clear-npx-cache

# Check Node.js version (need v18+)
node --version
```

**2. API Key Issues**
```bash
# Verify environment variables
echo $PERPLEXITY_API_KEY

# Check if .env is loaded
cat .claude/.env

# Test with direct value (temporary)
export PERPLEXITY_API_KEY="your_actual_key"
```

**3. Configuration Not Loading**
```bash
# Validate JSON syntax
jq . .claude/settings.json

# Check Claude is reading config
claude config show

# Restart Claude Code
# Exit and restart your session
```

### Debug Commands

```bash
# Enable verbose logging
claude --verbose "test query"

# Check loaded servers
claude config show | grep mcpServers -A 20

# Test specific server
npx -y server-perplexity-ask --help
```

## 📊 Performance Tips

1. **Server Lifecycle**: MCP servers start with Claude and stop when session ends
2. **Resource Usage**: Monitor memory usage with heavy automation servers
3. **API Limits**: Be aware of rate limits for external services
4. **Caching**: Some servers support response caching
5. **Parallel Operations**: Claude can use multiple servers simultaneously

## 🔒 Security Best Practices

1. **API Key Storage**
   - Never commit keys to git
   - Use environment variables
   - Rotate keys regularly
   - Use minimal permissions

2. **Network Security**
   - Use HTTPS endpoints only
   - Validate SSL certificates
   - Monitor API usage
   - Implement request logging

3. **Access Control**
   - Separate dev/prod credentials
   - Use read-only tokens where possible
   - Audit server permissions
   - Regular security reviews

## 📚 Resources

- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Claude Code MCP Docs](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Community MCP Servers](https://github.com/ppluto-dev/awesome-mcp-tools)

## 🎯 Next Steps

1. **Install Your First Server**: Start with [Perplexity](examples/perplexity/) for web search
2. **Explore Automation**: Try [Playwright](examples/playwright/) for browser control
3. **Build Custom Tools**: Use our [template](examples/custom-server/) to create your own
4. **Share Your Servers**: Contribute to the community!

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check [Troubleshooting Guide](troubleshooting.md)