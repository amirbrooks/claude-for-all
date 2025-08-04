# 📝 Context Configuration

> Master the art of creating effective CLAUDE.md files for your projects

## 📖 Overview

Context configuration is crucial for maximizing Claude Code's effectiveness. A well-crafted CLAUDE.md file serves as your AI assistant's comprehensive guide to understanding your project, enabling faster development and more accurate assistance.

## 📚 Contents

### 📘 [CLAUDE.md Complete Guide](claude-md-guide.md)
Comprehensive guide covering:
- What is CLAUDE.md and why it matters
- Essential components and structure
- Writing effective documentation
- Common mistakes to avoid
- Pro tips and examples

### 🎯 [Best Practices](best-practices.md)
Advanced patterns for different scenarios:
- Project type patterns (web, mobile, ML, enterprise)
- Team size considerations
- Structure patterns (monorepo, microservices)
- Content patterns and evolution strategies

### 📁 [Templates](templates/)
Ready-to-use templates for various project types:

#### 🌱 [Basic Project](templates/basic-project.md)
Simple template for small projects and scripts

#### 🌐 [Web Development](templates/web-development.md)
Full-stack web application with React, Node.js, and PostgreSQL

#### 📊 [Data Science](templates/data-science.md)
Machine learning projects with Python, Jupyter, and MLflow

#### 🏢 [Agency/Consultancy](templates/agency-consultancy.md)
Multi-client workspace with AI-powered workflows

#### 📖 [Documentation Site](templates/documentation-site.md)
Technical documentation with Docusaurus/VitePress

#### 🗂️ [Monorepo](templates/monorepo.md)
Multi-package workspace with shared dependencies

## 🚀 Quick Start

### 1. Choose Your Template
Select the template that best matches your project type:

```bash
# Copy template to your project root
cp claude-code-hub/context-config/templates/web-development.md ./CLAUDE.md
```

### 2. Customize the Content
Edit the template to match your project:
- Update project name and description
- List your actual tech stack
- Document your file structure
- Add your specific commands
- Include project-specific conventions

### 3. Keep It Updated
- Review monthly or after major changes
- Update commands and dependencies
- Add new patterns as they emerge
- Remove outdated information

## 💡 Key Principles

### 1. **Be Concise but Complete**
Provide enough context without overwhelming. Focus on what Claude needs to know to help effectively.

### 2. **Use Examples**
Show actual code patterns, command usage, and file structures from your project.

### 3. **Document Decisions**
Explain why certain choices were made to help Claude understand the context.

### 4. **Highlight Gotchas**
Call out non-obvious issues, workarounds, and things that might trip up newcomers.

### 5. **Structure for Scanning**
Use clear headers, bullet points, and code blocks to make information easy to find.

## 📊 What Makes a Great CLAUDE.md?

### Essential Sections
- ✅ Project overview and purpose
- ✅ Technology stack
- ✅ Project structure
- ✅ Development setup
- ✅ Common commands
- ✅ Coding conventions
- ✅ Testing approach
- ✅ Deployment process

### Advanced Sections
- 🚀 Architecture decisions
- 🚀 Performance considerations
- 🚀 Security requirements
- 🚀 Team workflows
- 🚀 Integration points
- 🚀 Monitoring and debugging

## 🎯 Common Use Cases

### New Project Setup
```markdown
# Quick Project Setup

1. Clone: `git clone <repo>`
2. Install: `npm install`
3. Configure: `cp .env.example .env`
4. Database: `npm run db:setup`
5. Start: `npm run dev`

Ready at http://localhost:3000
```

### API Documentation
```markdown
## API Endpoints

All endpoints require Bearer token authentication.

### User Management
- GET /api/users - List all users
- GET /api/users/:id - Get single user
- POST /api/users - Create user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

See /docs/api for full documentation.
```

### Debugging Guide
```markdown
## Common Issues

### "Module not found"
- Run: `npm install`
- Clear cache: `rm -rf node_modules/.cache`
- Restart dev server

### "Database connection failed"
- Check: `.env` has correct DATABASE_URL
- Ensure: PostgreSQL is running
- Run: `npm run db:migrate`
```

## 🔧 Tools & Integration

### VS Code Extension
Consider using snippets for common patterns:

```json
{
  "CLAUDE.md Section": {
    "prefix": "claude-section",
    "body": [
      "## ${1:Section Name}",
      "",
      "${2:Description}",
      "",
      "```${3:language}",
      "${4:code}",
      "```"
    ]
  }
}
```

### Validation Script
Create a script to validate your CLAUDE.md:

```bash
#!/bin/bash
# validate-claude-md.sh

echo "Validating CLAUDE.md..."

# Check file exists
if [ ! -f "CLAUDE.md" ]; then
  echo "❌ CLAUDE.md not found"
  exit 1
fi

# Check minimum sections
for section in "Project" "Quick Start" "Structure" "Commands"; do
  if ! grep -q "## .*$section" CLAUDE.md; then
    echo "⚠️  Missing section: $section"
  fi
done

echo "✅ Validation complete"
```

## 📈 Evolution Strategy

### Starting Small
Begin with basics:
1. Project description
2. Setup instructions
3. Key commands
4. Important notes

### Growing Project
Add as needed:
1. Architecture documentation
2. API references
3. Deployment guides
4. Team processes

### Mature Project
Comprehensive coverage:
1. Decision records
2. Performance guides
3. Security policies
4. Contribution guidelines

## 🤝 Contributing

Have a great CLAUDE.md pattern? Share it!

1. Create your template
2. Add real-world examples
3. Document the use case
4. Submit a PR

## 📚 Additional Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Markdown Guide](https://www.markdownguide.org/)
- [Documentation Best Practices](https://www.writethedocs.org/guide/)
- [Community Examples](https://github.com/claude-code-hub/claude-md-examples)

---

Remember: A good CLAUDE.md is like a good README - it saves more time than it takes to write! 🚀