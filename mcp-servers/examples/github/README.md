# 🐙 GitHub MCP Server

> Complete GitHub integration for Claude Code - manage repositories, issues, PRs, and more

## 📖 Overview

The GitHub MCP server provides Claude Code with full access to GitHub's API, enabling:

- 📁 **Repository Management**: Create, clone, update repositories
- 🐛 **Issue Tracking**: Create, update, close issues
- 🔄 **Pull Requests**: Create, review, merge PRs
- 📊 **GitHub Actions**: Monitor and trigger workflows
- 👥 **Collaboration**: Manage teams and permissions
- 📈 **Analytics**: Access repository insights and statistics

## 🚀 Quick Start

### 1. Get GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (full repository access)
   - `workflow` (GitHub Actions)
   - `read:org` (organization access)
   - `gist` (optional, for gists)
4. Generate and copy token

### 2. Configure Environment

Add to `.claude/.env`:
```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=your-username
GITHUB_DEFAULT_ORG=your-org-name  # Optional
```

### 3. Add to Configuration

Update `.claude/settings.json`:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-custom"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_TOKEN"
      }
    }
  }
}
```

### 4. Test the Server

```bash
# Test authentication
claude "List my GitHub repositories"

# Test operations
claude "Create a new issue in myrepo with title 'Test Issue'"
```

## 📋 Configuration Options

### Basic Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-custom"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_TOKEN"
      }
    }
  }
}
```

### Advanced Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-custom"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_TOKEN",
        "GITHUB_API_URL": "https://api.github.com",  // Or GitHub Enterprise URL
        "GITHUB_USERNAME": "$GITHUB_USERNAME",
        "GITHUB_DEFAULT_ORG": "$GITHUB_DEFAULT_ORG",
        "GITHUB_DEFAULT_REPO": "$GITHUB_DEFAULT_REPO",
        "GITHUB_PER_PAGE": "100",  // Results per page
        "GITHUB_TIMEOUT": "30000"   // API timeout
      }
    }
  }
}
```

## 🎯 Common Use Cases

### 1. Repository Management

```bash
# List repositories
claude "List all my GitHub repositories with their descriptions"

# Create repository
claude "Create a new private repository called 'my-project' with a README"

# Clone repository
claude "Clone the repository username/repo to ./projects/"

# Update repository settings
claude "Make the repository 'my-project' public and add a description"
```

### 2. Issue Management

```bash
# Create issues
claude "Create an issue in myrepo titled 'Add dark mode support' with labels 'enhancement' and 'ui'"

# List issues
claude "Show all open issues in myrepo assigned to me"

# Update issues
claude "Close issue #42 in myrepo with comment 'Fixed in PR #45'"

# Bulk operations
claude "Label all issues in myrepo containing 'bug' with the 'needs-triage' label"
```

### 3. Pull Request Workflows

```bash
# Create PR
claude "Create a pull request from feature-branch to main with title 'Add new feature'"

# Review PRs
claude "List all open pull requests in myrepo that need my review"

# Merge PR
claude "Merge pull request #123 in myrepo using squash merge"

# PR templates
claude "Create a PR from current branch using our PR template"
```

### 4. GitHub Actions

```bash
# List workflows
claude "Show all GitHub Actions workflows in myrepo with their status"

# Trigger workflow
claude "Run the 'deploy' workflow on the main branch of myrepo"

# Check status
claude "Show the status of the latest deployment workflow run"

# Download artifacts
claude "Download artifacts from the latest successful build"
```

### 5. Collaboration

```bash
# Team management
claude "Add user 'contributor-name' as a collaborator to myrepo with write access"

# Code review
claude "Request review from teamlead and frontend-dev on PR #45"

# Notifications
claude "Show my GitHub notifications and mark them as read"

# Org management
claude "List all repositories in our organization with their visibility"
```

## 🔧 Advanced Usage

### Repository Operations

```bash
# Branch management
claude "Create a new branch 'feature/dark-mode' from main in myrepo"

claude "Protect the main branch in myrepo requiring 2 reviews and passing CI"

# Tags and releases
claude "Create a new release v1.2.0 in myrepo with changelog from commits"

claude "Tag the current commit as v1.2.0-beta.1"

# Repository templates
claude "Create a new repository from our template-repo for project-name"
```

### Search and Analytics

```bash
# Code search
claude "Search for 'TODO' comments in all JavaScript files in myrepo"

# Issue search
claude "Find all issues mentioning 'performance' created in the last month"

# Repository insights
claude "Show commit activity for myrepo over the last 30 days"

# Contributor stats
claude "List top 10 contributors to myrepo by commit count"
```

### Automation Examples

```bash
# Changelog generation
claude "Generate a changelog for myrepo between v1.0.0 and v1.1.0 grouped by type"

# Issue triage
claude "Auto-label issues in myrepo based on their title and description"

# PR automation
claude "Add size labels (S/M/L/XL) to all PRs based on lines changed"

# Stale issue management
claude "Find and comment on issues in myrepo with no activity for 30 days"
```

## 🛠️ Example Workflows

### Release Management

```bash
claude "Prepare release v2.0.0:
1. Create release branch from main
2. Update version in package.json
3. Generate changelog from commits
4. Create pull request to main
5. After merge, create GitHub release
6. Trigger deployment workflow"
```

### Issue Grooming

```bash
claude "Weekly issue grooming for myrepo:
1. Find issues without labels and suggest appropriate ones
2. Identify duplicate issues
3. Find stale issues (>60 days) and add comment
4. Assign priority labels based on reactions
5. Create summary report"
```

### PR Review Assistant

```bash
claude "Review PR #123:
1. Check if it has tests
2. Verify it updates documentation
3. Run linting checks
4. Check for breaking changes
5. Suggest reviewers based on changed files
6. Add appropriate labels"
```

### Project Board Management

```bash
claude "Update project board:
1. Move completed issues to 'Done' column
2. Add new issues to 'Backlog'
3. Prioritize 'To Do' column by labels
4. Archive completed cards older than 30 days
5. Generate sprint summary"
```

## 🐛 Troubleshooting

### Common Issues

**1. Authentication Failed**

```bash
# Verify token
echo $GITHUB_TOKEN

# Test token permissions
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check token scopes
claude "Show my GitHub token permissions"
```

**2. Rate Limit Exceeded**

```bash
# Check rate limit status
claude "Show my GitHub API rate limit status"

# Use conditional requests
claude "Only fetch issues if they've been updated since last check"

# Implement caching
claude "Cache repository data for 1 hour"
```

**3. Permission Denied**

```bash
# Check repository permissions
claude "Show my permissions for username/repo"

# Verify organization access
claude "List organizations I have access to"

# Check token scopes
claude "Verify my token has 'repo' scope"
```

**4. API Errors**

```bash
# Enable debug mode
export DEBUG=github:*

# Verbose error messages
claude --verbose "Create issue in myrepo"

# Check API status
claude "Check GitHub API status"
```

## ⚡ Performance Tips

### 1. Batch Operations

```javascript
// Process multiple items efficiently
const issues = await github.paginate(
  github.issues.listForRepo,
  { owner, repo, per_page: 100 }
);
```

### 2. Conditional Requests

```javascript
// Use ETags for caching
const response = await github.request('GET /repos/{owner}/{repo}', {
  owner,
  repo,
  headers: {
    'If-None-Match': etag
  }
});
```

### 3. GraphQL for Complex Queries

```graphql
query {
  repository(owner: "owner", name: "repo") {
    issues(first: 100, states: OPEN) {
      nodes {
        title
        labels(first: 10) {
          nodes { name }
        }
      }
    }
  }
}
```

### 4. Webhook Integration

```javascript
// Set up webhooks for real-time updates
await github.repos.createWebhook({
  owner,
  repo,
  config: {
    url: 'https://example.com/webhook',
    content_type: 'json'
  },
  events: ['issues', 'pull_request']
});
```

## 🔒 Security Best Practices

### 1. Token Management

```bash
# Use fine-grained tokens
claude "Create a fine-grained token with only 'issues' scope for myrepo"

# Rotate tokens regularly
claude "Generate a new token and update all configurations"

# Store securely
# Never commit tokens to repositories
# Use environment variables
# Consider secret management tools
```

### 2. Permission Principles

```javascript
// Minimum required permissions
const requiredScopes = ['repo:status', 'public_repo'];

// Validate before operations
if (!hasRequiredScopes(token, requiredScopes)) {
  throw new Error('Insufficient permissions');
}
```

### 3. Audit Logging

```bash
# Track all operations
claude "Show audit log of all GitHub operations performed today"

# Monitor suspicious activity
claude "Alert if any destructive operations are attempted"
```

## 🎨 Integration Examples

### CI/CD Integration

```bash
claude "On PR creation:
1. Run automated tests
2. Check code coverage
3. Verify documentation updates
4. Add status checks
5. Notify relevant reviewers"
```

### Project Management

```bash
claude "Sync GitHub issues with project management tool:
1. Export open issues to CSV
2. Map to project tasks
3. Update issue labels based on project status
4. Create progress report"
```

### Documentation Automation

```bash
claude "Generate API documentation:
1. Extract JSDoc comments from repository
2. Create markdown documentation
3. Update README with examples
4. Create PR with changes"
```

## 📊 Metrics and Reporting

### Repository Health

```javascript
// Calculate repository health score
const healthMetrics = {
  hasReadme: true,           // 10 points
  hasLicense: true,          // 10 points
  hasContributing: true,     // 5 points
  recentCommits: 45,         // 1 point per commit (max 20)
  openIssues: 12,            // -1 point per 10 issues
  prMergeTime: 2.5,          // days average
  codeOfConduct: true,       // 5 points
  topics: 5                  // 2 points per topic (max 10)
};
```

### Activity Tracking

```bash
# Weekly activity report
claude "Generate weekly GitHub activity report:
- Commits by author
- Issues created/closed
- PRs merged
- Code additions/deletions
- Active contributors"
```

## 🚀 Best Practices

1. **API Usage**
   - Cache responses when possible
   - Use pagination for large datasets
   - Implement exponential backoff
   - Monitor rate limits

2. **Automation**
   - Create reusable workflows
   - Use GitHub Actions for repetitive tasks
   - Implement proper error handling
   - Log all operations

3. **Collaboration**
   - Use clear commit messages
   - Follow PR templates
   - Add meaningful labels
   - Document automation rules

4. **Security**
   - Audit token usage
   - Use least privilege principle
   - Rotate credentials regularly
   - Monitor for anomalies

## 📚 Additional Resources

- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Best Practices Guide](https://docs.github.com/en/rest/guides/best-practices-for-integrators)

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [FAQ](../../../resources/faq.md)