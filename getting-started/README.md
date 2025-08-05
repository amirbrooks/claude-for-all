# 🚀 Getting Started with Claude Code

Welcome to Claude Code! This guide will help you get up and running quickly on your platform.

## 📋 Prerequisites

Before installing Claude Code, ensure you have:

- **Node.js** v18.0 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Anthropic API Key** ([Get one here](https://console.anthropic.com/))
- **Terminal/Command Line** access

## 🖥️ Choose Your Platform

### Installation Guides

- 🍎 **[macOS Setup](installation/mac-setup.md)** - Homebrew and manual installation
- 🪟 **[Windows Setup](installation/windows-setup.md)** - PowerShell and WSL options
- 🐧 **[Linux Setup](installation/linux-setup.md)** - Ubuntu, Debian, Fedora, Arch
- 🔧 **[WSL Setup](installation/wsl-setup.md)** - Windows Subsystem for Linux

## ⚡ Quick Install (All Platforms)

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Set your API key
export ANTHROPIC_API_KEY="sk-ant-api03-..."  # Linux/macOS
# or
set ANTHROPIC_API_KEY="sk-ant-api03-..."     # Windows CMD
# or
$env:ANTHROPIC_API_KEY="sk-ant-api03-..."    # Windows PowerShell

# Verify installation
claude --version

# Start your first session
claude "Hello! Help me understand how to use Claude Code"
```

## 🎯 Next Steps

Once installed, explore these guides:

1. **[First Project Guide](first-project.md)** - Build your first app with Claude
2. **[Basic Commands](basic-commands.md)** - Essential commands and shortcuts
3. **[Troubleshooting](troubleshooting.md)** - Common issues and solutions

## 🔑 API Key Management

### Permanent Setup

**macOS/Linux:**
```bash
echo 'export ANTHROPIC_API_KEY="your-key-here"' >> ~/.bashrc
# or for zsh
echo 'export ANTHROPIC_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.bashrc  # or source ~/.zshrc
```

**Windows:**
```powershell
# PowerShell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "your-key-here", "User")
```

### Project-Specific Setup

Create a `.env` file in your project:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
```

## 🏃‍♂️ Quick Start Examples

### Web Development
```bash
claude "Create a React app with TypeScript and Tailwind CSS"
```

### Data Science
```bash
claude "Help me analyze this CSV file and create visualizations"
```

### DevOps
```bash
claude "Write a Docker Compose file for a Node.js and PostgreSQL app"
```

## 💡 Pro Tips

1. **Use Descriptive Prompts**: Be specific about what you want
2. **Plan Mode**: Press `Shift+Tab` for complex tasks
3. **Resume Sessions**: Use `claude --resume` to continue where you left off
4. **Check Usage**: Run `ccusage` to monitor token consumption
5. **Verbose Mode**: Use `Ctrl+R` to see full context

## 🆘 Getting Help

- 📖 [Official Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- 💬 [Community Discord](https://discord.gg/claude-code)
- 🐛 [Report Issues](https://github.com/anthropics/claude-code/issues)
- 🗣️ [Telegram Group](https://t.me/claudecodeusers)

---

Ready to dive deeper? Check out our [First Project Guide](first-project.md) →