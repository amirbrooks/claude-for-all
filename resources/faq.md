# ❓ Frequently Asked Questions

> Quick answers to common Claude Code questions

## 🚀 Getting Started

### What is Claude Code?
Claude Code is Anthropic's official CLI tool that brings Claude's AI capabilities directly to your development environment. It allows you to interact with Claude through your terminal, IDE, or command line interface for coding assistance, debugging, and development tasks.

### How do I install Claude Code?
Installation varies by platform:
- **macOS/Linux**: `npm install -g @anthropic-ai/claude-code`
- **Windows**: Download from the official website or use npm
- **Alternative**: Use the desktop application for a GUI experience

See our [installation guides](../getting-started/installation/) for detailed instructions.

### Do I need an API key?
Yes, you need an Anthropic API key to use Claude Code. You can:
- Get one from [console.anthropic.com](https://console.anthropic.com)
- Set it as an environment variable: `ANTHROPIC_API_KEY`
- Configure it through the CLI setup process

### Is Claude Code free?
Claude Code CLI is free to download and use, but you pay for API usage based on Anthropic's pricing model. The desktop version may have different pricing tiers.

## 🤖 Subagents

### What are subagents?
Subagents are specialized AI assistants that can handle specific tasks within Claude Code. They help preserve context in your main conversation while delegating specialized work like debugging, testing, or specific development tasks.

### When should I use subagents?
Use subagents when you need to:
- Preserve main context while doing specialized tasks
- Handle multiple parallel operations
- Apply domain-specific expertise (e.g., debugging, testing)
- Manage complex workflows

### How many subagents can I run simultaneously?
Claude Code supports up to 10 parallel subagent tasks, though the practical limit depends on your API rate limits and system resources.

### Can I create custom subagents?
Yes! Create a YAML configuration file with your subagent specifications. See our [subagent guide](../subagents/comprehensive-guide.md) for details.

## 🔌 MCP Servers

### What are MCP servers?
MCP (Model Context Protocol) servers extend Claude Code's capabilities by connecting to external services like databases, APIs, web browsers, and other tools.

### Which MCP servers are available?
Popular MCP servers include:
- **Perplexity**: Web search capabilities
- **Playwright**: Browser automation
- **GitHub**: Repository management
- **Supabase**: Database operations
- **Custom servers**: Build your own

### How do I install MCP servers?
Most MCP servers can be installed via npm:
```bash
npx -y server-perplexity-ask  # Example for Perplexity
```
Then configure them in your Claude Code settings.

### Can I build my own MCP server?
Yes! MCP servers can be built in any language that supports the MCP protocol. See our [development guide](../mcp-servers/development-guide.md).

## 💻 Technical Issues

### Claude Code is not responding
Try these troubleshooting steps:
1. Check your internet connection
2. Verify your API key is valid
3. Check Anthropic's service status
4. Restart Claude Code
5. Clear cache/temporary files

### "API key not found" error
Ensure your API key is properly set:
```bash
export ANTHROPIC_API_KEY="your-key-here"
# Or use the config command
claude config set api-key your-key-here
```

### Commands are running slowly
Performance can be affected by:
- Large context windows
- Complex prompts
- Network latency
- API rate limits
- System resources

See our [performance guide](../performance/token-optimization.md) for optimization tips.

### "Rate limit exceeded" error
This means you've hit API usage limits. Solutions:
- Wait for the rate limit to reset
- Upgrade your Anthropic plan
- Optimize your prompts to use fewer tokens
- Implement retry logic with exponential backoff

## 🏢 Team & Enterprise

### Can multiple team members use the same API key?
While technically possible, it's not recommended. Each team member should have their own API key for:
- Better usage tracking
- Individual rate limits
- Security isolation
- Cost attribution

### How do we manage API costs for a team?
- Use Anthropic's organization features
- Monitor usage through the console
- Set up billing alerts
- Implement usage quotas
- Track costs by project/team member

### Is Claude Code secure for enterprise use?
Claude Code follows security best practices:
- API keys are stored securely
- Communications are encrypted
- No code is stored on Anthropic's servers permanently
- Enterprise features include audit logging

### Can we deploy Claude Code on-premises?
Claude Code requires internet access to Anthropic's APIs. However, you can:
- Use it within corporate networks
- Set up proxy configurations
- Deploy on private cloud infrastructure
- Use containerized deployments

## 🐳 Docker & Deployment

### Can I run Claude Code in Docker?
Yes! We provide Docker examples and configurations. See our [Docker guide](../docker-vps/docker-setup/setup-guide.md).

### How do I deploy Claude Code to a VPS?
We have guides for popular VPS providers:
- [DigitalOcean](../docker-vps/vps-deployment/digitalocean.md)
- [AWS EC2](../docker-vps/vps-deployment/aws-ec2.md)
- [Linode](../docker-vps/vps-deployment/linode.md)

### What about environment variables in production?
Use secure methods for API key management:
- Environment variables (preferred)
- Secret management services
- Docker secrets
- Kubernetes secrets

## 📊 Usage & Billing

### How is Claude Code usage billed?
Billing is based on API token usage:
- Input tokens (your prompts and context)
- Output tokens (Claude's responses)
- Different models have different rates

### How can I monitor my usage?
- Check the Anthropic console
- Use the `claude usage` command
- Implement custom usage tracking
- Set up billing alerts

### What counts as a token?
Tokens are roughly equivalent to words or parts of words. On average:
- 1 token ≈ 0.75 words in English
- Code tokens vary by language
- Context and formatting affect token count

### How can I reduce costs?
- Use shorter, more specific prompts
- Optimize context window size
- Choose appropriate models for tasks
- Use subagents to preserve context
- Cache frequently used responses

## 🔧 Customization

### Can I customize Claude Code's behavior?
Yes, through various methods:
- Configuration files (`.claude/settings.json`)
- Environment variables
- Custom subagents
- MCP server integrations
- Custom commands and aliases

### How do I set up custom commands?
Create custom commands using:
- Shell aliases
- Custom scripts
- Configuration templates
- Workflow automation

### Can I change the AI model used?
Yes, you can specify different Claude models:
- Claude 3 Haiku (fastest, cheapest)
- Claude 3 Sonnet (balanced)
- Claude 3 Opus (most capable)

## 🌐 Integration

### Which IDEs support Claude Code?
Official and community extensions exist for:
- VS Code (official)
- Cursor (native support)
- IntelliJ/PyCharm (community plugin)
- Vim/Neovim (community plugin)

### Can I integrate with CI/CD pipelines?
Yes! Claude Code can be used in:
- GitHub Actions
- GitLab CI
- Jenkins pipelines
- Docker containers
- Custom automation scripts

### How do I integrate with version control?
Claude Code works well with:
- Git (commit message generation, code review)
- GitHub (PR descriptions, issue analysis)
- GitLab (merge request assistance)
- Custom workflows

## 📱 Mobile & Remote

### Is there a mobile app?
Currently, Claude Code is primarily a desktop/CLI tool. However:
- Use SSH to access remote Claude Code instances
- Some third-party mobile solutions exist
- Web-based interfaces are in development

### Can I use Claude Code remotely?
Yes, through various methods:
- SSH to remote development servers
- Cloud development environments
- Docker containers on cloud platforms
- VPS deployments

## 🆘 Getting Help

### Where can I get support?
- **Documentation**: This repository and official docs
- **Community**: Discord, Reddit, GitHub Discussions
- **Issues**: GitHub issue tracker
- **Enterprise**: Contact Anthropic support

### How do I report bugs?
1. Check existing issues first
2. Provide reproduction steps
3. Include error messages
4. Share relevant configuration
5. Specify your environment

### Can I request new features?
Yes! Feature requests can be submitted through:
- GitHub Discussions
- Community Discord
- Official feedback channels
- Community forums

### Is there a roadmap?
Check the official Anthropic blog and GitHub repository for:
- Upcoming features
- Development priorities
- Community requests
- Release schedules

## 🎓 Learning & Resources

### I'm new to AI-assisted development. Where do I start?
Follow this learning path:
1. [Installation and setup](../getting-started/)
2. [Basic commands tutorial](../getting-started/basic-commands.md)
3. [Your first project](../getting-started/first-project.md)
4. [Introduction to subagents](../subagents/)
5. [Common workflows](../workflows/)

### Are there video tutorials?
Check the [official Claude Code documentation](https://docs.anthropic.com/claude/docs/claude-code) and community resources for learning materials.

### How can I contribute to the community?
- Share your success stories
- Create tutorials and guides
- Contribute to documentation
- Help others in forums
- Submit feature requests
- Report bugs and issues

---

## 📞 Still Have Questions?

If you can't find your answer here:

1. **Search the documentation** - Use the search function in this repository
2. **Check Discord** - Join our community Discord for real-time help
3. **Browse GitHub Discussions** - See if others have asked similar questions
4. **Create an issue** - For bugs or feature requests
5. **Contact support** - For enterprise or account-specific issues

### Quick Links
- [Official Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Community Discord](https://discord.gg/anthropic)
- [GitHub Repository](https://github.com/anthropics/claude-code)
- [Support Center](https://support.anthropic.com)

---

*Last updated: August 2025*
*This FAQ is continuously updated based on community questions and feedback.*

**Didn't find your answer?** [Submit a question](https://forms.claude-code.com/faq-question) and we'll add it to this list!