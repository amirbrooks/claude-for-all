# ⌨️ Basic Commands & Shortcuts

Master the essential Claude Code commands and keyboard shortcuts for efficient development.

## 🎯 Essential Commands

### Starting Claude

```bash
# Basic start
claude

# With initial prompt
claude "Help me build a React app"

# With specific file
claude "Explain this code" --file app.js

# With settings
claude --settings .claude/settings.json
```

### Session Management

```bash
# Resume last session
claude --resume
# or shorthand
claude -r

# List recent sessions
claude history

# Resume specific session
claude --resume abc123

# Clear session history
claude clear
```

### Help & Information

```bash
# Show help
claude --help
claude -h

# Show version
claude --version
claude -V

# Check token usage
claude usage
ccusage  # if alias is set
```

## ⌨️ Keyboard Shortcuts

### During Claude Session

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+C` | Cancel | Stop current operation |
| `Ctrl+D` | Exit | End Claude session |
| `Ctrl+L` | Clear | Clear terminal screen |
| `Ctrl+R` | Verbose | Toggle verbose mode (see full context) |
| `Shift+Tab` | Plan Mode | Enter planning mode for complex tasks |
| `Tab` | Autocomplete | Complete file paths or commands |
| `↑/↓` | History | Navigate command history |
| `Ctrl+A` | Home | Move to beginning of line |
| `Ctrl+E` | End | Move to end of line |
| `Ctrl+K` | Clear After | Clear after cursor |
| `Ctrl+U` | Clear Before | Clear before cursor |

### Platform-Specific

**macOS:**
- `Cmd+K`: Clear terminal
- `Option+←/→`: Jump words

**Windows:**
- `Alt+F4`: Close terminal
- `Ctrl+←/→`: Jump words

**Linux:**
- `Ctrl+Shift+C/V`: Copy/Paste
- `Alt+←/→`: Jump words

## 🔧 Command Line Options

### Flags & Options

```bash
# Verbose mode - see full context
claude --verbose
claude -v

# Plan mode - thoughtful approach
claude --plan
claude -p

# No streaming - wait for complete response
claude --no-stream

# Custom timeout (milliseconds)
claude --timeout 120000

# Specify config file
claude --config ~/.claude/config.json

# Environment info
claude env
```

### Working with Files

```bash
# Read file into context
claude "Explain this code" --file src/app.js

# Multiple files
claude "Review these files" --file src/app.js --file src/utils.js

# Using glob patterns
claude "Analyze all test files" --file "**/*.test.js"
```

## 💬 Slash Commands

Use these commands within a Claude session:

### Project Management

```
/plan        # Enter planning mode
/resume      # Show session ID for resuming
/clear       # Clear conversation context
/reset       # Start fresh (keeps session)
/exit        # End session
```

### Subagent Commands

```
/agents      # List available subagents
/agent use <name>    # Use specific subagent
/agent create        # Create new subagent
/agent edit <name>   # Edit existing subagent
```

### Context Management

```
/context     # Show current context usage
/files       # List files in context
/forget <file>       # Remove file from context
/remember <file>     # Add file to context
```

### Utility Commands

```
/help        # Show available commands
/settings    # View current settings
/usage       # Check token usage
/export      # Export conversation
/feedback    # Submit feedback
```

## 📝 Prompting Patterns

### Basic Patterns

```bash
# Direct task
claude "Create a Python function to calculate fibonacci numbers"

# With context
claude "Using Flask, create a REST API for user management"

# Step-by-step
claude "Walk me through creating a Docker container for this Node.js app"
```

### Advanced Patterns

```bash
# Multi-line prompt
claude "Help me with the following:
1. Review my code for security issues
2. Suggest performance improvements
3. Add comprehensive error handling"

# With specific requirements
claude "Build a CLI tool that:
- Accepts multiple file inputs
- Validates JSON syntax
- Outputs formatted results
- Has proper error messages"
```

### Thinking Modes

```bash
# Standard thinking
claude "think: Design a scalable microservices architecture"

# Extended thinking
claude "think hard: Solve this complex algorithm problem"

# Deep thinking
claude "think harder: Analyze all possible edge cases"

# Maximum thinking
claude "ultrathink: Design a complete system architecture"
```

## 🔄 Workflow Commands

### Daily Workflow

```bash
# Morning setup
claude "/daily"              # Daily summary
claude "/quick-capture"      # Capture ideas
claude "/project-status"     # Check progress

# During work
claude "/todo add 'Review PR #123'"
claude "/context-switch project-b"
claude "/test-all"

# End of day
claude "/commit-all"
claude "/daily-summary"
claude "/backup"
```

### Git Integration

```bash
# Within Claude session
"Create a git commit with all changes"
"Show me git status and recent commits"
"Create a pull request for this feature"
"Review the diff before committing"
```

## 🎯 Context Management

### Adding Context

```bash
# Add files to context
claude "Review my code" --file "src/**/*.js"

# Add with description
claude "Here's my React component:" --file Component.jsx

# Add multiple contexts
claude --file README.md --file package.json "Set up the project"
```

### Managing Context Window

```bash
# Check context usage
/context

# Clear specific items
/forget src/old-code.js

# Preserve context with subagents
"Use the debugger subagent to investigate the error in utils.js"
```

## 🚀 Advanced Usage

### Piping & Redirection

```bash
# Pipe output to Claude
cat error.log | claude "Analyze these errors"

# Save Claude's response
claude "Generate a README" > README.md

# Chain commands
ls -la | claude "Explain this file structure"
```

### Environment Variables

```bash
# Set session-specific vars
CLAUDE_VERBOSE=true claude "Debug this issue"

# Custom timeout
CLAUDE_TIMEOUT=300000 claude "Complex analysis task"

# Disable colors
CLAUDE_COLOR=false claude "Simple output"
```

### Aliases & Functions

Add to your shell config:

```bash
# Quick aliases
alias cc='claude'
alias ccr='claude --resume'
alias ccp='claude --plan'
alias ccv='claude --verbose'

# Useful functions
claude-analyze() {
    find . -name "*.${1}" -type f | \
    xargs claude "Analyze these ${1} files for issues"
}

claude-commit() {
    git diff --staged | \
    claude "Write a commit message for these changes"
}

claude-review() {
    git diff ${1:-HEAD~1} | \
    claude "Review this code diff"
}
```

## 📊 Monitoring & Debugging

### Usage Tracking

```bash
# Check current session usage
claude usage

# Detailed token breakdown
claude usage --detailed

# Usage history
claude usage --history
```

### Debug Mode

```bash
# Enable debug logging
CLAUDE_DEBUG=true claude "Test command"

# Verbose output
claude --verbose "Show full context"

# Log to file
claude "Complex task" 2>&1 | tee claude.log
```

## 💡 Pro Tips

### 1. Efficient Context Usage

```bash
# Don't do this
claude "Read all files" --file "**/*"

# Do this instead
claude "Read relevant source files" --file "src/**/*.js"
```

### 2. Clear Instructions

```bash
# Vague
claude "Fix the bug"

# Clear
claude "Fix the TypeError in auth.js line 42 when user object is null"
```

### 3. Incremental Development

```bash
# Build step by step
claude "1. Create the basic Express server"
claude "2. Add user authentication"
claude "3. Implement rate limiting"
```

### 4. Session Management

```bash
# For long tasks
claude --no-stream "Generate comprehensive test suite"

# For exploration
claude --plan "Research the best approach for..."
```

## 🎮 Interactive Mode Tips

### Navigation

- Use `Tab` for file/directory completion
- `Ctrl+W` to delete last word
- `Ctrl+Y` to paste deleted text
- `Alt+B/F` to move by word

### Multi-line Input

```bash
# Use quotes for multi-line
claude "Line 1
Line 2
Line 3"

# Or use continuation
claude "This is a very long prompt that \
continues on the next line"
```

## 🔗 Integration Commands

### VS Code

```bash
# Open in VS Code from Claude
"Open this project in VS Code"
"Create a VS Code task for running tests"
```

### Docker

```bash
# Docker commands
"Create a Dockerfile for this application"
"Show me how to run this in a container"
"Generate docker-compose.yml"
```

### CI/CD

```bash
# Pipeline setup
"Create a GitHub Actions workflow"
"Set up GitLab CI pipeline"
"Add pre-commit hooks"
```

## 🚨 Common Command Patterns

### Error Handling

```bash
# When you get an error
claude "I got this error: [paste error]. How do I fix it?"

# Debugging
claude "Help me debug why this function returns undefined"

# Stack traces
claude "Analyze this stack trace and identify the issue"
```

### Code Review

```bash
# Security review
claude "Review this code for security vulnerabilities"

# Performance
claude "Analyze this code for performance bottlenecks"

# Best practices
claude "Suggest improvements following React best practices"
```

### Documentation

```bash
# Generate docs
claude "Create JSDoc comments for all functions"

# API documentation
claude "Generate OpenAPI spec for these endpoints"

# README
claude "Write a comprehensive README with examples"
```

## 📚 Next Steps

Now that you know the basic commands:

- 🤖 Learn about [Subagents](/subagents/comprehensive-guide.md)
- 🔧 Explore [Custom Workflows](/workflows/custom-commands/)
- 🚀 Try [Advanced Techniques](/prompting/thinking-modes.md)
- 📊 Master [Performance Optimization](/performance/token-optimization.md)

---

Remember: The best way to learn is by doing. Start with simple commands and gradually explore more advanced features!