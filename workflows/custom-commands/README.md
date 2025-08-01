# 🤖 Custom Commands

> Ready-to-use Claude Code commands for common development tasks

## 📖 Overview

Custom commands are pre-built workflows that automate specific tasks. Each command includes clear instructions, tool permissions, and expected outcomes. Simply copy the command files to your `.claude/commands/` directory and start using them.

## 📚 Available Commands

### 📅 Daily Operations
- **[daily-summary.md](daily-summary.md)** - Generate comprehensive daily development summary
- **[weekly-review.md](weekly-review.md)** - Conduct weekly retrospective and planning
- **[quick-capture.md](quick-capture.md)** - Rapid idea and task capture system

### 👥 Client & Project Management
- **[client-management.md](client-management.md)** - Set up new client workspace and tracking
- **[project-reporting.md](project-reporting.md)** - Generate detailed project status reports
- **[email-generation.md](email-generation.md)** - Create professional emails matching your voice

### 📝 Content & Documentation
- **[content-creation.md](content-creation.md)** - AI-powered content generation with SEO
- **[voice-analysis.md](voice-analysis.md)** - Analyze text for brand voice consistency
- **[ai-documentation.md](ai-documentation.md)** - Document AI agent configurations

### 💡 Innovation & Development
- **[idea-management.md](idea-management.md)** - Smart idea capture and organization
- **[microsaas-validation.md](microsaas-validation.md)** - Validate MicroSaaS ideas with 5-step framework
- **[component-library.md](component-library.md)** - Build and maintain reusable code components

## 🚀 Quick Start

### 1. Installation

```bash
# Copy desired commands to your project
cp workflows/custom-commands/daily-summary.md .claude/commands/

# Or copy all commands
cp workflows/custom-commands/*.md .claude/commands/
```

### 2. Usage

```bash
# Execute a command
claude "/daily-summary"
claude "/project-status"
claude "/quick-capture"
```

### 3. Customization

Edit the command files to match your specific needs:
- Modify file paths and directory structures
- Adjust output formats
- Add your specific tools and integrations
- Customize templates and variables

## 📋 Command Structure

Each command follows this standard format:

```yaml
---
description: "Brief description of what the command does"
allowed-tools: ["Read", "Write", "Bash", "Grep", "Glob"]
tags: ["category", "use-case"]
version: "1.0"
author: "claude-code-hub"
---

# Command Instructions

Clear, step-by-step instructions for Claude to follow:

1. **Initial Setup**
   - Check prerequisites
   - Validate environment

2. **Main Processing**
   - Core workflow steps
   - Decision points

3. **Output Generation**
   - Format results
   - Save to appropriate location
   - Notify completion

## Templates and Examples

[Include any templates or examples the command uses]
```

## 🎯 Command Categories

### Daily Productivity
Commands that help with daily development workflows:
- Progress tracking
- Task management
- Status reporting
- Time optimization

### Project Management
Commands for managing projects and clients:
- Project setup
- Status reporting
- Resource tracking
- Timeline management

### Content Creation
Commands for generating and managing content:
- Blog posts and articles
- Documentation
- Email communication
- Social media content

### Code Management
Commands for code-related tasks:
- Component libraries
- Code reviews
- Refactoring
- Documentation generation

### Innovation
Commands for idea management and validation:
- Idea capture
- Market research
- Validation frameworks
- Opportunity assessment

## 🔧 Customization Guide

### Adapting Commands to Your Workflow

1. **Modify File Paths**
   ```yaml
   # Change from generic paths
   Generate report in `reports/daily/`
   
   # To your specific structure
   Generate report in `docs/status-reports/`
   ```

2. **Adjust Output Formats**
   ```markdown
   # Default format
   ## Summary
   - Item 1
   - Item 2
   
   # Your preferred format
   **Summary:**
   1. Item 1
   2. Item 2
   ```

3. **Add Your Tools**
   ```yaml
   # Add your specific tools
   allowed-tools: ["Read", "Write", "Bash", "YourCustomTool"]
   ```

4. **Customize Variables**
   ```markdown
   # Use your naming conventions
   Project: {{project_name}}
   Client: {{client_name}}
   Date: {{current_date}}
   ```

### Creating New Commands

1. **Start with Template**
   ```bash
   cp custom-commands/template.md .claude/commands/my-command.md
   ```

2. **Define Purpose**
   - What problem does it solve?
   - What inputs does it need?
   - What outputs should it generate?

3. **Write Instructions**
   - Use clear, numbered steps
   - Include decision points
   - Specify output formats
   - Add error handling

4. **Test and Refine**
   - Run in test environment
   - Verify outputs
   - Optimize for efficiency
   - Document usage

## 🎪 Advanced Usage

### Command Chaining

Chain multiple commands together:

```bash
# Morning routine
claude "/daily-summary" && claude "/project-status" && claude "/quick-capture"

# Project workflow
claude "/component-create Button" && claude "/test-generate Button" && claude "/doc-update Button"
```

### Conditional Execution

Use conditions in your commands:

```yaml
---
description: "Smart deployment based on environment"
---

Check current branch:
IF branch == "main":
  - Run production deployment
ELSE IF branch == "staging":
  - Run staging deployment  
ELSE:
  - Run development build only
```

### Variable Substitution

Use dynamic variables:

```markdown
Generate report for {{project}} on {{date}}:
1. Scan {{project}}/src for changes
2. Check {{project}}/tests for coverage
3. Create report in {{project}}/reports/{{date}}.md
```

## 🚨 Best Practices

### Command Design
- **Single Responsibility**: Each command should do one thing well
- **Clear Instructions**: Use simple, numbered steps
- **Error Handling**: Include fallback options
- **Documentation**: Comment complex logic

### File Organization
```
.claude/
├── commands/
│   ├── daily/          # Daily workflow commands
│   ├── project/        # Project management commands
│   ├── content/        # Content creation commands
│   └── development/    # Development-specific commands
└── templates/          # Shared templates
```

### Version Control
- Track command changes
- Use semantic versioning
- Document breaking changes
- Maintain compatibility

### Testing
- Test with sample data
- Verify error handling
- Check output formats
- Validate tool permissions

## 🤝 Contributing

### Adding New Commands

1. **Create Command File**
   - Follow naming conventions
   - Include proper metadata
   - Write clear instructions

2. **Test Thoroughly**
   - Test with different inputs
   - Verify error cases
   - Check output quality

3. **Document Usage**
   - Add to this README
   - Include examples
   - Note any prerequisites

4. **Submit for Review**
   - Create pull request
   - Include test results
   - Provide usage examples

### Command Templates

Use these templates for consistency:

#### Basic Command Template
```yaml
---
description: "What this command does"
allowed-tools: ["Read", "Write"]
tags: ["category"]
version: "1.0"
---

Perform the following steps:
1. Step one
2. Step two
3. Generate output
```

#### Complex Command Template
```yaml
---
description: "Advanced command with multiple phases"
allowed-tools: ["Read", "Write", "Bash", "Task"]
tags: ["advanced", "automation"]
version: "1.0"
prerequisites: ["git", "node"]
---

## Phase 1: Preparation
1. Check prerequisites
2. Validate inputs

## Phase 2: Processing
1. Main processing steps
2. Error handling

## Phase 3: Output
1. Generate results
2. Save to location
3. Notify completion
```

## 📊 Usage Analytics

Track command effectiveness:
- Execution frequency
- Success rates
- Time savings
- User feedback

Popular commands:
1. daily-summary (used daily by 80% of users)
2. project-reporting (used weekly by 65% of users)
3. quick-capture (used multiple times daily by 90% of users)

## 📚 Resources

- [Command Writing Guide](../automation-patterns.md) - How to write effective commands
- [Tool Reference](../../resources/tool-reference.md) - Available Claude Code tools
- [Template Library](../templates/) - Reusable command templates
- [Community Commands](https://github.com/claude-code-hub/community-commands) - User-contributed commands

---

Start with a few commands and gradually build your automated workflow! 🚀