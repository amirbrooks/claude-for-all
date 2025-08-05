# 🪟 Windows Installation Guide

This guide covers installing Claude Code on Windows using PowerShell, Command Prompt, or WSL.

## 📋 Prerequisites

- Windows 10 version 1903+ or Windows 11
- Administrator access
- PowerShell 5.1+ or Windows Terminal (recommended)

## 🚀 Installation Methods

### Method 1: Windows PowerShell (Recommended)

```powershell
# Run PowerShell as Administrator

# Install Node.js via Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
# Enable TLS 1.2 and 1.3 for secure downloads (2025 security standard)
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js
choco install nodejs -y

# Restart PowerShell, then install Claude Code
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Method 2: Direct Node.js Installer

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer (choose LTS version)
3. Open new PowerShell/Terminal window

```powershell
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Method 3: Using Scoop Package Manager

```powershell
# Install Scoop
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

# Install Node.js
scoop install nodejs

# Install Claude Code
npm install -g @anthropic-ai/claude-code
```

## 🔑 API Key Configuration

### Option 1: System Environment Variable (Permanent)

```powershell
# PowerShell (Run as Administrator)
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-api03-your-key-here", "User")

# Restart PowerShell to load the variable
```

### Option 2: User Profile (PowerShell)

```powershell
# Add to PowerShell profile
notepad $PROFILE

# Add this line to the file:
$env:ANTHROPIC_API_KEY = "sk-ant-api03-your-key-here"

# Save and reload profile
. $PROFILE
```

### Option 3: Project-Specific

Create `.claude\.env` in your project:
```powershell
# Create directory and file
New-Item -ItemType Directory -Force -Path .claude
"ANTHROPIC_API_KEY=sk-ant-api03-your-key-here" | Out-File -FilePath .claude\.env -Encoding utf8
```

### Option 4: Session-Only

```powershell
# PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-api03-your-key-here"

# Command Prompt
set ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

## 🛠️ Terminal Setup

### Windows Terminal (Recommended)

1. Install from [Microsoft Store](https://aka.ms/terminal)
2. Configure for Claude Code:

```json
// Settings.json (Ctrl+,)
{
  "profiles": {
    "defaults": {
      "colorScheme": "One Half Dark",
      "fontSize": 12,
      "fontFace": "Cascadia Code"
    }
  }
}
```

### PowerShell Profile Configuration

Create/edit your PowerShell profile:

```powershell
# Create profile if it doesn't exist
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}

# Edit profile
notepad $PROFILE
```

Add these helpful aliases and functions:

```powershell
# Claude Code aliases
Set-Alias cc claude
function cchelp { claude --help }
function ccresume { claude --resume }
function ccusage { claude usage }

# Quick project initialization
function claude-init {
    param([string]$ProjectName)
    
    New-Item -ItemType Directory -Force -Path $ProjectName
    Set-Location $ProjectName
    New-Item -ItemType Directory -Force -Path .claude
    
    @"
# $ProjectName

Project instructions for Claude Code
"@ | Out-File -FilePath CLAUDE.md -Encoding utf8
    
    claude "I'm starting a new project called $ProjectName. Help me set it up."
}

# Quick capture function
function claude-capture {
    param([string]$Note)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $Note" | Add-Content -Path "$HOME\claude-notes.txt"
    Write-Host "Note captured!" -ForegroundColor Green
}
```

## 🎨 Windows-Specific Configuration

### Enable Colors in Terminal

```powershell
# Check if colors are enabled
[Console]::OutputEncoding

# Enable UTF-8 and colors
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$env:CLAUDE_COLOR = "true"
```

### Configure Git Bash (Alternative Terminal)

If using Git Bash:

```bash
# Add to ~/.bashrc
export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"
alias cc="claude"
alias cchelp="claude --help"
alias ccresume="claude --resume"
```

## 🚦 Verification Steps

1. **Check Installation**
   ```powershell
   claude --version
   # Should show: claude-code@2.x.x
   ```

2. **Check Node.js**
   ```powershell
   node --version
   # Should show: v18.x.x or higher
   ```

3. **Check API Key**
   ```powershell
   echo $env:ANTHROPIC_API_KEY
   # Should show your key
   ```

4. **Test Claude**
   ```powershell
   claude "Hello! Confirm you're working on Windows"
   ```

## 🐛 Common Issues

### Issue: "claude is not recognized"

**Solution:**
```powershell
# Check npm global path
npm config get prefix

# Add to PATH
$env:Path += ";$(npm config get prefix)"

# For permanent fix, add to System PATH via:
# System Properties → Environment Variables → Path → Add npm prefix
```

### Issue: Execution Policy Error

**Solution:**
```powershell
# Check current policy
Get-ExecutionPolicy

# Set to RemoteSigned (safe for scripts)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Permission Denied During Install

**Solution:**
```powershell
# Run as Administrator or use --force
npm install -g @anthropic-ai/claude-code --force

# Alternative: Install to user directory
npm config set prefix "$env:USERPROFILE\.npm"
npm install -g @anthropic-ai/claude-code
# Add $env:USERPROFILE\.npm to PATH
```

### Issue: SSL/Certificate Errors

**Solution:**
```powershell
# Temporary fix (not recommended for production)
npm config set strict-ssl false

# Better solution: Update certificates
npm config set cafile "path\to\certificate.pem"
```

## 🔐 Security Best Practices

1. **Windows Credential Manager**
   ```powershell
   # Store API key securely
   cmdkey /generic:ANTHROPIC_API_KEY /user:$env:USERNAME /pass:your-key-here
   
   # Retrieve in PowerShell
   $cred = Get-StoredCredential -Target "ANTHROPIC_API_KEY"
   $env:ANTHROPIC_API_KEY = $cred.GetNetworkCredential().Password
   ```

2. **Exclude from Windows Defender**
   ```powershell
   # Add Claude cache to exclusions (speeds up operations)
   Add-MpPreference -ExclusionPath "$env:USERPROFILE\.claude\cache"
   ```

3. **Git Configuration**
   ```powershell
   # Global gitignore
   "`.env`n.claude/.env`n*.key" | Out-File -Append $env:USERPROFILE\.gitignore
   git config --global core.excludesfile $env:USERPROFILE\.gitignore
   ```

## 🚀 Performance Optimization

### Windows-Specific Tips

1. **Disable Real-time Scanning for Dev Folders**
   ```powershell
   Add-MpPreference -ExclusionPath "C:\dev"
   ```

2. **Use Windows Terminal GPU Acceleration**
   - Settings → Rendering → Use hardware acceleration

3. **Configure npm for Windows**
   ```powershell
   npm config set msvs_version 2022
   npm config set python python3
   ```

## 🖥️ WSL Alternative

For Unix-like experience, consider [WSL Setup](wsl-setup.md):

```powershell
# Quick WSL install
wsl --install

# Then follow Linux setup guide
```

## 📱 Windows 11 Integration

### PowerToys Run Integration

1. Install [PowerToys](https://github.com/microsoft/PowerToys)
2. Create custom command:
   - Activation: `cc`
   - Action: `wt.exe claude`

### Windows Terminal Quake Mode

```json
// Add to settings.json
{
  "actions": [
    {
      "command": "globalSummon",
      "keys": "ctrl+`"
    }
  ]
}
```

## 🚀 Next Steps

✅ Installation complete! Now explore:

- 📖 [First Project Guide](../first-project.md)
- ⌨️ [Basic Commands](../basic-commands.md)
- 🤖 [Setting up Subagents](/subagents/comprehensive-guide.md)
- 🐳 [Docker on Windows](/docker-vps/docker-setup/setup-guide.md)

## 💡 Windows Pro Tips

1. **Create Desktop Shortcut**
   ```powershell
   $WshShell = New-Object -comObject WScript.Shell
   $Shortcut = $WshShell.CreateShortcut("$Home\Desktop\Claude Code.lnk")
   $Shortcut.TargetPath = "wt.exe"
   $Shortcut.Arguments = "claude"
   $Shortcut.Save()
   ```

2. **AutoHotkey Script** for Quick Access
   ```autohotkey
   ; Win+C to open Claude
   #c::Run, wt.exe claude
   ```

3. **Task Scheduler** for Daily Summaries
   - Create task to run `claude "/daily"` each morning

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check [Troubleshooting](../troubleshooting.md)
