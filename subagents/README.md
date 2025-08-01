# 🤖 Claude Code Subagents

> Transform your development workflow with specialized AI agents

## 📁 Directory Contents

### 📚 Guides
- **[Comprehensive Guide](comprehensive-guide.md)** - Everything you need to know about subagents
- **[Orchestration Patterns](orchestration-patterns.md)** - Advanced multi-agent coordination

### 🎯 Example Agents
- **[Backend Architect](examples/backend-architect.md)** - API and system design specialist
- **[Frontend Developer](examples/frontend-developer.md)** - UI/UX implementation expert
- **[Test Automator](examples/test-automator.md)** - Comprehensive testing specialist
- **[Debug Expert](examples/debug-expert.md)** - Advanced debugging and troubleshooting

### 🌟 Community Agents
Browse [community-contributed agents](community-agents/) rated and reviewed by users.

## 🚀 Quick Start

### 1. Interactive Setup
```bash
claude
# Then in the session:
/agents
```

### 2. Create Your First Agent

Save as `.claude/agents/code-reviewer.md`:

```yaml
---
name: code-reviewer
description: Reviews code for best practices. Use PROACTIVELY after changes.
tools: Read, Grep
---

You are an expert code reviewer. Check for:
- Bugs and errors
- Security issues
- Performance problems
- Code style
- Best practices

Be constructive and specific.
```

### 3. Use Your Agent
```bash
claude "Review the changes I just made to auth.js"
```

## 🎯 Essential Subagents

Every project should have these core agents:

1. **🔍 Debug Expert** - Troubleshooting specialist
2. **🧪 Test Automator** - Test creation and coverage
3. **🔒 Security Auditor** - Vulnerability detection
4. **⚡ Performance Optimizer** - Speed improvements
5. **📝 Documentation Writer** - Clear docs and comments

## 💡 Pro Tips

1. **Use "PROACTIVELY"** in descriptions for automatic invocation
2. **Limit tools** to what each agent actually needs
3. **Be specific** in agent prompts for better results
4. **Chain agents** for complex workflows
5. **Monitor usage** with `claude usage`

## 📊 Performance Guidelines

- **1-3 agents**: Ideal for most tasks
- **4-6 agents**: Complex analysis or large features
- **7-10 agents**: Reserve for critical comprehensive reviews

## 🤝 Contributing

Share your subagents with the community!

1. Create your agent following our [guidelines](comprehensive-guide.md#creating-subagents)
2. Test thoroughly
3. Submit a PR to [community-agents/](community-agents/)
4. Include usage examples and performance notes

## 📚 Learn More

- 📖 Read the [Comprehensive Guide](comprehensive-guide.md)
- 🎭 Explore [Orchestration Patterns](orchestration-patterns.md)
- 💬 Join discussions in our [Discord](https://discord.gg/claude-code)
- ⭐ Star successful agents you find helpful

---

> "Subagents are like having a team of experts at your fingertips" - *Claude Code User*