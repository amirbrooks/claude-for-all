# 🤖 Claude Code Subagents: Comprehensive Guide

> Transform your AI-assisted development from single-threaded assistance into a coordinated team effort

## 📋 Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Quick Start](#quick-start)
4. [Creating Subagents](#creating-subagents)
5. [Configuration & Management](#configuration--management)
6. [Orchestration Patterns](#orchestration-patterns)
7. [Best Practices](#best-practices)
8. [Performance & Optimization](#performance--optimization)
9. [Common Issues & Solutions](#common-issues--solutions)
10. [Advanced Techniques](#advanced-techniques)
11. [Community Resources](#community-resources)

## 🚀 Overview

Claude Code subagents are specialized AI assistants that work autonomously within your Claude Code environment. Think of them as expert team members, each with specific skills and responsibilities.

### Key Benefits

- **🎯 Specialized Expertise**: Each subagent focuses on specific domains
- **⚡ Parallel Execution**: Run up to 10 tasks simultaneously
- **🧠 Context Preservation**: Main conversation stays focused
- **♻️ Reusability**: Use across projects and share with teams
- **🔧 Tool Control**: Fine-grained permissions per subagent

## 🧠 Core Concepts

### What Are Subagents?

Subagents are lightweight Claude instances that:
- Operate in their own context window
- Have custom system prompts
- Access specific tools you grant them
- Return results to the main Claude instance

### How They Work

```
User Request → Main Claude → Analyzes Task → Invokes Subagent(s) → Processes Results → Response
                    ↓
              Orchestrator Role
```

### When to Use Subagents

✅ **Perfect for:**
- Complex multi-step tasks
- Parallel analysis needs
- Specialized domain expertise
- Preserving main context
- Team simulation workflows

❌ **Avoid for:**
- Simple, single-step tasks
- Quick questions
- Tasks requiring full context
- Real-time interactions

## 🏃 Quick Start

### 1. Using the `/agents` Command

The easiest way to get started:

```
/agents
```

This opens an interactive interface where you can:
- View all available subagents
- Create new subagents with guided setup
- Edit existing subagents
- Manage tool permissions

### 2. Your First Subagent

Let's create a simple code reviewer:

```yaml
---
name: code-reviewer
description: Reviews code for bugs, security issues, and best practices. Use PROACTIVELY after code changes.
tools: Read, Grep
---

You are an expert code reviewer with 15+ years of experience. Your role is to:

1. Identify bugs and potential issues
2. Check for security vulnerabilities
3. Suggest performance improvements
4. Ensure code follows best practices
5. Verify proper error handling

Provide feedback in this format:
- 🐛 **Bugs**: Critical issues that will cause errors
- 🔒 **Security**: Vulnerabilities or unsafe practices
- ⚡ **Performance**: Optimization opportunities
- 📝 **Style**: Code quality and readability
- ✅ **Good Practices**: What's done well

Be constructive and specific. Include line numbers when referencing code.
```

### 3. Using Your Subagent

```bash
# Explicit invocation
claude "Use the code-reviewer subagent to review main.py"

# Automatic invocation (if description includes "PROACTIVELY")
claude "I just finished implementing the user authentication feature"
# Claude will automatically use the code-reviewer
```

## 🛠️ Creating Subagents

### Method 1: Interactive Creation (Recommended)

```
/agents
> Create New Agent
> Follow the prompts
```

### Method 2: Manual Creation

Create files in:
- **Project-specific**: `.claude/agents/` (higher priority)
- **Global**: `~/.claude/agents/` (available everywhere)

### Anatomy of a Subagent

```yaml
---
name: agent-name                    # Unique identifier
description: When to use this agent # Include "PROACTIVELY" for auto-use
tools: Tool1, Tool2, Tool3         # Comma-separated list (optional)
---

[System prompt goes here]
This can be multiple paragraphs.
Be specific about the agent's expertise and approach.
```

### Essential Subagents to Create

#### 1. Debug Expert
```yaml
---
name: debug-expert
description: Debugs complex issues. PROACTIVELY analyzes errors and stack traces.
tools: Read, Write, Bash, Grep
---

You are a debugging specialist who excels at:
- Analyzing error messages and stack traces
- Identifying root causes of bugs
- Suggesting multiple solution approaches
- Adding diagnostic logging
- Creating minimal reproductions

When debugging:
1. First understand the expected vs actual behavior
2. Trace through the execution flow
3. Identify the exact point of failure
4. Propose targeted fixes
5. Suggest preventive measures
```

#### 2. Test Automator
```yaml
---
name: test-automator
description: Creates comprehensive test suites. MUST BE USED after implementing new features.
tools: Read, Write, Bash
---

You are a test automation expert specializing in:
- Unit tests with high coverage
- Integration tests for APIs
- End-to-end tests for user flows
- Performance and load tests
- Test-driven development (TDD)

For each feature, create:
1. Happy path tests
2. Edge case tests
3. Error handling tests
4. Performance benchmarks
5. Documentation tests
```

#### 3. Performance Optimizer
```yaml
---
name: performance-optimizer
description: Optimizes code performance and identifies bottlenecks.
tools: Read, Write, Bash, Grep
---

You are a performance engineering expert who:
- Profiles code to find bottlenecks
- Optimizes algorithms and data structures
- Reduces memory usage
- Improves query performance
- Implements caching strategies

Analyze code for:
1. Time complexity (Big O)
2. Space complexity
3. Database query optimization
4. Caching opportunities
5. Async/parallel processing potential
```

## ⚙️ Configuration & Management

### File Structure

```
your-project/
├── .claude/
│   ├── agents/
│   │   ├── backend-specialist.md
│   │   ├── frontend-developer.md
│   │   ├── test-automator.md
│   │   └── security-auditor.md
│   └── settings.json
└── CLAUDE.md
```

### Tool Configuration

#### Option 1: Inherit All Tools (Default)
```yaml
---
name: full-access-agent
description: Has access to all available tools
# No tools field = all tools
---
```

#### Option 2: Specific Tools Only
```yaml
---
name: read-only-agent
description: Can only read and search files
tools: Read, Grep, Glob
---
```

### Available Tools

| Tool | Purpose | Risk Level |
|------|---------|------------|
| Read | Read files | Low |
| Write | Modify files | Medium |
| Bash | Execute commands | High |
| Grep | Search in files | Low |
| Glob | Find files by pattern | Low |
| GitAdd | Stage files | Medium |
| GitCommit | Create commits | Medium |
| WebSearch | Search the web | Low |
| WebFetch | Fetch web content | Low |
| TodoWrite | Manage tasks | Low |

### Settings Configuration

```json
// .claude/settings.json
{
  "subagents": {
    "autoInvoke": true,
    "parallelLimit": 10,
    "timeout": 120000,
    "defaultTools": ["Read", "Grep"]
  }
}
```

## 🎭 Orchestration Patterns

### Pattern 1: Sequential Pipeline

```
User → Architect → Developer → Tester → Reviewer → Deployer
```

**Example:**
```bash
claude "Build a REST API for user management"
# Architect designs the API structure
# Developer implements the code
# Tester creates test suites
# Reviewer checks quality
# Deployer prepares for production
```

### Pattern 2: Parallel Analysis

```
         ┌→ Security Auditor
User → ──┼→ Performance Analyzer
         └→ Accessibility Checker
```

**Example:**
```bash
claude "Analyze this React component comprehensively"
# All three agents work simultaneously
# Results are combined and presented
```

### Pattern 3: Hierarchical Delegation

```
User → Lead Developer → ┬→ Frontend Team
                        └→ Backend Team → Database Specialist
```

**Example:**
```bash
claude "Implement a real-time chat feature"
# Lead developer breaks down the task
# Delegates to specialized teams
# Coordinates implementation
```

### Pattern 4: Iterative Refinement

```
User → Developer → Tester → Developer → Reviewer → Developer
           ↑___________|          ↑___________|
```

**Example:**
```bash
claude "Create a form with validation"
# Developer creates initial version
# Tester finds issues
# Developer fixes issues
# Reviewer suggests improvements
# Developer implements improvements
```

## 🌟 Best Practices

### 1. Naming Conventions

✅ **Good Names:**
- `backend-architect`
- `react-specialist`
- `database-optimizer`
- `security-auditor`

❌ **Poor Names:**
- `agent1`
- `helper`
- `my-agent`
- `test`

### 2. Description Guidelines

```yaml
# Excellent description
description: Expert in React performance optimization. PROACTIVELY analyzes components for rendering issues, suggests memoization strategies, and implements lazy loading. Use for any React performance concerns.

# Poor description
description: Helps with React stuff
```

### 3. Prompt Engineering

**Structure your prompts with:**

1. **Role Definition**: Who the agent is
2. **Expertise Areas**: What they specialize in
3. **Approach**: How they work
4. **Output Format**: How they present results
5. **Constraints**: What they should/shouldn't do

### 4. Tool Selection

```yaml
# Minimal tools for focused tasks
tools: Read, Grep  # Read-only analysis

# Moderate access for development
tools: Read, Write, Bash  # Can modify and test

# Full access for complex tasks
# Omit tools field to grant all
```

### 5. Context Preservation

- Use subagents early in conversations
- Delegate investigation tasks to subagents
- Keep main context for high-level orchestration

## 📊 Performance & Optimization

### Token Usage

| Scenario | Token Multiplier | Strategy |
|----------|-----------------|----------|
| Single agent | 1x | Standard usage |
| 3 parallel agents | 3-4x | Good for complex tasks |
| 10 parallel agents | 8-10x | Reserve for critical analysis |

### Optimization Strategies

1. **Lifecycle Management**
   ```yaml
   ---
   name: efficient-agent
   description: Performs specific task and exits immediately
   ---
   
   Complete the task and return results concisely.
   Do not wait for further instructions.
   ```

2. **Focused Scope**
   - Give agents specific files/directories
   - Limit search patterns
   - Set clear boundaries

3. **Smart Invocation**
   ```bash
   # Don't invoke for simple tasks
   claude "What's 2+2?"  # No subagent needed
   
   # Do invoke for complex tasks
   claude "Refactor this module for better performance"  # Use optimizer
   ```

### Monitoring Usage

```bash
# Check token usage
claude usage

# Monitor active subagents
/agents status

# View subagent history
/agents history
```

## 🔧 Common Issues & Solutions

### Issue 1: Subagents Not Being Invoked

**Problem**: Claude doesn't use subagents when expected

**Solutions**:

1. **Strengthen descriptions:**
   ```yaml
   description: MUST BE USED for all API endpoint creation. PROACTIVELY creates RESTful endpoints.
   ```

2. **Explicit invocation:**
   ```bash
   claude "Use the backend-architect to design the API"
   ```

3. **Check configuration:**
   ```json
   {
     "subagents": {
       "autoInvoke": true
     }
   }
   ```

### Issue 2: Overlapping File Edits

**Problem**: Multiple subagents editing same files

**Solution - Add to CLAUDE.md:**
```markdown
## Subagent File Ownership

- backend-specialist: Only modifies /api and /server
- frontend-developer: Only modifies /client and /components
- test-automator: Only modifies /tests
- No subagent should modify another's files without coordination
```

### Issue 3: Slow Performance

**Problem**: Subagents taking too long

**Solutions**:

1. **Reduce scope:**
   ```yaml
   tools: Read, Grep  # Remove unnecessary tools
   ```

2. **Add timeouts:**
   ```json
   {
     "subagents": {
       "timeout": 60000  // 60 seconds
     }
   }
   ```

3. **Optimize prompts:**
   - Be specific about what to analyze
   - Limit output verbosity
   - Focus on specific files

### Issue 4: Context Confusion

**Problem**: Subagents losing track of task

**Solution**: Create detailed task descriptions
```bash
claude "Use the test-automator to create Jest tests for the auth.js module, focusing on the login and logout functions, including edge cases for invalid credentials"
```

## 🚀 Advanced Techniques

### 1. Dynamic Subagent Creation

```bash
claude "Create a specialized subagent for GraphQL development that understands our schema"
```

### 2. Multi-Perspective Analysis

```bash
claude "Have 4 different experts review this architecture:
1. Security perspective
2. Scalability perspective  
3. Maintainability perspective
4. Cost perspective"
```

### 3. Subagent Chains

Create subagents that invoke other subagents:

```yaml
---
name: feature-implementer
description: Coordinates complete feature implementation
---

You orchestrate feature development by:
1. Using architect-agent for design
2. Using developer-agent for implementation
3. Using test-agent for testing
4. Using reviewer-agent for quality checks

Coordinate their work and ensure smooth handoffs.
```

### 4. Conditional Invocation

```yaml
---
name: smart-debugger
description: Analyzes errors and invokes specialized debuggers
---

When you encounter an error:
1. If it's a TypeScript error, mention "type-specialist needed"
2. If it's a performance issue, mention "performance-expert needed"
3. If it's a security issue, mention "security-auditor needed"

This triggers appropriate specialist subagents.
```

### 5. Parallel Testing Strategies

```bash
claude "Run these test scenarios in parallel:
1. Unit tests on module A
2. Integration tests on API
3. E2E tests on user flow
4. Performance tests on database queries
5. Security tests on authentication"
```

## 📚 Community Resources

### Essential Repositories

1. **[claude-code-hub/subagents](https://github.com/claude-code-hub/subagents)**
   - Community-contributed subagents
   - Rated and reviewed by users
   - Industry-specific collections

2. **[awesome-claude-subagents](https://github.com/awesome-claude-subagents)**
   - Curated list of best subagents
   - Categorized by use case
   - Performance benchmarks

### Popular Subagent Collections

- **Web Development Pack**: 15 agents for modern web dev
- **DevOps Suite**: 10 agents for CI/CD and infrastructure
- **Data Science Toolkit**: 12 agents for ML and analytics
- **Mobile Development Set**: 8 agents for iOS/Android

### Creating Shareable Subagents

```yaml
---
name: your-awesome-agent
description: Clear description of capabilities
author: @yourgithubhandle
version: 1.0.0
tested_claude_version: 2.0.0
tools: Read, Write, Bash
tags: #webdev #react #performance
---

[Your agent prompt]
```

## 🎯 Quick Reference

### Subagent Lifecycle

1. **Creation**: Define in `.md` file
2. **Discovery**: Claude finds in agent directories
3. **Invocation**: Automatic or explicit
4. **Execution**: Runs in isolated context
5. **Completion**: Returns results to main Claude

### Invocation Methods

```bash
# Automatic (with PROACTIVELY in description)
claude "I need to optimize this function"

# Explicit
claude "Use the performance-optimizer on this code"

# Multiple agents
claude "Have the architect, developer, and tester work on this feature"
```

### Best Practices Checklist

- [ ] Clear, descriptive names
- [ ] Detailed descriptions with keywords
- [ ] Minimal necessary tools
- [ ] Specific expertise definition
- [ ] Clear output format
- [ ] Error handling instructions
- [ ] Version documentation

## 💡 Pro Tips

1. **Start Simple**: Begin with 2-3 essential subagents
2. **Iterate**: Refine prompts based on results
3. **Share**: Contribute successful subagents to community
4. **Monitor**: Track token usage and optimize
5. **Document**: Keep notes on what works best

## 🎉 Conclusion

Subagents transform Claude Code from a single assistant into a full development team. Master their use to:

- 🚀 Accelerate development
- 🎯 Improve code quality
- 🧠 Preserve context
- ⚡ Work in parallel
- 🤝 Simulate team collaboration

Start with the essential subagents, experiment with orchestration patterns, and build your perfect AI development team!

---

📖 **Next Steps:**
- [Example Subagents](examples/) - Ready-to-use agents
- [Orchestration Patterns](orchestration-patterns.md) - Advanced workflows
- [Community Agents](community-agents/) - User contributions

🤝 **Contribute**: Share your subagents in our [GitHub repo](https://github.com/claude-code-hub/subagents)!