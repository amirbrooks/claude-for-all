# 📅 Daily Routines

> Optimize your daily development workflow with Claude Code automation

## 📖 Overview

Daily routines are the foundation of productive development. By automating repetitive tasks and creating consistent patterns, you can focus on high-value work while ensuring nothing important falls through the cracks.

## ⏰ Morning Startup Routine

### The 5-Minute Developer Kickstart

```bash
claude "Start my day:
1. Check overnight CI/CD results across all repos
2. Review pull requests awaiting my attention  
3. Scan for critical issues or alerts
4. Generate today's priority task list
5. Show calendar for context switching
6. Create daily focus plan"
```

**Expected Output:**
```markdown
# Daily Kickstart - 2024-01-15

## 🚨 Urgent Items
- CI failure in project-api (main branch)
- 2 PRs need review (project-web, project-mobile)
- 1 critical bug report from yesterday

## 📋 Today's Priorities
1. Fix CI failure (est. 30 min) 
2. Review PR #234 and #235 (est. 45 min)
3. Implement user authentication feature (est. 4 hours)
4. Update API documentation (est. 1 hour)

## 📅 Context Switches
- 10:00 AM: Team standup
- 2:00 PM: Client call
- 4:00 PM: Architecture review

## 🎯 Focus Blocks
- 9:00-10:00: PR reviews and CI fix
- 10:30-12:30: Deep work on authentication
- 1:00-2:00: Documentation updates
- 2:30-4:00: Feature implementation continued
```

### Extended Morning Analysis

For complex projects, use a more comprehensive startup:

```bash
claude "Comprehensive morning analysis:
1. Git status across all active projects
2. Check CI/CD pipeline health
3. Review overnight automated test results
4. Scan security alerts and dependency updates
5. Analyze recent performance metrics
6. Review customer support tickets
7. Check team communication channels
8. Generate cross-project dependency map
9. Identify blockers and risks
10. Create optimized daily schedule"
```

## 🏃‍♂️ Sprint Planning Routine

### Weekly Sprint Kickoff

```bash
claude "Plan this week's sprint:
1. Review last sprint's velocity and completion rate
2. Analyze backlog priorities
3. Estimate effort for top items
4. Check team availability and capacity
5. Identify dependencies and risks
6. Create sprint backlog
7. Generate team communication
8. Set up tracking and metrics"
```

### Daily Sprint Check-in

```bash
claude "Daily sprint status:
1. Compare actual vs planned progress
2. Identify blockers and impediments
3. Update burndown metrics
4. Flag at-risk deliverables
5. Suggest schedule adjustments
6. Generate standup talking points"
```

## 🔄 Mid-Day Check-in Routine

### The Focus Reset

```bash
claude "Mid-day productivity check:
1. Review morning's accomplishments
2. Assess remaining time vs pending tasks
3. Identify energy level and mental state
4. Suggest break or task switching
5. Reprioritize afternoon work
6. Set realistic expectations for day's end"
```

### Context Switching Helper

```bash
claude "Help me switch contexts:
FROM: [current task/project]
TO: [new task/project]

1. Save current state and progress
2. Create handoff notes
3. Set up environment for new context
4. Load relevant documentation
5. Set timer for focused work session"
```

## 🌅 Code Review Routine

### Smart Review Workflow

```bash
claude "Review PR #{{number}}:
1. Analyze changed files and line count
2. Check for breaking changes
3. Verify test coverage
4. Run security analysis
5. Check coding standards compliance
6. Look for performance implications
7. Generate constructive feedback
8. Suggest improvements with examples
9. Approve or request changes with rationale"
```

### Batch Review Session

```bash
claude "Batch review all pending PRs:
1. Prioritize by impact and urgency
2. For each PR:
   - Quick complexity assessment
   - Security scan
   - Test coverage check
   - Generate review comments
3. Create summary report
4. Notify authors with feedback"
```

## 🧪 Testing Routine

### Comprehensive Test Workflow

```bash
claude "Run complete test suite:
1. Unit tests with coverage report
2. Integration tests
3. End-to-end tests
4. Performance benchmarks
5. Security scans
6. Accessibility checks
7. Generate consolidated report
8. Identify and flag failures
9. Suggest fixes for failing tests"
```

### Test-Driven Development Helper

```bash
claude "TDD cycle for [feature]:
1. Write failing test first
2. Implement minimal code to pass
3. Refactor for quality
4. Run full test suite
5. Update documentation
6. Commit with descriptive message"
```

## 📊 Progress Tracking Routine

### Daily Metrics Collection

```bash
claude "Collect today's development metrics:
1. Lines of code written/modified
2. Tests added/updated
3. Bugs fixed
4. Features completed
5. Code reviews done
6. Documentation updated
7. Time spent by category
8. Generate trend analysis"
```

### Weekly Performance Review

```bash
claude "Weekly performance analysis:
1. Aggregate daily metrics
2. Compare to previous weeks
3. Identify productivity patterns
4. Highlight achievements
5. Note areas for improvement
6. Set goals for next week
7. Generate team sharing summary"
```

## 🏁 End-of-Day Routine

### The Developer's Wrap-Up

```bash
claude "End my development day:
1. Save all work in progress
2. Commit staged changes with good messages
3. Push to remote repositories
4. Update task statuses
5. Log time spent on different activities
6. Note any blockers for tomorrow
7. Plan first task for tomorrow
8. Clean up workspace and browser tabs"
```

### Knowledge Capture

```bash
claude "Capture today's learnings:
1. What new things did I learn?
2. What problems did I solve?
3. What techniques worked well?
4. What should I do differently?
5. Any useful code snippets to save?
6. Documentation that needs updating?
7. Ideas for future improvements?"
```

## 🚨 Crisis Management Routine

### Production Issue Response

```bash
claude "Handle production incident:
1. Assess severity and impact
2. Notify stakeholders
3. Create incident tracking ticket
4. Gather diagnostic information
5. Identify root cause
6. Implement hotfix or rollback
7. Verify resolution
8. Document incident and lessons learned
9. Schedule post-mortem if needed"
```

### Bug Triage Workflow

```bash
claude "Triage new bug reports:
1. Reproduce the issue
2. Assess severity and priority
3. Identify affected components
4. Estimate fix complexity
5. Assign to appropriate developer
6. Update stakeholders
7. Add to sprint backlog if urgent"
```

## 🎯 Focus Enhancement Routines

### Deep Work Session Setup

```bash
claude "Prepare for deep work session:
1. Block distractions (notifications, chat)
2. Set clear session goal
3. Gather all necessary resources
4. Set timer for focused work
5. Create progress tracking method
6. Plan mini-breaks
7. Define 'done' criteria"
```

### Flow State Optimizer

```bash
claude "Optimize for flow state:
1. Analyze current energy level
2. Assess task difficulty vs skill level
3. Eliminate distractions
4. Set appropriate challenge level
5. Create immediate feedback loop
6. Start with small wins
7. Build momentum gradually"
```

## 🤝 Team Coordination Routines

### Standup Preparation

```bash
claude "Prepare for team standup:
1. Yesterday's accomplishments
2. Today's planned work
3. Current blockers and impediments
4. Help needed from teammates
5. Updates affecting others
6. Time-boxed talking points"
```

### Team Communication Digest

```bash
claude "Generate team communication summary:
1. Scan Slack/Discord channels
2. Review email threads
3. Check project management updates
4. Identify action items for me
5. Note important decisions made
6. Flag questions needing response"
```

## 📈 Continuous Improvement Routines

### Weekly Retrospective

```bash
claude "Personal weekly retrospective:
1. What went well this week?
2. What could be improved?
3. What did I learn?
4. What slowed me down?
5. What tools/processes helped?
6. Goals for next week
7. One thing to experiment with"
```

### Skill Development Check

```bash
claude "Assess skill development:
1. Review learning goals progress
2. Identify knowledge gaps
3. Find relevant resources
4. Plan learning activities
5. Schedule skill practice
6. Track competency improvements"
```

## 🛠️ Tool Maintenance Routines

### Development Environment Health Check

```bash
claude "Check development environment:
1. Update package dependencies
2. Clean up unused files/packages
3. Backup important configurations
4. Check disk space and memory
5. Update development tools
6. Verify all integrations working
7. Document any changes made"
```

### Repository Maintenance

```bash
claude "Maintain code repositories:
1. Clean up merged branches
2. Update README and documentation
3. Check for security vulnerabilities
4. Update dependencies safely
5. Run housekeeping scripts
6. Archive completed projects
7. Organize issues and PRs"
```

## 📱 Mobile/Remote Work Routines

### Remote Work Startup

```bash
claude "Remote work day setup:
1. Check internet connectivity and speed
2. Test video call setup
3. Review shared calendar
4. Sync files from company systems
5. Check VPN connection
6. Set up proper workspace
7. Communicate availability to team"
```

### Mobile Development Check

```bash
claude "Quick mobile development check:
1. Review overnight build results
2. Check app store feedback
3. Monitor crash reports
4. Test critical user flows
5. Review performance metrics
6. Check for urgent issues"
```

## 🔄 Routine Customization

### Creating Your Personal Routine

1. **Identify Your Patterns**
   - When are you most productive?
   - What tasks do you repeat daily?
   - Where do you typically get stuck?

2. **Start Small**
   ```bash
   claude "Simple daily start:
   1. Check git status
   2. Review TODOs
   3. Plan top 3 tasks"
   ```

3. **Expand Gradually**
   - Add more checks
   - Include team coordination
   - Integrate with your tools

4. **Measure and Adjust**
   - Track routine effectiveness
   - Adjust based on results
   - Remove what doesn't help

### Routine Templates

#### For Frontend Developers
```bash
claude "Frontend developer daily routine:
1. Check browser compatibility tests
2. Review design system updates
3. Test responsive layouts
4. Check bundle size metrics
5. Review accessibility reports
6. Update component library"
```

#### For Backend Developers
```bash
claude "Backend developer daily routine:
1. Check API performance metrics
2. Review database query performance
3. Monitor error rates and logs
4. Check security scan results
5. Review API documentation
6. Test critical endpoints"
```

#### For Full-Stack Developers
```bash
claude "Full-stack developer daily routine:
1. Check entire application health
2. Review frontend and backend metrics
3. Test integration points
4. Monitor user feedback
5. Check deployment pipelines
6. Review cross-functional changes"
```

## 📊 Routine Optimization

### Measuring Routine Effectiveness

Track these metrics:
- Time saved per day
- Tasks completed consistently
- Issues caught early
- Quality improvements
- Stress reduction

### Continuous Improvement

```bash
claude "Optimize my daily routine:
1. Analyze time spent on each step
2. Identify redundant activities
3. Find automation opportunities
4. Streamline decision points
5. Reduce context switching
6. Improve tool integrations"
```

## 🚀 Advanced Routine Patterns

### Adaptive Routines

```bash
claude "Create adaptive routine based on context:
IF Monday:
  - Weekly planning focus
IF Friday:
  - Week wrap-up and cleanup
IF high-pressure sprint:
  - Minimal routine, focus on delivery
IF maintenance week:
  - Extended cleanup and documentation"
```

### Intelligent Scheduling

```bash
claude "Smart schedule optimization:
1. Analyze my productivity patterns
2. Align routine with energy levels
3. Account for meeting schedules
4. Buffer time for interruptions
5. Suggest optimal task ordering
6. Plan breaks and context switches"
```

## 📚 Resources

- [Custom Commands](custom-commands/) - Specific routine implementations
- [Automation Patterns](automation-patterns.md) - Building blocks for routines
- [Team Collaboration](team-collaboration.md) - Multi-person workflows
- [Community Routines](https://github.com/claude-code-hub/routines) - Shared examples

---

Build routines that work for you and watch your productivity soar! 🚀