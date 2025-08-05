# 🖥️ Multi-Platform AI Memory System Setup

> **Universal Installation**: Get your AI Memory System running on any platform - macOS, Windows, Linux, or WSL - with automated setup and cross-platform consistency

---

## 🎯 Setup Overview

This guide provides **one-click installation** scripts that automatically configure your AI Memory System across all major platforms. The setup includes:

- **Obsidian vault structure** with emoji-based navigation
- **Claude Code integration** with custom commands
- **MCP server configuration** for enhanced capabilities  
- **Cross-platform terminal aliases** for seamless workflows
- **Environment synchronization** across multiple machines

---

## 🚀 Quick Start (Any Platform)

### Option 1: Automatic Platform Detection
```bash
# Download and run the universal installer
curl -sSL https://github.com/ai-memory-system/setup/install.sh | bash

# Or for Windows PowerShell
iwr -useb https://github.com/ai-memory-system/setup/install.ps1 | iex
```

### Option 2: Manual Platform Selection
Choose your platform and follow the specific instructions below.

---

## 🍎 macOS Installation

### Prerequisites
```bash
# Install required tools
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node git
```

### Automated Setup Script
```bash
#!/bin/bash
# save as: setup-mac.sh

echo "🚀 Setting up AI Memory System for macOS..."

# 1. Create directory structure
echo "📁 Creating workspace structure..."
mkdir -p ~/Documents/AI-Memory-System/{.claude/{commands,agents},terminal/{scripts,mcp-servers,aliases}}

# 2. Install Claude Code
echo "🤖 Installing Claude Code..."
npm install -g @anthropic-ai/claude-code

# 3. Configure environment
echo "⚙️ Setting up environment..."
cat > ~/Documents/AI-Memory-System/.claude/.env << 'EOF'
# AI Memory System Environment Configuration
ANTHROPIC_API_KEY=your_api_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
EOF

# 4. Install MCP servers
echo "🔌 Installing MCP servers..."
cd ~/Documents/AI-Memory-System/terminal/mcp-servers
npx -y server-perplexity-ask --help > /dev/null 2>&1
npx -y @modelcontextprotocol/server-playwright --help > /dev/null 2>&1

# 5. Create Claude Code configuration
echo "🔧 Configuring Claude Code..."
cat > ~/Documents/AI-Memory-System/.claude/settings.json << 'EOF'
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
EOF

# 6. Set up terminal aliases
echo "🔗 Creating terminal aliases..."
cat > ~/Documents/AI-Memory-System/terminal/aliases/mac.sh << 'EOF'
#!/bin/bash
# AI Memory System - macOS Aliases

# Navigation
alias workhub="cd ~/Documents/AI-Memory-System"
alias claude-config="cd ~/Documents/AI-Memory-System/.claude"

# Core workflows
alias claude-daily="claude --settings ~/Documents/AI-Memory-System/.claude/settings.json '/daily'"
alias claude-capture="claude --settings ~/Documents/AI-Memory-System/.claude/settings.json '/quick-capture'"
alias claude-validate="claude --settings ~/Documents/AI-Memory-System/.claude/settings.json '/microsaas-validate'"

# System management
alias reload-env="source ~/Documents/AI-Memory-System/.claude/.env"
alias check-mcp="npx -y server-perplexity-ask --help && npx -y @modelcontextprotocol/server-playwright --help"

echo "AI Memory System aliases loaded ✅"
EOF

# 7. Add to shell profile
echo "📝 Adding to shell profile..."
SHELL_PROFILE=""
if [ -f ~/.zshrc ]; then
    SHELL_PROFILE=~/.zshrc
elif [ -f ~/.bash_profile ]; then
    SHELL_PROFILE=~/.bash_profile
elif [ -f ~/.bashrc ]; then
    SHELL_PROFILE=~/.bashrc
fi

if [ ! -z "$SHELL_PROFILE" ]; then
    echo "" >> $SHELL_PROFILE
    echo "# AI Memory System" >> $SHELL_PROFILE
    echo "source ~/Documents/AI-Memory-System/terminal/aliases/mac.sh" >> $SHELL_PROFILE
fi

# 8. Create Obsidian workspace
echo "🧠 Setting up Obsidian workspace..."
./create-vault-structure.sh ~/Documents/AI-Memory-System

echo "✅ macOS setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your API keys to .claude/.env"
echo "2. Restart your terminal or run: source $SHELL_PROFILE"
echo "3. Test with: claude-daily"
echo "4. Open ~/Documents/AI-Memory-System in Obsidian"
```

### Quick Commands
```bash
# Make executable and run
chmod +x setup-mac.sh
./setup-mac.sh

# Test installation
source ~/.zshrc  # or your shell profile
claude-daily
```

---

## 🪟 Windows Installation

### Prerequisites (PowerShell as Administrator)
```powershell
# Install required tools
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
iwr -useb get.scoop.sh | iex
scoop install nodejs git

# Or use Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
choco install nodejs git
```

### Automated Setup Script
```powershell
# save as: setup-windows.ps1

Write-Host "🚀 Setting up AI Memory System for Windows..." -ForegroundColor Green

# 1. Create directory structure
Write-Host "📁 Creating workspace structure..." -ForegroundColor Yellow
$WorkspaceRoot = "$env:USERPROFILE\Documents\AI-Memory-System"
New-Item -ItemType Directory -Force -Path "$WorkspaceRoot\.claude\commands"
New-Item -ItemType Directory -Force -Path "$WorkspaceRoot\.claude\agents"
New-Item -ItemType Directory -Force -Path "$WorkspaceRoot\terminal\scripts"
New-Item -ItemType Directory -Force -Path "$WorkspaceRoot\terminal\mcp-servers"
New-Item -ItemType Directory -Force -Path "$WorkspaceRoot\terminal\aliases"

# 2. Install Claude Code
Write-Host "🤖 Installing Claude Code..." -ForegroundColor Yellow
npm install -g @anthropic-ai/claude-code

# 3. Configure environment
Write-Host "⚙️ Setting up environment..." -ForegroundColor Yellow
@"
# AI Memory System Environment Configuration
ANTHROPIC_API_KEY=your_api_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
"@ | Out-File -FilePath "$WorkspaceRoot\.claude\.env" -Encoding UTF8

# 4. Install MCP servers
Write-Host "🔌 Installing MCP servers..." -ForegroundColor Yellow
Set-Location "$WorkspaceRoot\terminal\mcp-servers"
npx -y server-perplexity-ask --help > $null 2>&1
npx -y @modelcontextprotocol/server-playwright --help > $null 2>&1

# 5. Create Claude Code configuration
Write-Host "🔧 Configuring Claude Code..." -ForegroundColor Yellow
@"
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "`$PERPLEXITY_API_KEY"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
"@ | Out-File -FilePath "$WorkspaceRoot\.claude\settings.json" -Encoding UTF8

# 6. Set up PowerShell aliases
Write-Host "🔗 Creating PowerShell aliases..." -ForegroundColor Yellow
@"
# AI Memory System - Windows PowerShell Aliases

# Navigation
function workhub { Set-Location "$env:USERPROFILE\Documents\AI-Memory-System" }
function claude-config { Set-Location "$env:USERPROFILE\Documents\AI-Memory-System\.claude" }

# Core workflows
function claude-daily { claude --settings "$env:USERPROFILE\Documents\AI-Memory-System\.claude\settings.json" "/daily" }
function claude-capture { param(`$idea) claude --settings "$env:USERPROFILE\Documents\AI-Memory-System\.claude\settings.json" "/quick-capture" "`$idea" }
function claude-validate { param(`$idea) claude --settings "$env:USERPROFILE\Documents\AI-Memory-System\.claude\settings.json" "/microsaas-validate" "`$idea" }

# System management
function reload-env { 
    Get-Content "$env:USERPROFILE\Documents\AI-Memory-System\.claude\.env" | ForEach-Object { 
        if (`$_ -match '^([^=]+)=(.*)$') { 
            Set-Item -Path "env:`$(`$matches[1])" -Value `$matches[2] 
        } 
    } 
}
function check-mcp { 
    npx -y server-perplexity-ask --help
    npx -y @modelcontextprotocol/server-playwright --help
}

Write-Host "AI Memory System aliases loaded ✅" -ForegroundColor Green
"@ | Out-File -FilePath "$WorkspaceRoot\terminal\aliases\windows.ps1" -Encoding UTF8

# 7. Add to PowerShell profile
Write-Host "📝 Adding to PowerShell profile..." -ForegroundColor Yellow
if (!(Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -Type File -Force
}
Add-Content -Path $PROFILE -Value "`n# AI Memory System"
Add-Content -Path $PROFILE -Value ". `"$WorkspaceRoot\terminal\aliases\windows.ps1`""

# 8. Create Obsidian workspace
Write-Host "🧠 Setting up Obsidian workspace..." -ForegroundColor Yellow
& "$WorkspaceRoot\terminal\scripts\create-vault-structure.ps1" "$WorkspaceRoot"

Write-Host "✅ Windows setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Add your API keys to .claude\.env"
Write-Host "2. Restart PowerShell or run: . `$PROFILE"
Write-Host "3. Test with: claude-daily"
Write-Host "4. Open $WorkspaceRoot in Obsidian"
```

### Quick Commands
```powershell
# Run setup (PowerShell as Administrator)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-windows.ps1

# Test installation
. $PROFILE
claude-daily
```

---

## 🐧 Linux/WSL Installation

### Prerequisites
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y curl git nodejs npm

# RHEL/CentOS/Fedora
sudo dnf install -y curl git nodejs npm
# or: sudo yum install -y curl git nodejs npm

# Arch Linux
sudo pacman -S curl git nodejs npm
```

### Automated Setup Script
```bash
#!/bin/bash
# save as: setup-linux.sh

echo "🚀 Setting up AI Memory System for Linux/WSL..."

# 1. Create directory structure
echo "📁 Creating workspace structure..."
mkdir -p ~/AI-Memory-System/{.claude/{commands,agents},terminal/{scripts,mcp-servers,aliases}}

# 2. Install Claude Code
echo "🤖 Installing Claude Code..."
npm install -g @anthropic-ai/claude-code

# 3. Configure environment
echo "⚙️ Setting up environment..."
cat > ~/AI-Memory-System/.claude/.env << 'EOF'
# AI Memory System Environment Configuration
ANTHROPIC_API_KEY=your_api_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
EOF

# 4. Install MCP servers
echo "🔌 Installing MCP servers..."
cd ~/AI-Memory-System/terminal/mcp-servers
npx -y server-perplexity-ask --help > /dev/null 2>&1
npx -y @modelcontextprotocol/server-playwright --help > /dev/null 2>&1

# 5. Create Claude Code configuration
echo "🔧 Configuring Claude Code..."
cat > ~/AI-Memory-System/.claude/settings.json << 'EOF'
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
EOF

# 6. Set up terminal aliases
echo "🔗 Creating terminal aliases..."
cat > ~/AI-Memory-System/terminal/aliases/linux.sh << 'EOF'
#!/bin/bash
# AI Memory System - Linux/WSL Aliases

# Navigation
alias workhub="cd ~/AI-Memory-System"
alias claude-config="cd ~/AI-Memory-System/.claude"

# Core workflows
alias claude-daily="claude --settings ~/AI-Memory-System/.claude/settings.json '/daily'"
alias claude-capture="claude --settings ~/AI-Memory-System/.claude/settings.json '/quick-capture'"
alias claude-validate="claude --settings ~/AI-Memory-System/.claude/settings.json '/microsaas-validate'"

# System management
alias reload-env="source ~/AI-Memory-System/.claude/.env"
alias check-mcp="npx -y server-perplexity-ask --help && npx -y @modelcontextprotocol/server-playwright --help"

echo "AI Memory System aliases loaded ✅"
EOF

# 7. Add to shell profile
echo "📝 Adding to shell profile..."
SHELL_PROFILE=""
if [ -f ~/.bashrc ]; then
    SHELL_PROFILE=~/.bashrc
elif [ -f ~/.zshrc ]; then
    SHELL_PROFILE=~/.zshrc
elif [ -f ~/.profile ]; then
    SHELL_PROFILE=~/.profile
fi

if [ ! -z "$SHELL_PROFILE" ]; then
    echo "" >> $SHELL_PROFILE
    echo "# AI Memory System" >> $SHELL_PROFILE
    echo "source ~/AI-Memory-System/terminal/aliases/linux.sh" >> $SHELL_PROFILE
fi

# 8. Create Obsidian workspace
echo "🧠 Setting up Obsidian workspace..."
./create-vault-structure.sh ~/AI-Memory-System

echo "✅ Linux/WSL setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your API keys to .claude/.env"
echo "2. Restart your terminal or run: source $SHELL_PROFILE"
echo "3. Test with: claude-daily"
echo "4. Install Obsidian and open ~/AI-Memory-System"
```

### Quick Commands
```bash
# Make executable and run
chmod +x setup-linux.sh
./setup-linux.sh

# Test installation
source ~/.bashrc  # or your shell profile
claude-daily
```

---

## 🔧 Universal Vault Structure Creator

This script works across all platforms to create the Obsidian vault structure:

### create-vault-structure.sh (Bash/Linux/macOS)
```bash
#!/bin/bash
# Creates the AI Memory System folder structure

WORKSPACE_ROOT="$1"
if [ -z "$WORKSPACE_ROOT" ]; then
    echo "Usage: $0 /path/to/workspace"
    exit 1
fi

echo "🧠 Creating AI Memory System vault structure..."

# Core directories with emoji navigation
mkdir -p "$WORKSPACE_ROOT"/{📥\ Inbox/{Daily\ Dumps,Quick\ Ideas,To\ Process},🖼️\ Screenshots/{UI-UX,Websites,Workflows,Errors-Issues},🧠\ Knowledge\ Base/{Design\ Insights,Best\ Practices,Research\ Notes,Learning\ Library}}

mkdir -p "$WORKSPACE_ROOT"/{🤖\ AI\ Systems/{Active\ Agents,Prompt\ Library,Workflows,Templates},📅\ Daily\ Operations/{Daily\ Notes,Weekly\ Reviews,Meeting\ Notes}}

mkdir -p "$WORKSPACE_ROOT"/{💼\ Projects/{Active,Ideas\ Lab,Components},📤\ Outputs/{Content\ Published,Reports,Proposals}}

mkdir -p "$WORKSPACE_ROOT"/{🔧\ System/{Templates,Canvas\ Maps,MOCs}}

# Create README files for each major section
cat > "$WORKSPACE_ROOT/📥 Inbox/README.md" << 'EOF'
# 📥 Inbox System

Capture-first workflow for all incoming thoughts, ideas, and information.

## Workflow
1. **Capture**: Everything goes here first (use `/quick-capture`)
2. **Process**: Review and enhance with AI daily
3. **Organize**: Move to appropriate permanent folders
4. **Connect**: Link to related content

## Folders
- **Daily Dumps**: Raw thoughts and unprocessed ideas
- **Quick Ideas**: Innovation and creative thoughts
- **To Process**: Items requiring deeper AI analysis
EOF

cat > "$WORKSPACE_ROOT/🤖 AI Systems/README.md" << 'EOF'
# 🤖 AI Systems

Your AI Memory System control center and automation hub.

## Components
- **Active Agents**: Specialized AI assistants (debug-expert, ui-ux-expert, etc.)
- **Prompt Library**: Reusable AI instructions organized by category
- **Workflows**: Custom Claude Code commands (daily, quick-capture, etc.)
- **Templates**: AI-enhanced document templates

## Key Commands
- `/daily` - Comprehensive daily summary
- `/quick-capture` - Smart idea categorization
- `/microsaas-validate` - Business idea validation
EOF

# Create essential template files
cat > "$WORKSPACE_ROOT/🔧 System/Templates/Daily Note Template.md" << 'EOF'
# Daily Note - {{date:YYYY-MM-DD}}

## 🎯 Today's Focus
- [ ] 
- [ ] 
- [ ] 

## 📝 Quick Captures
*Use `/quick-capture` to add ideas throughout the day*

## 🤝 Interactions
### Meetings & Calls

### Client Communication

## 💻 Work Progress
### Development

### Content Creation

## 🧠 Learning & Insights

## 🔄 Tomorrow's Prep
- [ ] 
- [ ] 
- [ ] 

---
*Generated by AI Memory System*
EOF

# Create Canvas maps directory with example
mkdir -p "$WORKSPACE_ROOT/🔧 System/Canvas Maps"

# Create MOCs directory with master MOC
cat > "$WORKSPACE_ROOT/🔧 System/MOCs/AI Memory System Master MOC.md" << 'EOF'
# 🧠 AI Memory System Master MOC

Your complete navigation index for the AI Memory System.

## Core Workflow Areas

### 📥 [[📥 Inbox/README|Inbox System]]
- **Purpose**: Capture-first workspace
- **Key Command**: `/quick-capture`

### 🤖 [[🤖 AI Systems/README|AI Systems]]
- **Purpose**: Automation and intelligence center
- **Key Commands**: `/daily`, `/microsaas-validate`

### 🧠 [[🧠 Knowledge Base/README|Knowledge Base]]
- **Purpose**: Processed insights and wisdom
- **Flow**: Raw → Analysis → Insight → Application

## Quick Navigation
- [[📅 Daily Operations/README|Daily Operations]]
- [[💼 Projects/README|Projects]]
- [[📤 Outputs/README|Outputs]]
- [[🔧 System/README|System]]

## Getting Started
1. Set up daily workflow with `/daily` command
2. Use `/quick-capture` throughout the day
3. Process inbox items weekly
4. Build connections between ideas

*Your AI Memory System grows smarter with use*
EOF

echo "✅ Vault structure created successfully!"
echo ""
echo "Structure created:"
echo "📥 Inbox - Capture and processing"
echo "🖼️ Screenshots - Visual memory system"  
echo "🧠 Knowledge Base - Processed insights"
echo "🤖 AI Systems - Automation center"
echo "📅 Daily Operations - Time-based organization"
echo "💼 Projects - Active work"
echo "📤 Outputs - Finished deliverables"
echo "🔧 System - Management and navigation"
```

### create-vault-structure.ps1 (PowerShell/Windows)
```powershell
# Creates the AI Memory System folder structure for Windows
param([string]$WorkspaceRoot)

if ([string]::IsNullOrEmpty($WorkspaceRoot)) {
    Write-Host "Usage: .\create-vault-structure.ps1 C:\Path\To\Workspace" -ForegroundColor Red
    exit 1
}

Write-Host "🧠 Creating AI Memory System vault structure..." -ForegroundColor Green

# Core directories with emoji navigation
$Directories = @(
    "📥 Inbox\Daily Dumps",
    "📥 Inbox\Quick Ideas", 
    "📥 Inbox\To Process",
    "🖼️ Screenshots\UI-UX",
    "🖼️ Screenshots\Websites",
    "🖼️ Screenshots\Workflows",
    "🖼️ Screenshots\Errors-Issues",
    "🧠 Knowledge Base\Design Insights",
    "🧠 Knowledge Base\Best Practices",
    "🧠 Knowledge Base\Research Notes",
    "🧠 Knowledge Base\Learning Library",
    "🤖 AI Systems\Active Agents",
    "🤖 AI Systems\Prompt Library",
    "🤖 AI Systems\Workflows",
    "🤖 AI Systems\Templates",
    "📅 Daily Operations\Daily Notes",
    "📅 Daily Operations\Weekly Reviews",
    "📅 Daily Operations\Meeting Notes",
    "💼 Projects\Active",
    "💼 Projects\Ideas Lab",
    "💼 Projects\Components",
    "📤 Outputs\Content Published",
    "📤 Outputs\Reports",
    "📤 Outputs\Proposals",
    "🔧 System\Templates",
    "🔧 System\Canvas Maps",
    "🔧 System\MOCs"
)

foreach ($Dir in $Directories) {
    New-Item -ItemType Directory -Force -Path "$WorkspaceRoot\$Dir" | Out-Null
}

# Create README files and templates (similar to bash version)
# ... [Rest of template creation code similar to bash version]

Write-Host "✅ Vault structure created successfully!" -ForegroundColor Green
```

---

## 🔄 Cross-Platform Synchronization

### Environment Variables
All platforms use the same `.claude/.env` file format:
```bash
# AI Memory System Environment Configuration
ANTHROPIC_API_KEY=your_anthropic_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here  
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
```

### Settings Synchronization
Use Git to synchronize configurations across machines:
```bash
# Initialize git in your workspace (once)
cd ~/AI-Memory-System  # or your workspace path
git init
git add .claude/settings.json .claude/commands/ terminal/aliases/
git commit -m "Initial AI Memory System configuration"

# Add remote repository for team/multi-machine sync
git remote add origin https://github.com/yourusername/ai-memory-config.git
git push -u origin main

# On other machines, clone your configuration
git clone https://github.com/yourusername/ai-memory-config.git ~/AI-Memory-System/.config
```

### Universal Commands
These commands work identically across all platforms after setup:
```bash
# Core workflow commands
claude-daily                    # Generate daily summary
claude-capture "your idea"      # Capture and categorize
claude-validate "business idea" # Validate MicroSaaS ideas

# Navigation commands  
workhub                        # Go to workspace root
claude-config                  # Go to configuration folder

# System management
reload-env                     # Reload environment variables
check-mcp                      # Test MCP server connections
```

---

## 🛠️ Troubleshooting Common Issues

### Command Not Found
```bash
# Problem: "claude command not found"
# Solution: Ensure Claude Code is installed and in PATH
npm install -g @anthropic-ai/claude-code
# Restart terminal or reload shell profile
```

### MCP Server Connection Issues
```bash
# Problem: MCP servers not connecting
# Solution: Test individual servers
npx -y server-perplexity-ask --help
npx -y @modelcontextprotocol/server-playwright --help

# Check API keys are set
echo $PERPLEXITY_API_KEY  # Linux/macOS
$env:PERPLEXITY_API_KEY   # Windows PowerShell
```

### Permission Issues (Linux/macOS)
```bash
# Problem: Permission denied errors
# Solution: Fix npm global install permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Add to shell profile: export PATH=~/.npm-global/bin:$PATH
```

### Obsidian Integration Issues
```bash
# Problem: Vault not appearing in Obsidian
# Solution: 
# 1. Open Obsidian
# 2. Click "Open folder as vault"
# 3. Select your AI-Memory-System directory
# 4. Enable required plugins (Templates, Canvas, etc.)
```

---

## 🚀 Next Steps After Installation

### 1. Configure API Keys
Edit `.claude/.env` with your actual API keys:
```bash
# Get your keys from:
# - Anthropic Console: console.anthropic.com
# - Perplexity: www.perplexity.ai/pro (optional)
# - GitHub: github.com/settings/tokens (optional)
```

### 2. Test Your Installation
```bash
# Test basic functionality
claude-daily

# Test quick capture
claude-capture "test idea to verify system works"

# Test MCP integration (if configured)
claude "Search for the latest AI news" # Uses Perplexity if configured
```

### 3. Import Your Existing Work
```bash
# Move existing notes into the new structure
# Use `/quick-capture` to process and organize existing content
claude-capture "process my existing notes folder into the new system"
```

### 4. Set Up Daily Workflow
```bash
# Add to your daily routine
# Morning: claude-daily
# Throughout day: claude-capture for ideas
# Evening: claude-daily for review
```

### 5. Customize for Your Needs
- Modify folder structure for your specific work
- Add custom commands for your workflows  
- Configure additional MCP servers
- Set up team collaboration if needed

---

## 🎉 Installation Complete!

You now have a **universal AI Memory System** that works consistently across all your devices and platforms. The system will:

- **Remember everything** through persistent knowledge management
- **Work the same way** regardless of your operating system
- **Grow smarter** with each interaction and accumulated knowledge
- **Scale effortlessly** as your needs and team grow

**Welcome to the future of AI-powered productivity!**

*Your AI now has perfect memory. Use it wisely.* 🧠✨