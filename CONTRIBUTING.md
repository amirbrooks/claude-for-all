# 🤝 Contributing to Claude for All

First off, thank you for contributing to Claude for All! This community repository serves developers worldwide by sharing Claude Code resources, guides, and best practices.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community Subagent Guidelines](#community-subagent-guidelines)
- [Recognition](#recognition)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code:

- 🤝 Be respectful and inclusive
- 💡 Welcome newcomers and help them get started
- 🎯 Focus on what is best for the community
- 🌟 Show empathy towards other community members

## 🎯 How Can I Contribute?

### 1. 📝 Documentation Improvements
- Fix typos or clarify existing documentation
- Add missing examples or use cases
- Translate documentation to other languages
- Improve installation guides for specific platforms

### 2. 🤖 Subagent Contributions
- Submit new subagent examples
- Improve existing subagents
- Add tests for subagents
- Create industry-specific subagents

### 3. 🐛 Bug Reports & Fixes
- Report issues with examples
- Fix broken links or code snippets
- Update outdated information
- Improve error handling in examples

### 4. ✨ New Features
- Add new MCP server examples
- Create workflow templates
- Develop Docker configurations
- Build automation scripts

### 5. 📹 Educational Content
- Create video tutorials
- Write blog posts
- Design infographics
- Record screencasts

## 🚀 Getting Started

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/amirbrooks/claude-for-all.git
   cd claude-for-all
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

3. **Make Your Changes**
   - Follow the style guidelines below
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new subagent for database operations"
   # or
   git commit -m "fix: correct installation steps for Windows"
   ```

## 📤 Pull Request Process

1. **Before Submitting**
   - [ ] Test your changes with Claude Code
   - [ ] Update relevant documentation
   - [ ] Add your contribution to the appropriate section
   - [ ] Check for any breaking changes

2. **PR Title Format**
   Use conventional commits format:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation only
   - `style:` Formatting changes
   - `refactor:` Code restructuring
   - `test:` Adding tests
   - `chore:` Maintenance

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of the changes

   ## Type of Change
   - [ ] Documentation update
   - [ ] New subagent
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change

   ## Testing
   - [ ] Tested with Claude Code version: X.X.X
   - [ ] Platform tested on: macOS/Windows/Linux

   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented my code where necessary
   - [ ] I have updated the documentation
   - [ ] My changes generate no new warnings
   ```

4. **Review Process**
   - A maintainer will review your PR within 2-3 days
   - Address any feedback or requested changes
   - Once approved, your PR will be merged

## 📐 Style Guidelines

### Markdown Files
- Use clear, descriptive headings
- Include code examples with syntax highlighting
- Add table of contents for long documents
- Use emoji sparingly and consistently

### Code Examples
```yaml
# Good: Clear and well-documented
---
name: example-agent
description: Handles example tasks. PROACTIVELY used for demonstrations.
tools: Read, Write, Bash
---

You are an example agent that demonstrates best practices...
```

### File Naming
- Use kebab-case: `my-awesome-subagent.md`
- Be descriptive: `docker-ubuntu-setup.md` not `setup.md`
- Include platform/version when relevant

## 🤖 Community Subagent Guidelines

When submitting a new subagent:

1. **Structure**
   ```yaml
   ---
   name: your-agent-name
   description: Clear description. Mention if PROACTIVE.
   tools: List, Only, Needed, Tools
   author: @yourgithubusername
   version: 1.0.0
   tested_with: claude-code@2.0.0
   ---
   
   [Your agent prompt here]
   ```

2. **Documentation**
   Create a companion `.md` file with:
   - Use cases and examples
   - Expected inputs/outputs
   - Performance considerations
   - Known limitations

3. **Testing**
   - Provide test scenarios
   - Include example prompts
   - Document edge cases

## 🏆 Recognition

### Contributors Wall of Fame
All contributors are automatically added to our [Contributors](README.md#contributors) section.

### Contribution Levels
- 🌱 **Seedling**: First contribution
- 🌿 **Sprout**: 5+ contributions
- 🌳 **Tree**: 10+ contributions
- 🌲 **Forest**: 25+ contributions
- 🏔️ **Mountain**: 50+ contributions

### Special Recognition
- **Subagent of the Month**: Featured in README
- **Top Contributor**: Special badge and mention
- **Documentation Hero**: For significant docs improvements

## 💬 Getting Help

- 💭 [GitHub Discussions](https://github.com/amirbrooks/claude-for-all/discussions) - Ask questions
- 🐛 [Issue Tracker](https://github.com/amirbrooks/claude-for-all/issues) - Report bugs or request features
- 📖 [Documentation](README.md) - Comprehensive guides and examples

## 🙏 Thank You!

Your contributions make Claude Code Hub an amazing resource for everyone. Whether it's fixing a typo or contributing a complex workflow, every contribution counts!

---

Happy Contributing! 🚀