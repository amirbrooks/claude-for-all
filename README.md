# 🚀 Claude for All

> Community resources and guides for Claude Code - AI-powered development for everyone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Public Repository](https://img.shields.io/badge/Repository-Public-green)](https://github.com/amirbrooks/claude-for-all)
[![Community Welcome](https://img.shields.io/badge/Community-Welcome-blue)](CONTRIBUTING.md)

## 📖 What is Claude Code?

Claude Code is Anthropic's official CLI tool that brings Claude's AI capabilities directly to your development environment. This community repository serves as a hub for:

- 🎯 **Getting Started**: Platform-specific installation and setup guides
- 🤖 **Subagents**: Advanced AI agents for specialized tasks
- 🚀 **AI Workflow Commands**: 13 powerful automation workflows for daily productivity
- 🐳 **Docker & VPS**: Containerization and remote deployment
- 🔌 **MCP Servers**: Extend Claude with external capabilities
- 📝 **Best Practices**: Prompting techniques and workflow optimization
- 🎯 **Real Examples**: Industry-specific use cases and templates

## 🏃‍♂️ Quick Start

```bash
# Install Claude Code (macOS/Linux)
npm install -g @anthropic-ai/claude-code

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

### 🚀 [AI Workflow Commands](community-resources/workflows/)
Transform your productivity with 13 AI-powered automation workflows:
- **[Complete Overview & Implementation Guide](WORKFLOW-COMMANDS-OVERVIEW.md)** 📊
- [Daily Operations](community-resources/workflows/daily-operations/) - Foundation workflows (daily, quick-capture, weekly-review)
- [Client Management](community-resources/workflows/client-management/) - Client lifecycle automation
- [Content Creation](community-resources/workflows/content-creation/) - AI-powered content generation
- [Business Innovation](community-resources/workflows/business-innovation/) - Idea validation frameworks
- [Development & Innovation](community-resources/workflows/development-innovation/) - Component libraries & innovation
- [System Management](community-resources/workflows/system-management/) - AI agent documentation

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
- [Blog Posts](resources/blog-posts.md)
- [FAQ](resources/faq.md)

## 🌟 Featured Examples

### 🚀 AI Workflow Commands
```bash
# Transform daily chaos into structured productivity
claude "/daily"
# Output: Comprehensive daily summary with insights and todos

# Capture ideas instantly without breaking flow  
claude "/quick-capture 'Add AI voice to mobile app'"
# Output: Idea captured and intelligently categorized

# Generate brand-consistent content
claude "/content-create blog post about AI productivity"
# Output: SEO-optimized article matching your voice
```
[View All 13 Workflows →](WORKFLOW-COMMANDS-OVERVIEW.md)

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
RUN npm install -g @anthropic-ai/claude-code
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
- **[bug-hunter](subagents/community-agents/bug-hunter.md)** - Advanced debugging specialist
- **[ui-ux-expert](subagents/community-agents/ui-ux-expert.md)** - Design system specialist  
- **[test-automator](subagents/community-agents/test-automator.md)** - Comprehensive testing agent

### 📊 What's Included

- 🚀 **13 AI Workflow Commands** - Production-ready automation
- 📚 **Comprehensive Documentation** - Complete guides and examples
- 🤖 **Subagent Examples** - Specialized AI agents for different tasks
- 🐳 **Docker & VPS Guides** - Deployment and scaling resources
- 🔌 **MCP Server Examples** - Extend Claude with external capabilities

## 🔗 Quick Links

- 📖 [Official Claude Docs](https://docs.anthropic.com/claude/docs/claude-code)
- 🤝 [Community Wiki](https://github.com/amirbrooks/claude-for-all/wiki)
- 📋 [Project Board](https://github.com/amirbrooks/claude-for-all/projects)
- 🐛 [Issue Tracker](https://github.com/amirbrooks/claude-for-all/issues)
- 💬 [Community Discussions](https://github.com/amirbrooks/claude-for-all/discussions)

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
  <a href="#-claude-for-all">Back to top ↑</a>
</p>