# 🔐 Security Best Practices for Claude Code Hub

**Last Updated:** August 4, 2025  
**Priority Level:** CRITICAL  

---

## 🚨 Critical Security Rules

### 1. **NEVER Commit API Keys or Tokens**
- ❌ Do NOT include actual API keys in any files tracked by git
- ❌ Do NOT commit `.env` files containing secrets
- ❌ Do NOT hardcode tokens in configuration files
- ✅ Use environment variables for all sensitive data

### 2. **Token Management**
```bash
# ✅ CORRECT: Environment variable reference
"GITHUB_TOKEN": "$GITHUB_TOKEN"

# ❌ WRONG: Hardcoded token
"GITHUB_TOKEN": "ghp_actualtoken123456"
```

### 3. **File Security Patterns**
Always add these to your `.gitignore`:
```gitignore
# API Keys and Secrets
.env
.env.local
.env.production
.env.staging
*.pem
*.key
*.secret

# Claude Code specific
.claude/.env
.claude/settings.local.json
claude-settings.json

# Logs that might contain sensitive data
*.log
logs/
.npm
.DS_Store
```

---

## 🔧 Secure Configuration Guide

### 1. **Settings.json Security**

**✅ Secure Configuration:**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_TOKEN",
        "GITHUB_USERNAME": "$GITHUB_USERNAME"
      }
    }
  }
}
```

**❌ Insecure Configuration:**
```json
{
  "mcpServers": {
    "github": {
      "env": {
        "GITHUB_TOKEN": "ghp_actualtoken123456"
      }
    }
  }
}
```

### 2. **Environment File Setup**

Create `.claude/.env` (and add to .gitignore):
```bash
# API Keys - Replace with your actual keys
ANTHROPIC_API_KEY=your_claude_api_key
GITHUB_TOKEN=your_github_personal_access_token
PERPLEXITY_API_KEY=your_perplexity_key

# Optional: GitHub Configuration
GITHUB_USERNAME=your_username
GITHUB_DEFAULT_ORG=your_organization
```

### 3. **Token Scope Limitations**
When creating GitHub tokens, use minimal required scopes:
- `repo` (only if you need full repository access)
- `public_repo` (for public repositories only)
- `read:org` (if you need organization access)
- ❌ Avoid `admin:org`, `delete_repo` unless absolutely necessary

---

## 🔒 Development Security Checklist

### Before Each Commit:
- [ ] Check for hardcoded API keys (`git diff --staged | grep -i "key\|token\|secret"`)
- [ ] Verify `.env` files are in `.gitignore`
- [ ] Ensure no sensitive data in configuration files
- [ ] Review commit diff for any exposed credentials

### Regular Security Maintenance:
- [ ] Rotate API tokens monthly
- [ ] Review and revoke unused tokens
- [ ] Audit repository access permissions
- [ ] Update dependencies regularly
- [ ] Monitor for leaked credentials (GitHub security alerts)

### Repository Setup:
- [ ] Configure branch protection rules
- [ ] Enable secret scanning (GitHub)
- [ ] Set up security policies
- [ ] Configure dependabot for security updates

---

## 🛡️ MCP Server Security

### 1. **Server Package Verification**
- Only use official MCP packages from trusted sources
- Verify package names before installation:
  - ✅ `@modelcontextprotocol/server-github`
  - ✅ `server-perplexity-ask`
  - ❌ Avoid unknown or unofficial packages

### 2. **Network Security**
```json
{
  "mcpServers": {
    "secure-server": {
      "command": "npx",
      "args": ["-y", "official-package-name"],
      "env": {
        "API_URL": "https://api.example.com",
        "TIMEOUT": "30000",
        "RATE_LIMIT": "100"
      }
    }
  }
}
```

### 3. **Environment Isolation**
- Use separate API keys for development/production
- Limit server access to required resources only
- Implement proper error handling to avoid data leaks

---

## 🚨 Incident Response

### If You Accidentally Commit Secrets:

#### Immediate Actions (Within 5 minutes):
1. **Revoke the exposed token immediately**
   - GitHub: https://github.com/settings/tokens
   - Other services: Check respective settings

2. **Remove from git history:**
   ```bash
   # For recent commits
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch path/to/file' \
   --prune-empty --tag-name-filter cat -- --all
   
   # Force push (BE CAREFUL)
   git push origin --force --all
   ```

3. **Generate new credentials**
4. **Update local configuration with new credentials**
5. **Audit all systems that used the compromised token**

#### Follow-up Actions (Within 24 hours):
- Review access logs for suspicious activity
- Update security procedures to prevent recurrence
- Document the incident and lessons learned
- Consider security training for team members

---

## 📋 Security Audit Checklist

### Monthly Security Review:
- [ ] Audit all active API tokens and their permissions
- [ ] Review repository access and collaborator permissions
- [ ] Check for any hardcoded secrets in codebase
- [ ] Verify .gitignore patterns are working correctly
- [ ] Update dependencies with security patches
- [ ] Review MCP server configurations

### New Team Member Onboarding:
- [ ] Security training completed
- [ ] Personal access tokens created with minimal scopes
- [ ] Environment setup reviewed and verified secure
- [ ] Understanding of git security practices confirmed
- [ ] Access to security documentation provided

---

## 🔧 Security Tools and Monitoring

### Recommended Tools:
1. **git-secrets**: Prevent committing secrets
   ```bash
   pip install git-secrets
   git secrets --install
   git secrets --register-aws
   ```

2. **GitHub Security Features**:
   - Enable secret scanning
   - Configure security advisories
   - Set up Dependabot alerts

3. **Pre-commit Hooks**:
   ```yaml
   repos:
   - repo: https://github.com/Yelp/detect-secrets
     rev: v1.4.0
     hooks:
     - id: detect-secrets
   ```

### Monitoring:
- Set up alerts for new repository access
- Monitor for unusual API usage patterns
- Regular security dependency updates
- Automated security scanning in CI/CD

---

## 📞 Security Contact Information

### For Security Issues:
- **Internal Team**: [team-security@company.com]
- **GitHub Security**: security@github.com
- **Anthropic Security**: security@anthropic.com

### Emergency Response:
1. Immediately revoke compromised credentials
2. Contact security team
3. Document incident details
4. Follow incident response procedures

---

## 📚 Additional Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Anthropic Security Documentation](https://docs.anthropic.com/security)
- [MCP Security Guidelines](https://github.com/modelcontextprotocol/specification)

---

**Remember: Security is everyone's responsibility. When in doubt, ask the security team!**

*This document should be reviewed and updated quarterly to reflect new threats and best practices.*