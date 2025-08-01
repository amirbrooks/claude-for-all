# 🌟 Community Subagents

> A curated collection of subagents created and shared by the Claude Code community

## 📋 How to Contribute

### 1. Create Your Subagent

Follow the standard format:

```yaml
---
name: your-agent-name
description: Clear description of what this agent does. Use PROACTIVELY for auto-invocation.
tools: Read, Write, Bash  # Only tools needed
author: @yourgithubhandle
version: 1.0.0
tested_with: claude-code@2.0.0
tags: #relevant #tags #here
---

Your detailed agent prompt here...
```

### 2. Test Thoroughly

- Verify the agent works as expected
- Test with different scenarios
- Check token usage efficiency
- Ensure clear output format

### 3. Submit Your Agent

1. Fork this repository
2. Add your agent to this directory
3. Include a section in this README
4. Create a pull request

### 4. Documentation Required

Each submission must include:
- **Purpose**: What problem does it solve?
- **Usage Example**: Real-world scenario
- **Performance Notes**: Token usage expectations
- **Dependencies**: Any specific requirements

## 🏆 Featured Agents

### 🔒 security-auditor
*by @security-expert*

Comprehensive security analysis for web applications. Checks for OWASP Top 10, reviews authentication, and suggests security improvements.

**Usage:**
```bash
claude "Audit my Express app for security vulnerabilities"
```

[View Agent →](security-auditor.md)

---

### 📱 mobile-ui-specialist
*by @mobile-dev*

Expert in React Native and Flutter. Creates cross-platform mobile components with native feel and performance optimization.

**Usage:**
```bash
claude "Create a swipeable card component for my React Native app"
```

[View Agent →](mobile-ui-specialist.md)

---

### 📊 data-analyst
*by @data-scientist*

Analyzes data patterns, suggests visualizations, and helps with pandas/numpy operations. Great for data exploration and insights.

**Usage:**
```bash
claude "Analyze this CSV file and suggest interesting visualizations"
```

[View Agent →](data-analyst.md)

---

### 🌐 api-integrator
*by @integration-master*

Specializes in third-party API integration. Handles authentication, rate limiting, error handling, and data transformation.

**Usage:**
```bash
claude "Integrate the Stripe payment API into my application"
```

[View Agent →](api-integrator.md)

---

### 📝 documentation-writer
*by @docs-expert*

Creates comprehensive documentation including API docs, user guides, and README files. Follows industry best practices.

**Usage:**
```bash
claude "Generate complete API documentation for my REST endpoints"
```

[View Agent →](documentation-writer.md)

## 📊 Agent Statistics

- **Total Agents**: 25+
- **Contributors**: 15+
- **Downloads**: 1000+
- **Average Rating**: 4.8/5

## 🏷️ Browse by Category

### Web Development
- `react-optimizer` - React performance specialist
- `vue-composition-expert` - Vue 3 Composition API
- `nextjs-architect` - Next.js app architecture

### Backend
- `graphql-designer` - GraphQL schema expert
- `microservice-coordinator` - Microservice orchestration
- `database-migrator` - Safe database migrations

### DevOps
- `kubernetes-deployer` - K8s deployment specialist
- `ci-cd-optimizer` - Pipeline optimization
- `monitoring-setup` - Observability configuration

### Mobile
- `ios-swift-expert` - Native iOS development
- `android-kotlin-pro` - Native Android development
- `flutter-architect` - Flutter app architecture

### Data & AI
- `ml-engineer` - Machine learning pipelines
- `data-pipeline-builder` - ETL/ELT processes
- `nlp-specialist` - Natural language processing

## 🌟 Rating System

Agents are rated by the community on:
- ⚡ **Effectiveness** - Does it solve the problem?
- 📚 **Documentation** - Is it well documented?
- 🎯 **Specificity** - Is it focused?
- 💰 **Efficiency** - Token usage optimization
- 🔧 **Maintainability** - Easy to customize?

## 🤝 Community Guidelines

1. **Be Specific** - Agents should have clear, focused purposes
2. **Document Well** - Include examples and edge cases
3. **Test Thoroughly** - Ensure reliability
4. **Share Knowledge** - Help others learn from your agents
5. **Give Credit** - Acknowledge inspirations

## 🔍 Search Agents

Looking for something specific? Use these search patterns:

```bash
# By technology
claude "Show me all React-related subagents"

# By use case
claude "Find subagents for API development"

# By author
claude "List all subagents by @username"
```

## 📈 Trending This Month

1. 🚀 `performance-optimizer` - Full-stack performance
2. 🔐 `auth-implementer` - Authentication flows
3. 📱 `responsive-designer` - Mobile-first design
4. 🧪 `test-coverage-improver` - Test enhancement
5. 📊 `analytics-integrator` - Analytics setup

## 💡 Want to Contribute?

We're always looking for new subagents! Areas of interest:
- Blockchain/Web3 development
- Game development
- IoT applications
- AR/VR experiences
- Accessibility specialists

## 📮 Contact

- **Discord**: Join #subagents channel
- **GitHub**: Open an issue
- **Twitter**: Tag @ClaudeCodeHub

---

> "The best subagents come from real-world experience" - Community Motto