# 🐧 Linux Installation Guide

This guide covers installing Claude Code on various Linux distributions including Ubuntu, Debian, Fedora, Arch, and others.

## 📋 Prerequisites

- Linux distribution with package manager
- sudo/root access for global installation
- Terminal emulator
- curl or wget installed

## 🚀 Installation by Distribution

### Ubuntu/Debian/Mint

```bash
# Update package list
sudo apt update

# Install Node.js via NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install Claude Code
sudo npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

### Fedora/RHEL/CentOS

```bash
# Install Node.js
sudo dnf install nodejs npm

# Or via NodeSource
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install nodejs

# Install Claude Code
sudo npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

### Arch Linux/Manjaro

```bash
# Install Node.js
sudo pacman -S nodejs npm

# Install Claude Code
sudo npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

### openSUSE

```bash
# Install Node.js
sudo zypper install nodejs npm

# Install Claude Code
sudo npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

### Universal Method (Using NVM)

```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Load NVM
source ~/.bashrc

# Install latest Node.js
nvm install node
nvm use node

# Install Claude Code
npm install -g @anthropic/claude-cli

# Verify installation
claude --version
```

## 🔑 API Key Configuration

### Option 1: Shell Configuration (Permanent)

```bash
# For Bash
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' >> ~/.bashrc
source ~/.bashrc

# For Zsh
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' >> ~/.zshrc
source ~/.zshrc

# For Fish
echo 'set -x ANTHROPIC_API_KEY "sk-ant-api03-your-key-here"' >> ~/.config/fish/config.fish
source ~/.config/fish/config.fish
```

### Option 2: System-wide (All Users)

```bash
# Create system environment file
sudo tee /etc/environment.d/claude.conf << EOF
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
EOF

# Or add to /etc/environment
echo 'ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' | sudo tee -a /etc/environment
```

### Option 3: Project-Specific

```bash
# Create project .env
mkdir -p .claude
echo 'ANTHROPIC_API_KEY=sk-ant-api03-your-key-here' > .claude/.env

# Set permissions
chmod 600 .claude/.env
```

### Option 4: Secure Keyring Storage

```bash
# Using secret-tool (GNOME)
echo -n "your-key-here" | secret-tool store --label="Anthropic API Key" api anthropic

# Retrieve in shell
export ANTHROPIC_API_KEY=$(secret-tool lookup api anthropic)

# Using pass (password-store)
pass insert anthropic/api-key
export ANTHROPIC_API_KEY=$(pass anthropic/api-key)
```

## 🛠️ Shell Configuration

### Bash Configuration

Add to `~/.bashrc`:

```bash
# Claude Code aliases
alias cc='claude'
alias cchelp='claude --help'
alias ccresume='claude --resume'
alias ccusage='claude usage'
alias ccplan='claude --plan'

# Functions
claude-init() {
    local project_name="$1"
    mkdir -p "$project_name"
    cd "$project_name"
    mkdir -p .claude
    cat > CLAUDE.md << EOF
# $project_name

Project instructions for Claude Code
EOF
    claude "I'm starting a new project called $project_name. Help me set it up."
}

# Quick capture
claude-capture() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "$timestamp - $*" >> ~/claude-notes.txt
    echo "Note captured!"
}

# Environment check
claude-check() {
    echo "Claude Code: $(command -v claude && claude --version || echo 'Not installed')"
    echo "Node.js: $(node --version)"
    echo "npm: $(npm --version)"
    echo "API Key: ${ANTHROPIC_API_KEY:0:20}..."
}
```

### Zsh Configuration

Add to `~/.zshrc`:

```zsh
# Claude Code aliases
alias cc='claude'
alias cchelp='claude --help'
alias ccresume='claude --resume'
alias ccusage='claude usage'

# Zsh-specific completions
if command -v claude &> /dev/null; then
    eval "$(claude completion zsh)"
fi

# Functions with better Zsh integration
claude-init() {
    local project_name=${1:?"Project name required"}
    mkdir -p "$project_name" && cd "$project_name"
    mkdir -p .claude
    cat > CLAUDE.md << EOF
# $project_name

Project instructions for Claude Code
EOF
    claude "I'm starting a new project called $project_name. Help me set it up."
}
```

### Fish Configuration

Add to `~/.config/fish/config.fish`:

```fish
# Claude Code aliases
alias cc 'claude'
alias cchelp 'claude --help'
alias ccresume 'claude --resume'
alias ccusage 'claude usage'

# Functions
function claude-init
    set project_name $argv[1]
    mkdir -p $project_name
    cd $project_name
    mkdir -p .claude
    echo "# $project_name\n\nProject instructions for Claude Code" > CLAUDE.md
    claude "I'm starting a new project called $project_name. Help me set it up."
end

# Completions
claude completion fish | source
```

## 🎨 Terminal Configuration

### Terminal Emulator Recommendations

1. **Alacritty** - Fast, GPU-accelerated
   ```bash
   # Ubuntu/Debian
   sudo apt install alacritty
   
   # Arch
   sudo pacman -S alacritty
   ```

2. **Kitty** - Feature-rich, GPU-accelerated
   ```bash
   # Ubuntu/Debian
   sudo apt install kitty
   
   # Or via installer
   curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin
   ```

3. **Terminator** - Multiple terminals in one window
   ```bash
   sudo apt install terminator
   ```

### Color Scheme Setup

```bash
# Check color support
echo $TERM
tput colors

# Enable 256 colors
export TERM=xterm-256color

# For tmux users
echo "set -g default-terminal 'screen-256color'" >> ~/.tmux.conf
```

## 🚦 Verification Steps

1. **System Check Script**
   ```bash
   #!/bin/bash
   echo "=== Claude Code System Check ==="
   echo "Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
   echo "npm: $(npm --version 2>/dev/null || echo 'Not installed')"
   echo "Claude: $(claude --version 2>/dev/null || echo 'Not installed')"
   echo "API Key: ${ANTHROPIC_API_KEY:+Set (${ANTHROPIC_API_KEY:0:10}...)}"
   echo "Terminal: $TERM"
   echo "Shell: $SHELL"
   echo "================================"
   ```

2. **Test Claude Connection**
   ```bash
   claude "Hello! Please confirm you're working properly on $(lsb_release -d | cut -f2)"
   ```

## 🐛 Common Issues

### Issue: Permission Denied

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Reinstall Claude Code
npm install -g @anthropic/claude-cli
```

### Issue: Node.js Version Too Old

```bash
# Remove old version
sudo apt remove nodejs

# Install Node.js 18+ via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
```

### Issue: SSL Certificate Errors

```bash
# Update certificates
sudo apt update && sudo apt install ca-certificates

# For corporate proxies
export NODE_TLS_REJECT_UNAUTHORIZED=0  # Temporary, not recommended
```

### Issue: Command Not Found After Installation

```bash
# Check npm bin location
npm bin -g

# Add to PATH
export PATH="$(npm bin -g):$PATH"

# Make permanent
echo 'export PATH="$(npm bin -g):$PATH"' >> ~/.bashrc
```

## 🔐 Security Best Practices

### 1. Secure API Key Storage

```bash
# Using GPG encryption
echo "sk-ant-api03-your-key" | gpg --encrypt -r your@email.com > ~/.anthropic-key.gpg

# Load in shell
export ANTHROPIC_API_KEY=$(gpg --decrypt ~/.anthropic-key.gpg 2>/dev/null)
```

### 2. File Permissions

```bash
# Secure your Claude config
chmod 700 ~/.claude
chmod 600 ~/.claude/.env

# Project-specific
find . -name ".env" -exec chmod 600 {} \;
```

### 3. Audit Trail

```bash
# Log Claude commands
export CLAUDE_LOG_FILE="$HOME/.claude/commands.log"

claude() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$CLAUDE_LOG_FILE"
    command claude "$@"
}
```

## 🚀 Performance Optimization

### 1. Faster npm installs

```bash
# Use pnpm for faster installs
npm install -g pnpm
pnpm add -g @anthropic/claude-cli
```

### 2. Cache Configuration

```bash
# Set cache directory
export CLAUDE_CACHE_DIR="$HOME/.cache/claude"
mkdir -p "$CLAUDE_CACHE_DIR"
```

### 3. CPU Governor (Laptops)

```bash
# Set to performance mode during Claude sessions
sudo cpupower frequency-set -g performance
```

## 🖥️ Desktop Integration

### 1. Desktop Entry

Create `~/.local/share/applications/claude-code.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=Claude Code
Comment=AI Coding Assistant
Exec=gnome-terminal -- claude
Icon=terminal
Categories=Development;
Terminal=false
```

### 2. Keyboard Shortcuts

```bash
# GNOME
gsettings set org.gnome.settings-daemon.plugins.media-keys custom-keybindings "['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/']"
gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/ name 'Claude Code'
gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/ command 'gnome-terminal -- claude'
gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/ binding '<Super>c'
```

## 🔧 Distribution-Specific Tips

### Ubuntu/Debian
- Use `apt` for system packages
- Enable Ubuntu Pro for security updates
- Consider Snap package when available

### Arch Linux
- Check AUR for claude-code package
- Use yay or paru for AUR helper
- Enable multilib for 32-bit support

### Fedora
- Use DNF modules for Node.js versions
- Enable RPM Fusion for additional packages
- SELinux may require adjustments

## 🚀 Next Steps

✅ Installation complete! Now explore:

- 📖 [First Project Guide](../first-project.md)
- ⌨️ [Basic Commands](../basic-commands.md)
- 🤖 [Setting up Subagents](/subagents/comprehensive-guide.md)
- 🐳 [Docker Setup](/docker-vps/docker-setup/setup-guide.md)

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check [Troubleshooting](../troubleshooting.md)