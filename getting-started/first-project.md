# 🎯 Your First Project with Claude Code

Let's build something real! This guide walks you through creating your first project with Claude Code, demonstrating key concepts and best practices.

## 🚀 What We'll Build

We'll create a **Task Tracker CLI** application that demonstrates:
- Project setup and organization
- Using Claude for development
- Writing and testing code
- Setting up subagents
- Best practices

## 📁 Project Setup

### Step 1: Create Project Structure

```bash
# Create project directory
mkdir task-tracker-cli
cd task-tracker-cli

# Initialize project
npm init -y

# Create Claude configuration
mkdir .claude
```

### Step 2: Create CLAUDE.md

This file tells Claude about your project:

```bash
claude "Create a CLAUDE.md file for a Node.js CLI task tracker application"
```

Claude will create something like:

```markdown
# Task Tracker CLI

A command-line task management application built with Node.js.

## Project Overview
- Language: Node.js/JavaScript
- Type: CLI Application
- Purpose: Manage tasks with add, list, complete, and delete operations

## Technical Requirements
- Use Commander.js for CLI parsing
- Store tasks in JSON file
- Implement CRUD operations
- Add color output with chalk
- Include proper error handling

## Code Style
- Use ES6+ features
- Follow Standard JS style
- Add JSDoc comments
- Keep functions small and focused

## File Structure
```
task-tracker-cli/
├── index.js          # Main CLI entry point
├── lib/
│   ├── tasks.js      # Task management logic
│   └── storage.js    # File storage operations
├── data/
│   └── tasks.json    # Task storage
└── package.json
```
```

### Step 3: Start Development

```bash
claude "I want to build a CLI task tracker. Read the CLAUDE.md and help me implement it step by step"
```

## 💻 Building with Claude

### Interactive Development

Claude will guide you through implementation:

```javascript
// Example interaction
User: "Let's start by creating the main CLI structure"

Claude: "I'll help you create the CLI structure using Commander.js. First, let's install the dependencies:

npm install commander chalk

Now, let's create the main index.js file:"

// Claude creates index.js with CLI setup
```

### Key Features to Implement

1. **Add Tasks**
   ```bash
   node index.js add "Complete Claude Code tutorial"
   ```

2. **List Tasks**
   ```bash
   node index.js list
   # ┌────┬─────────────────────────────┬───────────┬────────┐
   # │ ID │ Task                        │ Status    │ Created│
   # ├────┼─────────────────────────────┼───────────┼────────┤
   # │ 1  │ Complete Claude Code tutorial│ pending   │ 2:30pm │
   # └────┴─────────────────────────────┴───────────┴────────┘
   ```

3. **Complete Tasks**
   ```bash
   node index.js complete 1
   ```

4. **Delete Tasks**
   ```bash
   node index.js delete 1
   ```

## 🤖 Adding a Subagent

Let's create a specialized subagent for this project:

```bash
claude "Create a CLI development subagent that helps with command-line tool development"
```

Save as `.claude/agents/cli-developer.md`:

```yaml
---
name: cli-developer
description: Expert in Node.js CLI development. PROACTIVELY helps with Commander.js, user input, and terminal formatting.
tools: Read, Write, Bash, Grep
---

You are a CLI development specialist with expertise in:
- Commander.js for command parsing
- Inquirer.js for interactive prompts
- Chalk for colored output
- Terminal table formatting
- Cross-platform compatibility

When developing CLIs:
1. Prioritize user experience with clear help text
2. Implement proper error messages
3. Add input validation
4. Support both flags and interactive mode
5. Include shell completion scripts

Always test commands before suggesting them.
```

## 🧪 Testing Your Application

### Manual Testing

```bash
# Test all commands
claude "Help me create a test script that verifies all CLI commands work correctly"
```

### Automated Tests

```bash
claude "Add Jest tests for the task tracker. Test all CRUD operations"
```

Example test structure:
```javascript
// __tests__/tasks.test.js
describe('Task Manager', () => {
  test('should add a new task', () => {
    // Test implementation
  });
  
  test('should list all tasks', () => {
    // Test implementation
  });
});
```

## 📝 Best Practices Demonstrated

### 1. Clear Communication

```bash
# Be specific about what you want
claude "Add input validation to ensure task descriptions are not empty and are less than 200 characters"

# Rather than
claude "Add validation"
```

### 2. Incremental Development

Build features one at a time:
1. Basic add/list functionality
2. Complete/delete operations
3. Filtering and search
4. Color and formatting
5. Configuration options

### 3. Using Plan Mode

For complex features, use plan mode (Shift+Tab):

```bash
claude --plan "I want to add a feature to export tasks to different formats (JSON, CSV, Markdown)"
```

### 4. Context Preservation

Use subagents for specific tasks:

```bash
claude "Use the cli-developer subagent to implement shell completion scripts"
```

## 🎨 Enhancing the Project

### Add More Features

```bash
claude "Let's add these features:
1. Task priorities (high, medium, low)
2. Due dates with reminders
3. Categories/tags
4. Search functionality
5. Export to different formats"
```

### Improve User Experience

```bash
claude "Make the CLI more user-friendly with:
1. Interactive mode using inquirer
2. Configuration file support
3. Better error messages
4. Progress indicators
5. Emoji support"
```

### Add Persistence Options

```bash
claude "Add support for different storage backends:
1. JSON file (current)
2. SQLite database
3. PostgreSQL
4. Cloud sync (optional)"
```

## 🚀 Final Project Structure

```
task-tracker-cli/
├── index.js              # CLI entry point
├── lib/
│   ├── tasks.js          # Task management
│   ├── storage.js        # Storage abstraction
│   ├── formatters.js     # Output formatting
│   └── validators.js     # Input validation
├── storage/
│   ├── json.js           # JSON file storage
│   ├── sqlite.js         # SQLite storage
│   └── postgres.js       # PostgreSQL storage
├── __tests__/
│   ├── tasks.test.js     # Task tests
│   └── cli.test.js       # CLI tests
├── .claude/
│   ├── agents/
│   │   └── cli-developer.md
│   └── commands/
│       └── test-all.md   # Custom test command
├── data/
│   └── tasks.json        # Task storage
├── CLAUDE.md             # Project instructions
├── README.md             # User documentation
└── package.json          # Dependencies
```

## 📚 Learning Outcomes

After completing this project, you'll understand:

1. **Project Organization**: How to structure files for Claude
2. **CLAUDE.md**: Writing effective project instructions
3. **Interactive Development**: Working with Claude iteratively
4. **Subagents**: Creating specialized helpers
5. **Testing**: Ensuring code quality
6. **Best Practices**: Clear communication and incremental development

## 🎯 Next Steps

### 1. Publish Your CLI

```bash
claude "Help me prepare this CLI for publishing to npm, including:
1. Package.json configuration
2. README with examples
3. Executable setup
4. npm publish process"
```

### 2. Create a Web Interface

```bash
claude "Let's create a web interface for the task tracker using Express and React"
```

### 3. Add AI Features

```bash
claude "Add AI features like:
1. Smart task categorization
2. Natural language input parsing
3. Task priority suggestions
4. Productivity insights"
```

## 💡 Pro Tips

1. **Save Sessions**: Use `claude --resume` to continue where you left off
2. **Export Code**: Ask Claude to create complete file exports
3. **Version Control**: Commit after each working feature
4. **Documentation**: Ask Claude to update docs as you go
5. **Learn from Claude**: Study the code patterns Claude uses

## 🎉 Congratulations!

You've built your first project with Claude Code! You now know how to:
- Set up a project for Claude
- Communicate effectively with AI
- Build features incrementally
- Create and use subagents
- Test and document your code

### Share Your Success

- 🌟 Star our [GitHub repo](https://github.com/claude-code-hub)
- 📝 Share your project in [Discussions](https://github.com/claude-code-hub/discussions)
- 🐦 Tweet about your experience with #ClaudeCode

## 📖 Continue Learning

- [Basic Commands](basic-commands.md) - Master Claude Code commands
- [Subagents Guide](/subagents/comprehensive-guide.md) - Deep dive into subagents
- [Advanced Workflows](/workflows/automation-patterns.md) - Complex automation
- [Team Collaboration](/workflows/team-collaboration.md) - Working with others

---

Ready for more? Check out our [Use Cases](/use-cases/) for industry-specific examples!