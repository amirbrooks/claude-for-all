# 👥 Team Collaboration

> Enhance team productivity with shared Claude Code workflows

## 📖 Overview

Team collaboration with Claude Code goes beyond individual productivity. By creating shared workflows, establishing common patterns, and coordinating AI assistance across team members, you can dramatically improve team efficiency and code quality.

## 🎯 Team Workflow Patterns

### 1. Shared Command Library

Create a centralized repository of team commands:

```bash
# Team repository structure
team-claude-workflows/
├── .claude/
│   ├── commands/
│   │   ├── code-review.md
│   │   ├── standup-prep.md
│   │   ├── documentation.md
│   │   └── incident-response.md
│   └── settings.json
├── templates/
├── docs/
└── README.md
```

**Team Command Example:**
```yaml
---
description: "Standardized code review for team"
allowed-tools: ["Read", "Write", "Grep", "Bash"]
author: "team-lead"
version: "1.0"
---

Perform team-standard code review:
1. Check adherence to team coding standards
2. Verify test coverage meets 80% threshold
3. Run security scan with team-approved tools
4. Check for proper documentation
5. Validate commit message format
6. Generate standardized review report
```

### 2. Coordinated Development Workflows

#### Sprint Planning Automation

```bash
claude "Team sprint planning:
1. Aggregate individual capacity from team
2. Review backlog priorities
3. Identify cross-team dependencies
4. Estimate story points using team velocity
5. Flag potential blockers
6. Generate sprint board
7. Create team communication digest
8. Schedule necessary sync meetings"
```

#### Feature Branch Coordination

```bash
claude "Coordinate feature branch [branch-name]:
1. Check for merge conflicts with main
2. Identify overlapping changes with team
3. Run integration tests
4. Notify affected team members
5. Schedule code review assignments
6. Update feature documentation
7. Plan merge strategy"
```

### 3. Knowledge Sharing Workflows

#### Team Learning Sessions

```bash
claude "Prepare team learning session on [topic]:
1. Research latest developments
2. Find relevant examples from our codebase
3. Create hands-on exercises
4. Prepare discussion questions
5. Generate resource list
6. Schedule session and send invites
7. Create follow-up action items"
```

#### Code Pattern Documentation

```bash
claude "Document team coding pattern:
1. Analyze usage across codebase
2. Extract common implementation
3. Create reusable template
4. Generate usage examples
5. Document do's and don'ts
6. Add to team style guide
7. Create onboarding materials"
```

## 🔄 Collaborative Code Review

### Smart Review Assignment

```bash
claude "Assign optimal code reviewers for PR #[number]:
1. Analyze changed files and components
2. Identify team members with relevant expertise
3. Check reviewer availability and workload
4. Consider knowledge distribution goals
5. Factor in time zones for remote teams
6. Assign primary and secondary reviewers
7. Set appropriate review deadlines
8. Notify assignees with context"
```

### Review Quality Assurance

```yaml
---
description: "Ensure consistent review quality across team"
allowed-tools: ["Read", "Grep", "Write"]
---

Review PR review quality:
1. Check if all review criteria were addressed
2. Verify constructive feedback provided
3. Ensure security aspects were considered
4. Confirm performance implications reviewed
5. Check for knowledge sharing opportunities
6. Generate reviewer performance metrics
7. Suggest improvements for future reviews
```

### Automated Review Preparation

```bash
claude "Prepare comprehensive review package:
1. Generate PR summary with context
2. Highlight architectural decisions
3. List potential impact areas
4. Include relevant documentation links
5. Create testing checklist
6. Generate review guidelines specific to changes
7. Set up parallel review tracks for large PRs"
```

## 🎪 Standup and Meeting Automation

### Smart Standup Preparation

```bash
claude "Generate team standup digest:
1. Collect yesterday's commits from all team members
2. Identify cross-team blockers
3. Highlight dependencies between team members
4. Flag items needing team discussion
5. Prepare talking points for each member
6. Generate blockers resolution plan
7. Create action items tracker"
```

### Meeting Minutes and Follow-up

```bash
claude "Process meeting minutes and create action items:
1. Extract decisions made
2. Identify assigned action items
3. Set deadlines and owners
4. Create tracking tickets
5. Generate follow-up email
6. Schedule progress check-ins
7. Update team documentation"
```

### Async Communication Helper

```bash
claude "Process async team communications:
1. Scan team channels for mentions
2. Identify questions needing response
3. Compile decisions made while offline
4. Generate catch-up summary
5. Create response priority list
6. Draft responses for review
7. Flag urgent items needing immediate attention"
```

## 🚀 Deployment and Release Coordination

### Release Management Workflow

```bash
claude "Coordinate team release [version]:
1. Aggregate all features and fixes
2. Run comprehensive test suite
3. Generate release notes
4. Check deployment dependencies
5. Coordinate with DevOps team
6. Schedule deployment windows
7. Prepare rollback procedures
8. Create stakeholder communications
9. Set up post-deployment monitoring"
```

### Feature Flag Management

```bash
claude "Manage feature flags for team:
1. Audit current flag usage
2. Identify flags ready for removal
3. Check flag performance impact
4. Coordinate flag rollout schedule
5. Generate team dashboard
6. Plan gradual rollouts
7. Create rollback procedures"
```

### Hotfix Coordination

```bash
claude "Coordinate emergency hotfix:
1. Assess impact and urgency
2. Identify minimal fix scope
3. Assign developer and reviewer
4. Set up expedited review process
5. Coordinate with QA for rapid testing
6. Plan deployment strategy
7. Prepare stakeholder communication
8. Schedule post-incident review"
```

## 📚 Documentation Collaboration

### Collaborative Documentation

```bash
claude "Coordinate team documentation efforts:
1. Audit current documentation coverage
2. Identify gaps and outdated content
3. Assign documentation owners
4. Create documentation templates
5. Set up review processes
6. Generate writing guidelines
7. Create maintenance schedule"
```

### API Documentation Sync

```bash
claude "Synchronize API documentation across team:
1. Extract API changes from recent commits
2. Update OpenAPI specifications
3. Generate code examples
4. Review with API consumers
5. Update client SDKs
6. Create migration guides
7. Notify external stakeholders"
```

### Knowledge Base Management

```bash
claude "Maintain team knowledge base:
1. Identify frequently asked questions
2. Convert solutions to documentation
3. Organize by team roles and projects
4. Create searchable index
5. Set up automated updates
6. Review and prune outdated content
7. Generate onboarding checklists"
```

## 🎯 Team Performance Analytics

### Velocity Tracking

```bash
claude "Analyze team development velocity:
1. Collect commit data across team
2. Measure story points completed
3. Track cycle time improvements
4. Identify productivity bottlenecks
5. Compare sprint performance
6. Generate team dashboard
7. Suggest process improvements"
```

### Code Quality Metrics

```bash
claude "Generate team code quality report:
1. Analyze code coverage trends
2. Track technical debt accumulation
3. Monitor complexity metrics
4. Review security scan results
5. Check adherence to standards
6. Identify improvement opportunities
7. Create action plan for quality goals"
```

### Collaboration Health Check

```bash
claude "Assess team collaboration health:
1. Analyze code review participation
2. Track knowledge sharing activities
3. Monitor communication patterns
4. Identify collaboration bottlenecks
5. Review pair programming frequency
6. Generate team interaction map
7. Suggest collaboration improvements"
```

## 🛠️ Onboarding Automation

### New Team Member Setup

```bash
claude "Onboard new team member [name]:
1. Set up development environment
2. Clone and configure all repositories
3. Create access to team tools
4. Generate personalized learning path
5. Assign buddy for first sprint
6. Create introductory tasks
7. Schedule onboarding check-ins
8. Update team directory"
```

### Codebase Tour Generator

```bash
claude "Generate codebase tour for new developer:
1. Map key architectural components
2. Identify critical code paths
3. Create guided exploration tasks
4. Generate documentation links
5. Set up hands-on exercises
6. Create debugging scenarios
7. Plan progressive skill building"
```

### Skill Gap Analysis

```bash
claude "Analyze team skill gaps:
1. Map current team competencies
2. Identify project requirements
3. Find skill gaps and overlaps
4. Suggest training priorities
5. Plan knowledge transfer sessions
6. Create skill development paths
7. Schedule regular reassessment"
```

## 🔧 Tool Integration and Coordination

### Multi-Tool Workflow

```bash
claude "Coordinate across team tools:
1. Sync Jira tickets with GitHub issues
2. Update Slack with deployment status
3. Generate Confluence documentation
4. Update team calendars
5. Notify stakeholders via email
6. Update project dashboards
7. Create cross-tool reports"
```

### Team Dashboard Creation

```bash
claude "Create comprehensive team dashboard:
1. Aggregate metrics from all tools
2. Display current sprint progress
3. Show CI/CD pipeline status
4. Track team availability
5. Monitor system health
6. Display upcoming deadlines
7. Generate daily summary email"
```

### Integration Health Monitoring

```bash
claude "Monitor team tool integrations:
1. Check API connections
2. Verify data synchronization
3. Test automated workflows
4. Monitor error rates
5. Check access permissions
6. Update integration documentation
7. Plan redundancy measures"
```

## 🎪 Cross-Team Coordination

### Inter-Team Dependencies

```bash
claude "Manage cross-team dependencies:
1. Map dependencies across teams
2. Track delivery commitments
3. Identify bottlenecks
4. Coordinate timeline alignment
5. Generate status reports
6. Facilitate communication
7. Plan risk mitigation"
```

### Shared Resource Management

```bash
claude "Coordinate shared resources:
1. Track resource utilization
2. Schedule access windows
3. Manage conflicts and priorities
4. Generate usage reports
5. Plan capacity expansion
6. Coordinate maintenance windows
7. Create access policies"
```

### Knowledge Sharing Across Teams

```bash
claude "Facilitate inter-team knowledge sharing:
1. Identify expertise across teams
2. Create expert directory
3. Schedule knowledge sessions
4. Document best practices
5. Create reusable patterns
6. Plan cross-training
7. Build communities of practice"
```

## 📊 Team Analytics and Insights

### Team Health Indicators

```bash
claude "Generate team health metrics:
1. Code review turnaround time
2. Build success rate
3. Test coverage trends
4. Bug resolution time
5. Feature delivery predictability
6. Team communication frequency
7. Knowledge distribution metrics"
```

### Productivity Pattern Analysis

```bash
claude "Analyze team productivity patterns:
1. Identify peak productivity hours
2. Track context switching costs
3. Measure meeting impact
4. Analyze interruption patterns
5. Review focus time distribution
6. Generate optimization recommendations
7. Create team agreements"
```

### Retrospective Automation

```bash
claude "Automate team retrospective preparation:
1. Collect sprint metrics
2. Identify wins and challenges
3. Gather team feedback
4. Analyze process effectiveness
5. Generate discussion topics
6. Create action item templates
7. Schedule follow-up tracking"
```

## 🚨 Incident Response Coordination

### Team Incident Response

```yaml
---
description: "Coordinate team response to production incidents"
allowed-tools: ["Read", "Write", "Bash", "WebSearch"]
---

Activate incident response protocol:
1. Assess severity and assign incident commander
2. Assemble response team based on affected systems
3. Create communication channels
4. Set up monitoring and logging
5. Coordinate with stakeholders
6. Track resolution progress
7. Manage external communications
8. Document incident timeline
9. Schedule post-mortem
```

### Communication During Crisis

```bash
claude "Manage crisis communication:
1. Generate initial incident notification
2. Create status page updates
3. Draft stakeholder communications
4. Set up regular update schedule
5. Coordinate with customer support
6. Manage social media response
7. Prepare resolution announcement"
```

## 🎯 Best Practices for Team Workflows

### Workflow Design Principles

1. **Standardization**
   - Use consistent templates
   - Define clear roles and responsibilities
   - Establish common terminology

2. **Transparency**
   - Make all workflows visible to team
   - Document decision criteria
   - Share performance metrics

3. **Flexibility**
   - Allow customization for different roles
   - Support remote and async work
   - Adapt to changing team needs

4. **Automation**
   - Automate repetitive tasks
   - Reduce manual coordination
   - Enable self-service operations

### Team Workflow Governance

```bash
claude "Establish workflow governance:
1. Define workflow approval process
2. Set up version control for workflows
3. Create testing procedures
4. Establish rollback procedures
5. Set up metrics and monitoring
6. Plan regular reviews
7. Create improvement process"
```

### Change Management

```bash
claude "Manage workflow changes across team:
1. Assess impact of proposed changes
2. Plan rollout strategy
3. Create training materials
4. Set up pilot testing
5. Gather feedback and iterate
6. Monitor adoption metrics
7. Support team through transition"
```

## 📚 Resources and Templates

### Starter Templates

- **Code Review Checklist**: Standardized review process
- **Sprint Planning Guide**: Consistent planning approach
- **Incident Response Playbook**: Crisis management procedures
- **Onboarding Workflow**: New team member integration
- **Documentation Standards**: Team writing guidelines

### Integration Examples

- **Slack + GitHub**: Automated PR notifications
- **Jira + Git**: Issue linking and status updates
- **CI/CD + Team Chat**: Build status notifications
- **Calendar + Planning**: Meeting-aware task scheduling

### Community Resources

- [Team Workflow Library](https://github.com/claude-code-hub/team-workflows)
- [Collaboration Patterns](https://github.com/claude-code-hub/collaboration-patterns)
- [Best Practices Guide](https://docs.claude-code-hub.com/team-best-practices)

---

Transform your team dynamics with intelligent automation and coordination! 🚀