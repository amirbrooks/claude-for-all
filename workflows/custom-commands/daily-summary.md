# Daily Summary Command

```yaml
---
description: "Generate comprehensive daily development summary"
allowed-tools: ["Read", "LS", "Write", "Glob", "Grep", "Bash"]
tags: ["daily", "productivity", "tracking"]
version: "1.0"
author: "claude-code-hub"
---
```

Create a comprehensive daily summary for your development workspace. This command scans your project activity and generates an organized report of your accomplishments and progress.

## What This Command Does

1. **Scans Project Activity** - Reviews modified files, commits, and work completed today
2. **Analyzes Progress** - Tracks task completion and project milestones  
3. **Identifies Next Steps** - Highlights pending work and priorities for tomorrow
4. **Generates Report** - Creates a formatted daily summary with actionable insights

## Command Instructions

Generate a comprehensive daily summary by following these steps:

### 1. **Scan Today's Activity**
- Check git repositories for today's commits
- Review modified files in current workspace
- Look for completed tasks in project management files
- Scan for new issues or bugs addressed

### 2. **Analyze Development Progress**
- Identify features completed or advanced
- Track code review participation
- Note testing activities and results
- Document any architecture or design decisions

### 3. **Review Client/Project Updates**
- Check for client communications
- Review project milestone progress
- Note any deliverables completed
- Identify upcoming deadlines

### 4. **Capture Learning and Insights**
- Document new techniques learned
- Note problems solved and solutions found
- Record useful code snippets or patterns
- Identify areas for improvement

### 5. **Generate Daily Summary Report**

Create a new file with today's date using this structure:

```markdown
# Daily Summary - {{date:YYYY-MM-DD}}

## 🎯 Accomplishments
- [List key tasks completed today]
- [Features implemented or bugs fixed]
- [Code reviews completed]
- [Documentation updated]

## 💻 Development Activity
- **Commits**: X commits across Y repositories
- **Lines Changed**: +X additions, -Y deletions
- **Files Modified**: [Key files worked on]
- **Tests**: [Tests written or updated]

## 👥 Collaboration
- [Pull requests reviewed]
- [Team discussions participated in]
- [Knowledge shared or received]
- [Pair programming sessions]

## 🧠 Learning & Insights
- [New concepts or techniques learned]
- [Problems solved and how]
- [Useful resources discovered]
- [Patterns or best practices identified]

## 📊 Metrics
- Productive hours: X
- Context switches: X
- Meetings: X hours
- Deep work blocks: X

## 🔄 Tomorrow's Focus
### Top 3 Priorities
1. [Most important task]
2. [Second priority]
3. [Third priority]

### Pending Items
- [Tasks to carry over]
- [Blockers to resolve]
- [Follow-ups needed]

### Scheduled Activities
- [Meetings and calls]
- [Deadlines approaching]
- [Planned deep work sessions]

## 💡 Ideas & Notes
- [Random thoughts or ideas captured]
- [Potential improvements identified]  
- [Future features to consider]

---
*Generated on {{date}} at {{time}}*
```

### 6. **Update Project Dashboards**
- Update main project dashboard with today's highlights
- Add any new tasks or issues discovered
- Update progress on current milestones
- Note any risks or blockers identified

## Configuration Options

### File Location
By default, saves to `daily-summaries/YYYY-MM-DD-summary.md`. Customize by changing:
```markdown
Generate summary file in: `reports/daily/{{date}}.md`
```

### Include/Exclude Sections
Remove sections not relevant to your workflow:
```markdown
# Skip client section for internal projects
## 👥 Collaboration
[Only include if working on team projects]
```

### Custom Metrics
Add your specific tracking needs:
```markdown
## 📊 Custom Metrics
- Story points completed: X
- Bug fixes: X
- Feature progress: X%
- Technical debt addressed: X hours
```

## Integration Examples

### With Git
```bash
# Include git statistics
git log --since="yesterday" --oneline --author="your-email"
git diff --stat HEAD~1
```

### With Task Management
```markdown
# Scan for completed tasks
- Check TODO.md for checked items
- Review project management tool updates
- Note sprint progress
```

### With Time Tracking
```markdown
# Include time analysis
- Development: X hours
- Meetings: X hours  
- Code review: X hours
- Learning: X hours
```

## Automation Tips

### Schedule Regular Execution
```bash
# Run automatically at end of workday
crontab -e
0 17 * * * claude "/daily-summary"
```

### Chain with Other Commands
```bash
# Complete daily workflow
claude "/daily-summary" && claude "/quick-capture tomorrow's priorities"
```

### Integration with Team Tools
```markdown
Also send summary to:
- Team Slack channel
- Project management system
- Personal tracking spreadsheet
```

## Sample Output

```markdown
# Daily Summary - 2024-01-15

## 🎯 Accomplishments
- Fixed authentication bug in user login flow
- Completed code review for mobile app PR #234
- Updated API documentation for v2.1 endpoints
- Resolved 3 customer support tickets

## 💻 Development Activity
- **Commits**: 5 commits across 2 repositories
- **Lines Changed**: +127 additions, -43 deletions
- **Files Modified**: auth.js, login.tsx, api-docs.md
- **Tests**: Added 8 unit tests for auth module

## 👥 Collaboration
- Reviewed PR #234 for mobile team
- Mentored junior developer on async/await patterns
- Participated in architecture discussion for new feature
- Shared debugging technique in team channel

## 🧠 Learning & Insights
- Learned about JWT refresh token patterns
- Discovered useCallback optimization for React performance
- Found better error handling approach for async operations
- Identified opportunity to refactor common auth logic

## 📊 Metrics
- Productive hours: 6.5
- Context switches: 4
- Meetings: 1.5 hours
- Deep work blocks: 2

## 🔄 Tomorrow's Focus
### Top 3 Priorities
1. Implement refresh token rotation
2. Review and merge pending PRs
3. Start work on user permissions system

### Pending Items
- Follow up on database performance issue
- Update deployment documentation
- Schedule code review for new API endpoints

### Scheduled Activities
- 10:00 AM: Sprint planning meeting
- 2:00 PM: Client demo
- 4:00 PM: 1-on-1 with manager

## 💡 Ideas & Notes
- Consider implementing automated testing for auth flows
- Research better state management patterns for large forms
- Evaluate new monitoring tools for production systems

---
*Generated on 2024-01-15 at 17:30*
```

## Customization Examples

### For Different Roles

#### Frontend Developer
```markdown
## 🎨 UI/UX Work
- Components created/updated
- Design system changes
- Accessibility improvements
- Browser compatibility fixes

## 📱 Performance & Optimization
- Bundle size changes
- Load time improvements
- SEO optimizations
- Core Web Vitals impact
```

#### Backend Developer  
```markdown
## 🔧 API Development
- Endpoints created/modified
- Database schema changes
- Performance optimizations
- Security improvements

## 📊 Infrastructure
- Deployment updates
- Monitoring improvements
- Scaling considerations
- DevOps automation
```

#### Full-Stack Developer
```markdown
## 🌐 Full-Stack Progress
- Frontend features completed
- Backend integrations
- Database migrations
- End-to-end testing

## 🔄 System Integration
- API contract updates
- Cross-team coordination
- Performance bottlenecks
- Architecture decisions
```

## Troubleshooting

### Common Issues

**Command takes too long to run:**
- Limit file scanning scope
- Skip large directories
- Focus on recent changes only

**Missing information in summary:**
- Check file permissions
- Verify git configuration
- Ensure proper directory structure

**Output format issues:**
- Verify markdown syntax
- Check template variables
- Ensure proper file encoding

## Related Commands

- **[weekly-review.md](weekly-review.md)** - Weekly retrospective
- **[project-reporting.md](project-reporting.md)** - Project status reports
- **[quick-capture.md](quick-capture.md)** - Quick note taking

---

*Use this command daily to track progress and maintain momentum!*