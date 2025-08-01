# [Agency Name] - Multi-Client Workspace

Digital agency/consultancy knowledge management and automation workspace powered by Claude Code.

## 🚀 Overview

This is an AI-enhanced Obsidian vault organized as a "Second Brain" system for managing multiple client projects, content creation, and business operations. The workspace integrates Claude Code for automated workflows and intelligent assistance.

## 🏗️ Architecture

### Core Systems
- **Second Brain Structure**: Natural cognitive flow organization
- **Inbox System**: Capture-first workflow for rapid processing
- **Claude Code Integration**: 13+ custom AI workflows
- **MCP Servers**: Web search, automation, and integrations
- **Client Management**: Complete project lifecycle tracking
- **Content Pipeline**: AI-powered creation and optimization

## 📁 Vault Structure

```
Agency Workspace/
├── 📥 Inbox/                    # Quick capture & processing
│   ├── Daily Dumps/             # Raw thoughts and notes
│   ├── Client Requests/         # Incoming client needs
│   ├── Ideas/                   # Business and creative ideas
│   └── To Process/              # Items awaiting AI enhancement
│
├── 👥 Clients/                  # Client project management
│   ├── Active/
│   │   ├── [Client Name]/
│   │   │   ├── 📋 Overview.md   # Client overview and contacts
│   │   │   ├── 📁 Projects/     # Active project folders
│   │   │   ├── 📧 Communications/
│   │   │   ├── 📊 Reports/      # Status and analytics
│   │   │   └── 💰 Billing/      # Invoices and contracts
│   │   └── _templates/          # Client onboarding templates
│   │
│   ├── Pipeline/                # Business development
│   │   ├── Prospects/           # Potential clients
│   │   ├── Proposals/           # Active proposals
│   │   └── Follow-ups/          # Nurture sequences
│   │
│   └── Archive/                 # Completed projects
│
├── 🧠 Knowledge Base/           # Accumulated expertise
│   ├── Industry Insights/       # Market research and trends
│   ├── Best Practices/          # Proven methodologies
│   ├── Case Studies/            # Success stories
│   ├── Templates/               # Reusable frameworks
│   └── Resources/               # Tools and references
│
├── 📤 Outputs/                  # Deliverables
│   ├── Content Published/       # Blog posts, articles
│   ├── Client Deliverables/     # Completed work
│   ├── Reports Generated/       # Analytics and insights
│   └── Proposals Sent/          # Business documents
│
├── 🤖 AI Systems/              # Claude Code integration
│   ├── Active Agents/          # Specialized AI agents
│   ├── Workflows/              # Custom commands
│   ├── Prompt Library/         # Tested prompts
│   └── Voice Profiles/         # Brand voice definitions
│
├── 📊 Business Operations/      # Agency management
│   ├── Financial/              # Revenue and expenses
│   ├── Team/                   # Staff and contractors
│   ├── Processes/              # SOPs and workflows
│   └── Marketing/              # Agency promotion
│
└── .claude/                    # Claude configuration
    ├── commands/               # Custom AI workflows
    ├── settings.json          # MCP and agent config
    └── .env                   # API keys
```

## 🤖 AI-Powered Workflows

### Daily Operations Commands

#### `/daily` - Comprehensive Daily Summary
```bash
claude "/daily"
```
Scans all active projects, communications, and tasks to generate:
- Client project status updates
- Urgent items requiring attention
- Team task assignments
- Content publishing schedule
- Financial snapshot

#### `/client-new` - Client Onboarding
```bash
claude "/client-new"
```
Creates complete client workspace:
- Folder structure setup
- Overview document with contacts
- Project tracking initialization
- Communication templates
- Billing setup

#### `/project-status` - Project Reporting
```bash
claude "/project-status"
```
Generates comprehensive status reports:
- Milestone progress
- Risk identification
- Resource allocation
- Next steps
- Client-ready summaries

### Content Creation

#### `/content-create` - AI Content Generation
```bash
claude "/content-create"
```
Leverages knowledge base to create:
- Blog posts with SEO optimization
- Social media content
- Email campaigns
- Case studies
- White papers

#### `/voice-analyze` - Brand Voice Consistency
```bash
claude "/voice-analyze"
```
Ensures content matches:
- Client brand guidelines
- Tone and style requirements
- Industry terminology
- Compliance needs

### Client Communication

#### `/email-draft` - Professional Email Generation
```bash
claude "/email-draft"
```
Creates emails matching your style:
- Project updates
- Proposal follow-ups
- Issue resolution
- Relationship nurturing

## 🚀 Getting Started

### Initial Setup

```bash
# 1. Clone the workspace
git clone <repository-url>
cd agency-workspace

# 2. Install Claude Code CLI
npm install -g @anthropic/claude-cli

# 3. Configure environment
cp .claude/.env.example .claude/.env
# Edit .claude/.env with your API keys:
# - ANTHROPIC_API_KEY
# - PERPLEXITY_API_KEY (for web search)
# - Other service keys

# 4. Test setup
claude "/daily"
```

### MCP Server Configuration

```json
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
    },
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_TOKEN"
      }
    }
  }
}
```

## 📋 Client Project Workflow

### 1. New Client Onboarding
```bash
# Create client workspace
claude "/client-new ClientName"

# Initial setup tasks:
1. Fill out client overview
2. Add team contacts
3. Define project scope
4. Set up billing
5. Create kickoff materials
```

### 2. Project Execution
```bash
# Daily project management
claude "/project-status ClientName/ProjectName"

# Content creation
claude "/content-create blog post about [topic] for ClientName"

# Communication
claude "/email-draft update for ClientName on ProjectName progress"
```

### 3. Reporting & Analytics
```bash
# Weekly client reports
claude "/weekly-report ClientName"

# Monthly analytics
claude "/analytics ClientName --period month"

# ROI documentation
claude "/case-study ClientName/ProjectName"
```

## 💼 Business Development

### Lead Management
```
Pipeline/
├── Prospects/
│   ├── Hot/              # Ready to close
│   ├── Warm/             # Active conversations
│   └── Cold/             # Future opportunities
├── Proposals/
│   ├── Draft/            # In progress
│   ├── Sent/             # Awaiting response
│   └── Templates/        # Reusable sections
└── Follow-ups/
    └── Sequences/        # Automated outreach
```

### Proposal Generation
```bash
# Generate proposal from template
claude "Create proposal for [ProspectName] based on web development template"

# Customize for client needs
claude "Adapt proposal for e-commerce focus with SEO emphasis"

# Generate SOW
claude "Create statement of work from accepted proposal"
```

## 📊 Knowledge Management

### Best Practices Capture
```markdown
## After Each Project:
1. Document wins and challenges
2. Extract reusable templates
3. Update process documentation
4. Create case study if successful
5. Add to knowledge base
```

### Industry Intelligence
```bash
# Market research
claude "Research latest trends in [industry] for client brief"

# Competitive analysis  
claude "Analyze competitors for [ClientName] in [market]"

# Technology evaluation
claude "Evaluate [tool/platform] for agency use"
```

## 🔧 Automation & Integration

### Workflow Automation

#### Daily Routine
```yaml
Morning (9:00 AM):
  - Run `/daily` command
  - Review urgent items
  - Check client communications
  - Plan day priorities

Midday (12:00 PM):
  - Quick capture new ideas
  - Process inbox items
  - Update project status

Evening (5:00 PM):
  - Run `/quick-capture` for EOD thoughts
  - Update time tracking
  - Prepare next day
```

#### Weekly Routine
```yaml
Monday:
  - Run `/weekly-review`
  - Set week priorities
  - Client check-ins

Friday:
  - Generate client reports
  - Update pipeline
  - Team retrospective
```

### Integration Points

#### CRM Integration
```javascript
// Sync with HubSpot/Salesforce
{
  "sync_frequency": "hourly",
  "sync_fields": ["status", "next_action", "notes"],
  "two_way_sync": true
}
```

#### Project Management
```javascript
// Connect with Asana/Monday/ClickUp
{
  "task_sync": true,
  "time_tracking": true,
  "milestone_updates": true
}
```

## 🎯 Quality Assurance

### Content QA Checklist
- [ ] Brand voice consistency
- [ ] SEO optimization
- [ ] Factual accuracy
- [ ] Client approval
- [ ] Legal compliance

### Project QA Process
1. Internal review
2. Peer feedback
3. Client preview
4. Final approval
5. Post-delivery follow-up

## 📈 Performance Metrics

### Agency KPIs
```markdown
## Monthly Tracking:
- Active clients: X
- Projects completed: Y
- Revenue: $Z
- Client satisfaction: X/10
- Team utilization: X%
```

### Client Success Metrics
```markdown
## Per Client:
- Project delivery rate
- Budget adherence
- Satisfaction scores
- Retention rate
- Referral generation
```

## 🔒 Security & Compliance

### Data Protection
- Client folders encrypted
- Access controls per team member
- Regular backups to secure cloud
- NDA compliance tracking

### API Key Management
```bash
# Never commit .env files
# Rotate keys quarterly
# Use separate keys per client if needed
# Monitor usage for anomalies
```

## 🚨 Troubleshooting

### Common Issues

#### "Claude command not working"
```bash
# Check API key
echo $ANTHROPIC_API_KEY

# Verify MCP servers
claude "Test MCP server connections"

# Restart Claude Code
claude restart
```

#### "Workflow not finding files"
```bash
# Ensure correct working directory
pwd  # Should be in vault root

# Check file paths in commands
# Use relative paths from vault root
```

## 📚 Resources

### Internal Documentation
- `Knowledge Base/Best Practices/` - Proven methods
- `AI Systems/Prompt Library/` - Tested prompts
- `Business Operations/Processes/` - SOPs

### External Resources
- [Claude Code Docs](https://docs.anthropic.com/claude/docs/claude-code)
- [Obsidian Documentation](https://help.obsidian.md)
- [Agency Growth Resources](Knowledge Base/Resources/Growth/)

## 🤝 Team Collaboration

### Roles & Permissions
- **Account Managers**: Full client folder access
- **Creatives**: Content and knowledge base
- **Developers**: Project technical areas
- **Finance**: Billing and reports only

### Communication Channels
- Slack: #general, #clients, #ai-workflows
- Weekly standups: Monday 9 AM
- Client syncs: Per project schedule

---

For questions: 
- Technical: @tech-lead
- Client-related: @account-manager  
- AI workflows: @ai-specialist
- Business: @agency-owner