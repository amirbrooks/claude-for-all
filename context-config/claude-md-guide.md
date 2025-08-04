# 📝 CLAUDE.md Complete Guide

> Master the art of context configuration for Claude Code

## 📖 What is CLAUDE.md?

CLAUDE.md is a powerful context configuration file that provides Claude Code with essential information about your project. Think of it as your AI assistant's onboarding document - it helps Claude understand your project structure, conventions, and workflows.

## 🎯 Why CLAUDE.md Matters

### Benefits
- **🧠 Context Preservation**: Maintains project knowledge across sessions
- **⚡ Faster Development**: Claude understands your project immediately
- **🔧 Custom Workflows**: Define project-specific commands and patterns
- **👥 Team Consistency**: Shared understanding for all team members
- **📊 Better Results**: More accurate and relevant code suggestions

### When to Use CLAUDE.md
- Any project with 5+ files
- Projects with specific conventions or frameworks
- Team collaborations
- Complex architectures
- Custom workflows or commands

## 🏗️ Essential Components

### 1. Project Overview
```markdown
# Project Name

Brief description of what this project does and its main purpose.

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- Tools: Vite, ESLint, Prettier
```

### 2. Project Structure
```markdown
## Project Structure
```
src/
├── components/     # React components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── api/            # API integration
└── types/          # TypeScript types
```
```

### 3. Key Conventions
```markdown
## Conventions

### Naming
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

### Code Style
- Use functional components with hooks
- Prefer named exports
- Keep components under 200 lines
- Write tests for all utilities
```

### 4. Common Commands
```markdown
## Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Lint code
```

### Deployment
```bash
npm run deploy:staging     # Deploy to staging
npm run deploy:production  # Deploy to production
```
```

### 5. Important Context
```markdown
## Important Notes

- Authentication uses JWT tokens stored in httpOnly cookies
- All API calls go through /api proxy
- Database migrations are in /migrations
- Environment variables are validated in env.config.ts
```

## 📋 Complete Template Structure

```markdown
# Project Name

[Brief description]

## 🚀 Quick Start

[Essential commands to get started]

## 🏗️ Architecture

### Tech Stack
[List all technologies]

### Project Structure
[Directory tree with explanations]

### Key Files
[Important files and their purposes]

## 🔧 Development

### Setup
[Development environment setup]

### Conventions
[Coding standards and patterns]

### Common Tasks
[Frequent development tasks]

## 🧪 Testing

[Testing approach and commands]

## 🚀 Deployment

[Deployment process and environments]

## 📝 Important Notes

[Critical information Claude should know]

## 🤖 AI Assistant Instructions

[Specific guidance for Claude]
```

## 🎯 Best Practices

### 1. Be Concise but Complete
```markdown
# ❌ Too Verbose
The user authentication system uses JSON Web Tokens (JWT) which are 
stored in httpOnly cookies for security. When a user logs in, the 
server generates a token...

# ✅ Just Right
Authentication uses JWT tokens in httpOnly cookies. See auth/README.md 
for implementation details.
```

### 2. Include Examples
```markdown
## API Patterns

All API endpoints follow REST conventions:
- GET /api/users - List users
- GET /api/users/:id - Get single user
- POST /api/users - Create user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user
```

### 3. Highlight Gotchas
```markdown
## ⚠️ Important

- NEVER commit .env files
- Always run migrations before deploying
- The /legacy folder is deprecated - don't modify
- Use the custom useAuth hook, not direct context
```

### 4. Provide Context for Decisions
```markdown
## Architecture Decisions

- **Why TypeScript**: Type safety for large team
- **Why Tailwind**: Consistent styling, small bundle
- **Why PostgreSQL**: Complex relational data
- **Why Monorepo**: Shared code between apps
```

## 🔧 Advanced Features

### Custom Commands
```markdown
## 🤖 Custom Commands

Claude can execute these project-specific commands:

### /generate-component
Creates a new component with tests and stories
Usage: "Generate a Button component"

### /add-endpoint
Adds a new API endpoint with validation
Usage: "Add POST /api/products endpoint"

### /update-schema
Updates database schema and types
Usage: "Add 'archived' boolean to products table"
```

### MCP Server Configuration
```markdown
## 🔌 MCP Servers

This project uses these MCP servers:

```json
{
  "mcpServers": {
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
```

### Environment-Specific Instructions
```markdown
## 📁 Environment Configuration

### Development
- Uses local PostgreSQL on port 5432
- Hot reload enabled
- Verbose logging

### Staging
- Connects to staging.db.example.com
- Rate limiting enabled
- Error tracking active

### Production
- Read replicas for queries
- Redis caching enabled
- Minimal logging
```

## 📊 Examples by Project Type

### React SPA
```markdown
# E-commerce React App

Modern e-commerce platform built with React and TypeScript.

## Quick Start
```bash
npm install
npm run dev
```

## Architecture
- Vite + React 18 + TypeScript
- Zustand for state management
- React Query for data fetching
- Tailwind CSS for styling

## Key Patterns
- All API calls use custom hooks
- Components are co-located with tests
- Shared components in /components
- Page-specific components in /pages/[page]/components
```

### Node.js API
```markdown
# REST API Service

Express-based API with PostgreSQL.

## Quick Start
```bash
npm install
npm run db:migrate
npm run dev
```

## Architecture
- Express + TypeScript
- Prisma ORM
- Jest for testing
- Docker for local development

## API Structure
- /src/routes - Route definitions
- /src/controllers - Business logic
- /src/services - External integrations
- /src/models - Database models
```

### Python Data Science
```markdown
# ML Pipeline Project

Customer churn prediction pipeline.

## Quick Start
```bash
pip install -r requirements.txt
jupyter lab
```

## Project Structure
- /notebooks - Jupyter notebooks for exploration
- /src - Production code
- /data - Raw and processed data
- /models - Trained models
- /tests - Unit tests

## Workflow
1. Data exploration in notebooks
2. Refactor to src/ modules
3. Run pipeline with `python -m src.pipeline`
4. Model served via FastAPI
```

## 🚨 Common Mistakes to Avoid

### 1. Too Much Information
```markdown
# ❌ Bad: Information overload
[500 lines of detailed documentation]

# ✅ Good: Essential info with links
See /docs for detailed documentation
Key points:
- Use TypeScript
- Follow Airbnb style guide
- Test all features
```

### 2. Outdated Information
```markdown
# ❌ Bad: Stale commands
npm run start  # (doesn't exist anymore)

# ✅ Good: Verified commands
npm run dev    # Start dev server (port 3000)
```

### 3. Missing Context
```markdown
# ❌ Bad: No explanation
Don't modify /generated folder

# ✅ Good: Context provided
Don't modify /generated folder - auto-generated 
from Prisma schema on each build
```

### 4. Unclear Structure
```markdown
# ❌ Bad: Flat list
- components
- utils
- api
- types
- hooks

# ✅ Good: Hierarchical with purpose
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components
│   └── [page]/     # Page-specific components
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
└── types/          # TypeScript definitions
```

## 🎨 Formatting Guidelines

### Use Clear Headers
```markdown
# Project Name
## Section
### Subsection
#### Detail
```

### Code Blocks with Language
````markdown
```typescript
// TypeScript code
```

```bash
# Shell commands
```

```json
{
  "json": "configuration"
}
```
````

### Tables for Comparisons
```markdown
| Environment | Database | API URL |
|-------------|----------|----------|
| Development | localhost:5432 | http://localhost:3000 |
| Staging | staging.db.com | https://api-staging.com |
| Production | prod.db.com | https://api.com |
```

### Icons for Visual Clarity
```markdown
- ✅ Completed features
- 🚧 In progress
- ❌ Deprecated
- ⚠️ Important notes
- 💡 Tips and tricks
- 🐛 Known issues
```

## 🔄 Maintenance

### Regular Updates
- Review monthly
- Update after major changes
- Verify commands still work
- Remove outdated information

### Team Contributions
```markdown
## Contributing to CLAUDE.md

When adding new features:
1. Update relevant sections
2. Add new commands if applicable
3. Document any new conventions
4. Update examples if needed
```

### Version Tracking
```markdown
## Changelog

### 2024-01-15
- Added Docker setup instructions
- Updated API endpoints
- Fixed outdated npm scripts

### 2024-01-01
- Initial CLAUDE.md created
```

## 🎯 Quick Checklist

Before finalizing your CLAUDE.md, ensure you have:

- [ ] Project overview and purpose
- [ ] Complete tech stack list
- [ ] Directory structure with explanations
- [ ] Development setup instructions
- [ ] Common commands and their purposes
- [ ] Coding conventions and patterns
- [ ] Important warnings or gotchas
- [ ] Testing approach
- [ ] Deployment process
- [ ] Contact information or resources

## 💡 Pro Tips

1. **Start Simple**: Begin with basics, add detail over time
2. **Use Examples**: Show, don't just tell
3. **Link Out**: Reference detailed docs rather than duplicating
4. **Stay Current**: Update regularly or it becomes useless
5. **Test It**: Have someone new to the project use it
6. **Be Specific**: "Use TypeScript" → "Use TypeScript with strict mode"
7. **Include Why**: Explain decisions, not just rules

## 📚 Next Steps

1. Check out our [templates](templates/) for your project type
2. Read [best practices](best-practices.md) for advanced patterns
3. See [real examples](examples/) from successful projects
4. Join the discussion in our [community](https://discord.gg/claude-code)

---

Remember: A good CLAUDE.md saves hours of context switching and confusion. Invest 30 minutes writing it, save countless hours later! 🚀