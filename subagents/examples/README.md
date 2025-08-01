# 🎯 Example Subagents

This directory contains production-ready subagents that you can use immediately or customize for your needs.

## 📁 Available Agents

### 🏗️ [Backend Architect](backend-architect.md)
Expert in API design, microservices, and system architecture. Creates comprehensive technical specifications.

**Best for:**
- API design and documentation
- Database schema design
- Microservice architecture
- System scalability planning

### 🎨 [Frontend Developer](frontend-developer.md)
Modern UI/UX implementation specialist. Creates responsive, accessible, and performant interfaces.

**Best for:**
- React/Vue component development
- Responsive design implementation
- Performance optimization
- Accessibility compliance

### 🧪 [Test Automator](test-automator.md)
Comprehensive testing expert. Creates unit, integration, and E2E tests with high coverage.

**Best for:**
- Test suite creation
- Coverage improvement
- E2E test scenarios
- Performance testing

### 🔍 [Debug Expert](debug-expert.md)
Advanced debugging specialist. Hunts down complex bugs and performance issues systematically.

**Best for:**
- Troubleshooting errors
- Performance analysis
- Memory leak detection
- Production debugging

## 🚀 Quick Start

### Installation

1. **Copy to your project:**
   ```bash
   cp backend-architect.md ~/.claude/agents/
   # or
   cp backend-architect.md .claude/agents/
   ```

2. **Or reference directly:**
   ```bash
   claude "Use the backend-architect from examples to design my API"
   ```

### Usage Examples

**Backend Design:**
```bash
claude "Design a REST API for a task management system with user authentication"
```

**Frontend Implementation:**
```bash
claude "Create a responsive dashboard component with charts and real-time updates"
```

**Test Creation:**
```bash
claude "Write comprehensive tests for the UserService class including edge cases"
```

**Debugging:**
```bash
claude "Help debug this memory leak in my Node.js application"
```

## 🛠️ Customization

Each agent can be customized for your specific needs:

1. **Adjust expertise areas** - Add or remove specializations
2. **Modify output format** - Change how results are presented
3. **Update tool access** - Grant only necessary permissions
4. **Add constraints** - Include project-specific rules

### Example Customization

```yaml
---
name: my-backend-architect
description: Backend architect specialized in Python FastAPI and PostgreSQL
tools: Read, Write, Grep
---

# Copy original prompt and modify:
You are a Senior Backend Architect specializing in Python ecosystems...
[Rest of customized prompt]
```

## 📊 Agent Comparison

| Agent | Primary Focus | Tools Needed | Complexity |
|-------|---------------|--------------|------------|
| Backend Architect | Design & Planning | Read, Write | Medium |
| Frontend Developer | Implementation | Read, Write, Bash | High |
| Test Automator | Quality Assurance | Read, Write, Bash | Medium |
| Debug Expert | Problem Solving | All Tools | High |

## 🎯 Orchestration Example

These agents work great together:

```bash
claude "Build a complete user management feature:
1. Use backend-architect to design the API
2. Use frontend-developer to create the UI
3. Use test-automator to ensure quality
4. Use debug-expert if any issues arise"
```

## 💡 Best Practices

1. **Start with one agent** - Don't overwhelm with too many
2. **Use PROACTIVELY keyword** - For automatic invocation
3. **Combine strategically** - Agents complement each other
4. **Monitor token usage** - Complex agents use more tokens
5. **Iterate and improve** - Refine based on results

## 🤝 Contributing

Have an excellent subagent? Share it!

1. Follow the format of existing examples
2. Include comprehensive documentation
3. Add practical usage examples
4. Submit PR to this directory

## 📚 Learn More

- [Creating Custom Subagents](../comprehensive-guide.md#creating-subagents)
- [Orchestration Patterns](../orchestration-patterns.md)
- [Community Agents](../community-agents/)

---

> "These example agents have been battle-tested in real projects" - Claude Code Team