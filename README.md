# 🚀 Claude Code Hub

> The comprehensive community resource for mastering Claude Code - from setup to advanced workflows

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Community](https://img.shields.io/badge/Community-Join%20Us-blue)](https://github.com/yourusername/claude-code-hub/discussions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📖 What is Claude Code?

Claude Code is Anthropic's official CLI tool that brings Claude's AI capabilities directly to your development environment. This repository serves as a comprehensive community hub for:

- 🎯 **Getting Started**: Platform-specific installation and setup guides
- 🤖 **Subagents**: Advanced AI agents for specialized tasks
- 🐳 **Docker & VPS**: Containerization and remote deployment
- 🔌 **MCP Servers**: Extend Claude with external capabilities
- 📝 **Best Practices**: Prompting techniques and workflow optimization
- 🚀 **Real Examples**: Industry-specific use cases and templates

## 🏃‍♂️ Quick Start

```bash
# Install Claude Code (macOS/Linux)
npm install -g @anthropic/claude-cli

# Configure API key
export ANTHROPIC_API_KEY="your-api-key"

# Start your first session
claude "Help me build a React app"
```

📚 **[Full Installation Guide →](getting-started/installation/)**

## 📁 Repository Structure

### 🚀 [Getting Started](getting-started/)
- Platform-specific installation ([macOS](getting-started/installation/mac-setup.md), [Windows](getting-started/installation/windows-setup.md), [Linux](getting-started/installation/linux-setup.md), [WSL](getting-started/installation/wsl-setup.md))
- [First Project Guide](getting-started/first-project.md)
- [Basic Commands](getting-started/basic-commands.md)
- [Troubleshooting](getting-started/troubleshooting.md)

### 🤖 [Subagents](subagents/)
- [Comprehensive Guide](subagents/comprehensive-guide.md)
- [Example Agents](subagents/examples/)
- [Community Contributions](subagents/community-agents/)
- [Orchestration Patterns](subagents/orchestration-patterns.md)

### 🐳 [Docker & VPS Deployment](docker-vps/)
- [Docker Setup Guide](docker-vps/docker-setup/setup-guide.md)
- VPS Deployment: [DigitalOcean](docker-vps/vps-deployment/digitalocean.md), [AWS](docker-vps/vps-deployment/aws-ec2.md), [Linode](docker-vps/vps-deployment/linode.md)
- [Security Best Practices](docker-vps/vps-deployment/security-guide.md)
- [Remote Development](docker-vps/remote-development.md)

### 🔌 [MCP Servers](mcp-servers/)
- [Setup Guide](mcp-servers/setup-guide.md)
- Examples: [Perplexity](mcp-servers/examples/perplexity/), [Playwright](mcp-servers/examples/playwright/), [GitHub](mcp-servers/examples/github/)
- [Development Guide](mcp-servers/development-guide.md)

### 🔧 [Context Configuration](context-config/)
- [CLAUDE.md Guide](context-config/claude-md-guide.md)
- [Project Templates](context-config/templates/)
- [Best Practices](context-config/best-practices.md)

### 📝 [Prompting & Techniques](prompting/)
- [Effective Prompting](prompting/effective-prompting.md)
- [Thinking Modes](prompting/thinking-modes.md) (think → think hard → ultrathink)
- [Plan Mode Guide](prompting/plan-mode-guide.md)
- [Voice Consistency](prompting/voice-consistency.md)

### 🛠️ [Workflows](workflows/)
- [Custom Commands](workflows/custom-commands/)
- [Automation Patterns](workflows/automation-patterns.md)
- [Daily Routines](workflows/daily-routines.md)
- [Team Collaboration](workflows/team-collaboration.md)

### 📊 [Performance](performance/)
- [Token Optimization](performance/token-optimization.md)
- [Context Management](performance/context-management.md)
- [Parallel Execution](performance/parallel-execution.md)
- [Usage Monitoring](performance/monitoring-usage.md)

### 🎯 [Use Cases](use-cases/)
- [Web Development](use-cases/web-development/)
- [Data Science](use-cases/data-science/)
- [DevOps](use-cases/devops/)
- [Content Creation](use-cases/content-creation/)
- [Agency/Consultancy](use-cases/agency-consultancy/)

### 📚 [Resources](resources/)
- [Community Links](resources/community-links.md)
- [Video Tutorials](resources/video-tutorials.md)
- [Blog Posts](resources/blog-posts.md)
- [FAQ](resources/faq.md)

## 🌟 Featured Examples

### 🤖 Subagent Orchestra
```yaml
---
name: fullstack-developer
description: Complete web app development with frontend, backend, and testing
tools: Read, Write, Bash, Grep, WebSearch
---

You are a senior fullstack developer who coordinates with specialized subagents...
```
[View Full Example →](subagents/examples/fullstack-developer.md)

### 🐳 Docker Deployment
```dockerfile
FROM node:20-slim
RUN npm install -g @anthropic/claude-cli
WORKDIR /workspace
COPY .claude/ .claude/
ENV ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
```
[View Full Guide →](docker-vps/docker-setup/setup-guide.md)

### 🔌 MCP Server Integration
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
[View Setup Guide →](mcp-servers/examples/perplexity/)

## 💡 Pro Tips

1. **Context is King**: Use subagents early in conversations to preserve main context
2. **Think Modes**: Use "ultrathink" for complex problem-solving tasks
3. **Plan Mode**: Press `Shift+Tab` for better reliability on complex tasks
4. **Parallel Power**: Claude supports up to 10 parallel subagent tasks
5. **Token Awareness**: Monitor usage with `ccusage` command

## 🤝 Contributing

We love contributions! Whether it's:
- 📝 Documentation improvements
- 🤖 New subagent examples
- 🐛 Bug fixes in examples
- 💡 New use cases
- 🎥 Video tutorials

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

## 🏆 Community Showcase

### Featured Subagents
- **[bug-hunter](subagents/community-agents/bug-hunter.md)** by @username - Advanced debugging specialist
- **[ui-ux-expert](subagents/community-agents/ui-ux-expert.md)** by @username - Design system specialist
- **[test-automator](subagents/community-agents/test-automator.md)** by @username - Comprehensive testing agent

### Success Stories
- "Reduced development time by 60% using custom subagents" - *Agency Name*
- "Deployed Claude Code on VPS for team collaboration" - *Startup Name*
- "Built entire SaaS MVP using Claude Code workflows" - *Developer Name*

[Submit Your Story →](resources/success-stories.md)

## 📊 Stats & Growth

- 🌟 **500+** Stars
- 🤝 **50+** Contributors
- 🤖 **100+** Subagent Examples
- 📚 **200+** Documentation Pages
- 🚀 **1000+** Community Members

## 🔗 Quick Links

- 📖 [Official Claude Docs](https://docs.anthropic.com/claude/docs/claude-code)
- 💬 [Community Discord](https://discord.gg/claude-code)
- 🐦 [Twitter Updates](https://twitter.com/claude_code_hub)
- 📺 [YouTube Channel](https://youtube.com/@claudecodehub)
- 🗣️ [Telegram Group](https://t.me/claudecodeusers)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Anthropic team for creating Claude Code
- All our amazing contributors
- The vibrant Claude Code community

---

<p align="center">
  Made with ❤️ by the Claude Code Community
</p>

<p align="center">
  <a href="#-claude-code-hub">Back to top ↑</a>
</p>