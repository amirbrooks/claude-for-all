# 🔧 WSL (Windows Subsystem for Linux) Installation Guide

This guide covers installing Claude Code on WSL2, providing a Linux development environment on Windows.

## 📋 Prerequisites

- Windows 10 version 2004+ (Build 19041+) or Windows 11
- Administrator access on Windows
- 4GB+ RAM recommended
- Virtualization enabled in BIOS

## 🚀 WSL Installation

### Quick Install (Windows 11 / Windows 10 21H2+)

```powershell
# PowerShell as Administrator
wsl --install

# This installs:
# - WSL2
# - Ubuntu (default distribution)
# - Windows Terminal
# - WSL kernel updates
```

### Manual Installation (Older Windows 10)

```powershell
# Step 1: Enable WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Step 2: Enable Virtual Machine Platform
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Step 3: Restart your computer

# Step 4: Set WSL2 as default
wsl --set-default-version 2

# Step 5: Install a Linux distribution
# Visit Microsoft Store and install Ubuntu, Debian, or other distros
```

## 🐧 Distribution Setup

### Ubuntu (Recommended)

```bash
# After first launch, create your Linux user account
# Then update the system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl git build-essential
```

### Other Distributions

Available options:
- Ubuntu 22.04 LTS
- Debian
- openSUSE Leap
- Kali Linux
- Alpine Linux

## 🔧 Claude Code Installation

### Inside WSL Terminal

```bash
# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install Claude Code
sudo npm install -g @anthropic/claude-cli

# Verify Claude installation
claude --version
```

### Alternative: Using NVM in WSL

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js
nvm install --lts
nvm use --lts

# Install Claude Code
npm install -g @anthropic/claude-cli
```

## 🔑 API Key Configuration

### WSL-Specific Setup

```bash
# Option 1: Add to ~/.bashrc
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"' >> ~/.bashrc
source ~/.bashrc

# Option 2: Share with Windows (using Windows environment variable)
echo 'export ANTHROPIC_API_KEY=$(cmd.exe /c "echo %ANTHROPIC_API_KEY%" 2>/dev/null | tr -d "\r")' >> ~/.bashrc
source ~/.bashrc
```

### Windows-WSL Integration

Set API key in Windows to share with WSL:

```powershell
# In Windows PowerShell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-api03-your-key-here", "User")
```

## 🛠️ WSL Configuration

### WSL Config File

Create/edit `%USERPROFILE%\.wslconfig`:

```ini
[wsl2]
memory=8GB
processors=4
localhostForwarding=true
kernelCommandLine=systemd.unified_cgroup_hierarchy=1

[experimental]
autoMemoryReclaim=gradual
sparseVhd=true
```

### WSL Distribution Config

Create/edit `/etc/wsl.conf` inside WSL:

```ini
[boot]
systemd=true

[network]
generateHosts=true
generateResolvConf=true

[interop]
appendWindowsPath=true

[user]
default=your-username
```

## 🎨 Terminal Setup

### Windows Terminal Integration

Windows Terminal automatically detects WSL distributions. Customize your profile:

```json
// Windows Terminal settings.json
{
  "profiles": {
    "list": [
      {
        "guid": "{your-wsl-guid}",
        "name": "Ubuntu (Claude)",
        "source": "Windows.Terminal.Wsl",
        "startingDirectory": "//wsl$/Ubuntu/home/username",
        "colorScheme": "One Half Dark",
        "fontFace": "Cascadia Code",
        "fontSize": 12,
        "icon": "🐧"
      }
    ]
  }
}
```

### Shell Configuration

Add to `~/.bashrc` in WSL:

```bash
# Claude Code aliases
alias cc='claude'
alias cchelp='claude --help'
alias ccresume='claude --resume'
alias ccusage='claude usage'

# Windows integration aliases
alias explorer='explorer.exe'
alias code='code.exe'
alias clip='clip.exe'

# WSL-specific functions
claude-init() {
    local project_name="$1"
    mkdir -p "$project_name"
    cd "$project_name"
    mkdir -p .claude
    echo "# $project_name" > CLAUDE.md
    claude "Starting new project: $project_name"
    
    # Open in VS Code if available
    if command -v code &> /dev/null; then
        code .
    fi
}

# Path conversion helpers
winpath() {
    wslpath -w "$1"
}

linuxpath() {
    wslpath -u "$1"
}

# Copy file to Windows clipboard
copy() {
    cat "$1" | clip.exe
}
```

## 🔗 File System Integration

### Accessing Files

```bash
# WSL files from Windows
# Explorer: \\wsl$\Ubuntu\home\username

# Windows files from WSL
cd /mnt/c/Users/YourWindowsUser/Documents

# Best practice: Keep projects in WSL filesystem
cd ~
mkdir projects
cd projects
```

### Performance Optimization

```bash
# For better performance, keep projects in Linux filesystem
# Bad (slow):
cd /mnt/c/projects/myapp

# Good (fast):
cd ~/projects/myapp

# Clone directly to WSL
git clone https://github.com/user/repo.git ~/projects/repo
```

## 🚦 Verification Steps

1. **Check WSL Version**
   ```powershell
   # In Windows PowerShell
   wsl --list --verbose
   # Should show VERSION 2
   ```

2. **Check Claude in WSL**
   ```bash
   # In WSL terminal
   claude --version
   node --version
   echo $ANTHROPIC_API_KEY
   ```

3. **Test Claude**
   ```bash
   claude "Hello! Confirm you're running in WSL on $(lsb_release -d | cut -f2)"
   ```

## 🐛 Common Issues

### Issue: WSL2 Not Installing

**Solution:**
```powershell
# Enable Virtualization in BIOS/UEFI
# Then run:
bcdedit /set hypervisorlaunchtype auto
# Restart computer
```

### Issue: Node Command Not Found

**Solution:**
```bash
# Reinstall Node.js
sudo apt remove nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

### Issue: Slow File Operations

**Solution:**
```bash
# Move project to WSL filesystem
mv /mnt/c/projects/myapp ~/projects/

# Exclude from Windows Defender
# In PowerShell (Admin):
Add-MpPreference -ExclusionPath "\\wsl$\"
```

### Issue: Clock Sync Problems

**Solution:**
```bash
# Sync WSL clock with Windows
sudo hwclock -s

# Or add to ~/.bashrc
if [ $(timedatectl show --property=NTPSynchronized --value) = "no" ]; then
    sudo hwclock -s
fi
```

## 🔐 Security Considerations

### 1. File Permissions

```bash
# WSL2 automatically handles permissions, but verify:
ls -la ~/.claude

# Fix if needed:
chmod 700 ~/.claude
chmod 600 ~/.claude/.env
```

### 2. Network Security

```bash
# Check WSL IP
ip addr show eth0

# Firewall rules are managed by Windows Defender
```

### 3. Credential Storage

```bash
# Use Windows Credential Manager from WSL
# Install wsl-credential-helper
wget https://github.com/GitCredentialManager/git-credential-manager/releases/latest/download/gcm-linux_amd64.deb
sudo dpkg -i gcm-linux_amd64.deb
git config --global credential.helper manager
```

## 🚀 Advanced Configuration

### GPU Support (for ML tasks)

```bash
# Check GPU availability
nvidia-smi  # If you have NVIDIA GPU

# Install CUDA toolkit
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-keyring_1.0-1_all.deb
sudo dpkg -i cuda-keyring_1.0-1_all.deb
sudo apt update
sudo apt install cuda
```

### Docker Integration

```bash
# Docker Desktop automatically integrates with WSL2
# Just enable WSL2 integration in Docker Desktop settings

# Verify
docker --version
docker run hello-world
```

### VS Code Integration

```bash
# Install Remote-WSL extension in VS Code
# Then from WSL:
code .

# This opens VS Code connected to WSL
```

## 📊 Performance Tips

1. **Use WSL2 (not WSL1)**
   ```powershell
   wsl --set-version Ubuntu 2
   ```

2. **Adjust Memory Allocation**
   ```ini
   # .wslconfig
   [wsl2]
   memory=8GB  # Adjust based on your system
   swap=2GB
   ```

3. **Enable systemd**
   ```bash
   # Better process management
   echo -e "[boot]\nsystemd=true" | sudo tee /etc/wsl.conf
   ```

## 🎯 WSL-Specific Workflows

### Development Flow

```bash
# 1. Start Windows Terminal
# 2. Open WSL tab
# 3. Navigate to project
cd ~/projects/myapp

# 4. Start Claude session
claude "Let's continue working on the React app"

# 5. Open VS Code
code .

# 6. Use Windows browser for testing
explorer.exe http://localhost:3000
```

### Backup Strategy

```powershell
# Export WSL distro
wsl --export Ubuntu ubuntu-backup.tar

# Import if needed
wsl --import Ubuntu-New C:\WSL\Ubuntu-New ubuntu-backup.tar
```

## 🚀 Next Steps

✅ WSL + Claude Code ready! Now explore:

- 📖 [First Project Guide](../first-project.md)
- ⌨️ [Basic Commands](../basic-commands.md)
- 🤖 [Setting up Subagents](/subagents/comprehensive-guide.md)
- 🐳 [Docker in WSL](/docker-vps/docker-setup/setup-guide.md)

## 💡 Pro Tips

1. **Aliases for Quick Access**
   ```bash
   # Add to Windows Terminal settings
   "commandline": "wsl.exe ~ -e bash -c 'claude'"
   ```

2. **Shared SSH Keys**
   ```bash
   # Share Windows SSH keys
   cp /mnt/c/Users/$USER/.ssh/* ~/.ssh/
   chmod 600 ~/.ssh/id_*
   ```

3. **GUI Apps (WSLg)**
   ```bash
   # Windows 11 supports GUI apps
   sudo apt install x11-apps
   xcalc  # Test GUI
   ```

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check [Troubleshooting](../troubleshooting.md)