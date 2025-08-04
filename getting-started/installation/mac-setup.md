# 🍎 macOS Installation Guide

This guide covers installing Claude Code on macOS, including Apple Silicon (M1/M2/M3) and Intel Macs.

## 📋 Prerequisites

- macOS 10.15 (Catalina) or later
- Admin access to install global packages
- Terminal app (built-in)

## 🚀 Installation Methods

### Method 1: Homebrew (Recommended)

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Claude Code
npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

### Method 2: Direct NPM Install

```bash
# Check if Node.js is installed
node --version

# If not installed, download from https://nodejs.org/

# Install Claude Code
npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

### Method 3: Using NVM (Node Version Manager)

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload terminal
source ~/.zshrc  # or ~/.bashrc

# Install latest Node.js
nvm install node
nvm use node

# Install Claude Code
npm install -g @anthropic/claude-cli
```

## 🔑 API Key Configuration

### Option 1: Environment Variable (Recommended)

```bash
# For zsh (default on macOS Catalina+)
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' >> ~/.zshrc
source ~/.zshrc

# For bash
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' >> ~/.bash_profile
source ~/.bash_profile
```

### Option 2: Project-Specific

Create `.claude/.env` in your project:
```bash
mkdir -p .claude
echo 'ANTHROPIC_API_KEY=sk-ant-api03-your-key-here' > .claude/.env
```

### Option 3: Session-Only

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"
```

## 🛠️ Shell Configuration

### Zsh (Default on macOS)

Add to `~/.zshrc`:
```bash
# Claude Code aliases
alias cc="claude"
alias cchelp="claude --help"
alias ccresume="claude --resume"
alias ccusage="claude usage"

# Function for quick project starts
claude-init() {
  mkdir -p "$1" && cd "$1"
  mkdir -p .claude
  echo "# $1\n\nProject instructions for Claude Code" > CLAUDE.md
  claude "I'm starting a new project called $1. Help me set it up."
}
```

### Bash

Add to `~/.bash_profile`:
```bash
# Claude Code aliases
alias cc="claude"
alias cchelp="claude --help"
alias ccresume="claude --resume"
alias ccusage="claude usage"

# Function for quick project starts
claude-init() {
  mkdir -p "$1" && cd "$1"
  mkdir -p .claude
  echo "# $1\n\nProject instructions for Claude Code" > CLAUDE.md
  claude "I'm starting a new project called $1. Help me set it up."
}
```

## 🔧 Terminal App Recommendations

### iTerm2 (Recommended)
- Better color support
- Split panes for multiple Claude sessions
- Download: [iterm2.com](https://iterm2.com/)

### Warp
- AI-powered terminal with Claude integration
- Built-in command suggestions
- Download: [warp.dev](https://www.warp.dev/)

### Native Terminal.app
- Works perfectly with Claude Code
- Enable "Use Option as Meta key" for better shortcuts

## 🎨 Color & Display Settings

For best experience:

```bash
# Check color support
echo $TERM

# If not showing 256 colors, add to ~/.zshrc:
export TERM="xterm-256color"

# Enable Claude Code colors
export CLAUDE_COLOR="true"
```

## 🚦 Verification Steps

1. **Check Installation**
   ```bash
   claude --version
   # Should show: claude-code@2.x.x
   ```

2. **Check API Key**
   ```bash
   echo $ANTHROPIC_API_KEY
   # Should show your key (first few characters)
   ```

3. **Test Connection**
   ```bash
   claude "Say hello and tell me about yourself"
   ```

## 🐛 Common Issues

### Issue: "command not found: claude"

**Solution:**
```bash
# Check npm global path
npm config get prefix

# Add to PATH in ~/.zshrc
export PATH="$(npm config get prefix)/bin:$PATH"
source ~/.zshrc
```

### Issue: Permission Denied

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# Reinstall
npm install -g @anthropic/claude-cli
```

### Issue: Apple Silicon Compatibility

**Solution:**
```bash
# Install Rosetta 2 if needed
softwareupdate --install-rosetta

# Use native Node.js build
arch -arm64 npm install -g @anthropic/claude-cli
```

## 🔐 Security Best Practices

1. **Never commit API keys**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   echo ".claude/.env" >> .gitignore
   ```

2. **Use macOS Keychain**
   ```bash
   # Store API key securely
   security add-generic-password -a "$USER" -s "ANTHROPIC_API_KEY" -w "your-key-here"
   
   # Retrieve in shell
   export ANTHROPIC_API_KEY=$(security find-generic-password -a "$USER" -s "ANTHROPIC_API_KEY" -w)
   ```

3. **Rotate keys regularly**
   - Generate new keys monthly
   - Delete old keys from Anthropic console

## 🚀 Next Steps

✅ Installation complete! Now explore:

- 📖 [First Project Guide](../first-project.md)
- ⌨️ [Basic Commands](../basic-commands.md)
- 🤖 [Setting up Subagents](/subagents/comprehensive-guide.md)
- 🔌 [MCP Servers](/mcp-servers/setup-guide.md)

## 💡 macOS-Specific Tips

1. **Spotlight Integration**: Create Alfred/Raycast workflows for Claude
2. **Touch Bar**: Add Claude shortcuts if using MacBook Pro
3. **Shortcuts App**: Create iOS shortcuts to trigger Claude commands
4. **Time Machine**: Exclude `.claude/cache` from backups

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check [Troubleshooting](../troubleshooting.md)