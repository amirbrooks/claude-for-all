# Project Status Reporting Command

```yaml
---
description: "Generate comprehensive project status reports with risk analysis"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash"]
tags: ["project-management", "reporting", "status", "clients"]
version: "1.0"
author: "claude-code-hub"
---
```

Generate detailed project status reports with progress tracking, risk analysis, and actionable insights. Perfect for client updates, team synchronization, and stakeholder communication.

## What This Command Does

1. **Analyzes Project Progress** - Reviews completed tasks, milestones, and deliverables
2. **Identifies Risks & Blockers** - Flags potential issues before they become problems  
3. **Tracks Resource Utilization** - Monitors team capacity and budget consumption
4. **Generates Action Plans** - Creates prioritized next steps and recommendations
5. **Formats for Different Audiences** - Creates client-ready and internal versions

## Command Instructions

Generate a comprehensive project status report by following these steps:

### 1. **Project Discovery & Analysis**

Scan the project workspace and gather key information:
- Review project documentation and requirements
- Check git repository for recent activity
- Analyze task management files and issue trackers
- Review meeting notes and communication logs
- Check timeline and milestone documentation

### 2. **Progress Assessment**

Evaluate current project status:
- Calculate completion percentage for major deliverables
- Identify completed milestones and upcoming deadlines
- Review quality metrics (test coverage, code reviews, etc.)
- Assess stakeholder feedback and approval status
- Track budget and resource consumption

### 3. **Risk & Blocker Identification**

Identify potential issues and challenges:
- Technical blockers preventing progress
- Resource constraints or availability issues
- External dependencies causing delays
- Quality concerns or technical debt
- Stakeholder feedback or requirement changes

### 4. **Generate Status Report**

Create a comprehensive status report with this structure:

```markdown
# {{project_name}} Status Report

**Report Date:** {{date}}  
**Report Period:** {{start_date}} - {{end_date}}  
**Project Manager:** {{pm_name}}  
**Client:** {{client_name}}

## 📊 Executive Summary

**Overall Status:** 🟢 On Track / 🟡 At Risk / 🔴 Behind Schedule

**Completion:** {{completion_percentage}}% complete  
**Timeline:** {{days_remaining}} days remaining  
**Budget:** {{budget_used}}% of budget utilized  
**Team Velocity:** {{velocity_metric}}

**Key Highlights:**
- {{major_accomplishment_1}}
- {{major_accomplishment_2}}
- {{key_milestone_reached}}

**Critical Issues:**
- {{critical_issue_1}}
- {{critical_issue_2}}

---

## 🎯 Milestone Progress

### Completed This Period
- ✅ {{milestone_1}} - Completed {{date}}
- ✅ {{milestone_2}} - Completed {{date}}
- ✅ {{deliverable_1}} - Delivered {{date}}

### In Progress
- 🚧 {{current_milestone}} - {{progress_percentage}}% complete
  - Expected completion: {{expected_date}}
  - Remaining tasks: {{task_count}}
  - Assigned to: {{team_member}}

### Upcoming (Next 2 Weeks)
- 📅 {{upcoming_milestone_1}} - Due {{date}}
- 📅 {{upcoming_milestone_2}} - Due {{date}}
- 📅 {{deliverable_review}} - Scheduled {{date}}

---

## 💻 Development Progress

### Code & Technical Metrics
- **Commits This Period:** {{commit_count}}
- **Files Changed:** {{files_changed}}
- **Test Coverage:** {{test_coverage}}%
- **Code Reviews:** {{review_count}} completed
- **Bug Fixes:** {{bug_fixes}} resolved

### Features Completed
1. **{{feature_name}}**
   - Status: ✅ Complete
   - Impact: {{impact_description}}
   - Testing: {{testing_status}}

2. **{{feature_name}}**
   - Status: 🚧 In Progress ({{progress}}%)
   - Blockers: {{blocker_description}}
   - ETA: {{estimated_completion}}

### Technical Highlights
- {{technical_achievement_1}}
- {{performance_improvement}}
- {{security_enhancement}}

---

## 👥 Team & Resources

### Team Utilization
| Team Member | Role | Utilization | Focus This Period |
|-------------|------|-------------|-------------------|
| {{name_1}} | {{role_1}} | {{util_1}}% | {{focus_1}} |
| {{name_2}} | {{role_2}} | {{util_2}}% | {{focus_2}} |
| {{name_3}} | {{role_3}} | {{util_3}}% | {{focus_3}} |

### Resource Allocation
- **Development:** {{dev_hours}} hours ({{dev_percentage}}%)
- **Testing:** {{test_hours}} hours ({{test_percentage}}%)
- **Design:** {{design_hours}} hours ({{design_percentage}}%)
- **Project Management:** {{pm_hours}} hours ({{pm_percentage}}%)

### Capacity Planning
- **Current Sprint Capacity:** {{capacity_current}}
- **Next Sprint Capacity:** {{capacity_next}}
- **Vacation/PTO Impact:** {{pto_impact}}

---

## 🚨 Risks & Issues

### High Priority Issues
1. **{{issue_title}}**
   - **Impact:** {{impact_level}} - {{impact_description}}
   - **Likelihood:** {{likelihood}}
   - **Owner:** {{owner_name}}
   - **Mitigation:** {{mitigation_plan}}
   - **Due Date:** {{resolution_date}}

2. **{{issue_title}}**
   - **Impact:** {{impact_level}} - {{impact_description}}
   - **Likelihood:** {{likelihood}}
   - **Owner:** {{owner_name}}
   - **Mitigation:** {{mitigation_plan}}
   - **Due Date:** {{resolution_date}}

### Medium Priority Risks
- {{risk_1}} - Monitoring {{monitoring_plan}}
- {{risk_2}} - Contingency {{contingency_plan}}

### Issues Resolved This Period
- ✅ {{resolved_issue_1}} - Resolved {{date}}
- ✅ {{resolved_issue_2}} - Resolved {{date}}

---

## 💰 Budget & Financial Status

### Budget Overview
- **Total Budget:** ${{total_budget}}
- **Spent to Date:** ${{spent_amount}} ({{spent_percentage}}%)
- **Remaining:** ${{remaining_budget}}
- **Projected Final Cost:** ${{projected_cost}}

### Budget Breakdown
| Category | Budgeted | Spent | Remaining | % Used |
|----------|----------|-------|-----------|---------|
| Development | ${{dev_budget}} | ${{dev_spent}} | ${{dev_remaining}} | {{dev_percent}}% |
| Design | ${{design_budget}} | ${{design_spent}} | ${{design_remaining}} | {{design_percent}}% |
| Testing | ${{test_budget}} | ${{test_spent}} | ${{test_remaining}} | {{test_percent}}% |
| Other | ${{other_budget}} | ${{other_spent}} | ${{other_remaining}} | {{other_percent}}% |

### Financial Alerts
- {{budget_alert_1}}
- {{budget_alert_2}}

---

## 📈 Quality & Performance Metrics

### Quality Indicators
- **Test Coverage:** {{test_coverage}}% (Target: {{target_coverage}}%)
- **Code Review Coverage:** {{review_coverage}}%
- **Bug Detection Rate:** {{bug_rate}} bugs/1000 LOC
- **Customer-Reported Issues:** {{customer_issues}}

### Performance Metrics
- **Build Success Rate:** {{build_success}}%
- **Deployment Frequency:** {{deploy_frequency}}
- **Lead Time:** {{lead_time}} days
- **Recovery Time:** {{recovery_time}} hours

### User Feedback
- **User Satisfaction:** {{satisfaction_score}}/10
- **Feature Adoption:** {{adoption_rate}}%
- **Support Tickets:** {{support_tickets}}

---

## 📅 Timeline & Milestones

### Project Timeline
```
{{timeline_visual}}
Project Start    Current Status    Next Milestone    Project End
     |              |                    |              |
 {{start_date}}  {{current_date}}    {{next_milestone}}  {{end_date}}
     |              |                    |              |
 [====Progress======|==Remaining========|==========]
```

### Critical Path Analysis
- **Current Critical Path:** {{critical_path}}
- **Potential Delays:** {{delay_risks}}
- **Buffer Available:** {{buffer_days}} days

### Upcoming Deadlines
- {{deadline_1}} - {{date_1}}
- {{deadline_2}} - {{date_2}}
- {{deadline_3}} - {{date_3}}

---

## 🎯 Next Steps & Action Items

### Immediate Actions (Next 1-2 Weeks)
1. **{{action_1}}**
   - Owner: {{owner_1}}
   - Due: {{due_1}}
   - Priority: {{priority_1}}

2. **{{action_2}}**
   - Owner: {{owner_2}}
   - Due: {{due_2}}
   - Priority: {{priority_2}}

3. **{{action_3}}**
   - Owner: {{owner_3}}
   - Due: {{due_3}}
   - Priority: {{priority_3}}

### Strategic Focus Areas
- {{focus_area_1}}: {{focus_description_1}}
- {{focus_area_2}}: {{focus_description_2}}
- {{focus_area_3}}: {{focus_description_3}}

### Stakeholder Actions Required
- {{stakeholder_action_1}} - Needed by {{date}}
- {{stakeholder_action_2}} - Needed by {{date}}

---

## 📞 Stakeholder Communication

### Client Updates
- **Last Client Meeting:** {{last_meeting_date}}
- **Next Scheduled Meeting:** {{next_meeting_date}}
- **Outstanding Client Approvals:** {{pending_approvals}}
- **Client Satisfaction Level:** {{client_satisfaction}}

### Team Communication
- **Team Sync Frequency:** {{sync_frequency}}
- **Last Retrospective:** {{retro_date}}
- **Next Team Planning:** {{planning_date}}

### Escalation Items
- {{escalation_1}} - Requires {{stakeholder}} decision
- {{escalation_2}} - Needs {{resource}} approval

---

## 📊 Appendix

### Detailed Metrics
[Include detailed charts, graphs, or additional data]

### Change Log
- {{change_1}} - {{change_date}}
- {{change_2}} - {{change_date}}

### Lessons Learned
- {{lesson_1}}
- {{lesson_2}}

---

**Report Generated:** {{timestamp}}  
**Next Report Due:** {{next_report_date}}  
**Questions/Concerns:** Contact {{pm_contact}}
```

## Report Variations

### Client-Facing Version
- Focus on business value and outcomes
- Minimize technical jargon
- Emphasize benefits and ROI
- Include visual progress indicators
- Highlight client success stories

### Internal Team Version  
- Include detailed technical metrics
- Show individual contributor performance
- Detail resource allocation and capacity
- Include process improvement notes
- Show detailed risk analysis

### Executive Summary Version
- One-page overview
- Key metrics only
- Traffic light status indicators
- Critical issues and decisions needed
- High-level timeline and budget

## Automation Features

### Automated Data Collection
```bash
# Gather git statistics
git log --since="1 week ago" --pretty=format:"%h %an %s" --shortstat

# Check test coverage
npm run test:coverage

# Analyze code complexity
npm run analyze

# Check for security issues
npm audit
```

### Integration Examples

#### With Project Management Tools
```markdown
Pull data from:
- Jira/Linear for issue tracking
- Asana/Monday for task progress
- Harvest/Toggl for time tracking
- GitHub/GitLab for code metrics
```

#### With Communication Tools
```markdown
Send reports to:
- Slack channels
- Email distribution lists
- Project management dashboards
- Client portals
```

## Customization Options

### For Different Project Types

#### Software Development
```markdown
Additional sections:
- Code quality metrics
- Technical debt tracking
- Performance benchmarks
- Security scan results
```

#### Marketing Campaigns
```markdown
Additional sections:
- Campaign performance metrics
- Conversion funnel analysis
- ROI and ROAS tracking
- Creative asset performance
```

#### Consulting Projects
```markdown
Additional sections:
- Deliverable completion status
- Client interview feedback
- Recommendation implementation
- Change management progress
```

### Industry-Specific Metrics

#### SaaS Products
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate and retention

#### E-commerce
- Conversion rates
- Average order value
- Cart abandonment rate
- Customer satisfaction scores

#### Mobile Apps
- App store ratings
- Daily/Monthly active users
- Feature adoption rates
- Crash reports and stability

## Report Scheduling

### Frequency Options
- **Daily**: For critical projects or crisis management
- **Weekly**: For active development projects
- **Bi-weekly**: For maintenance or long-term projects
- **Monthly**: For strategic initiatives or executive reporting

### Automated Generation
```bash
# Schedule weekly reports
crontab -e
0 9 * * 1 claude "/project-status ProjectName"

# Generate on-demand
claude "/project-status ProjectName urgent"
```

## Quality Checklist

Before sending the report, verify:
- [ ] All data is current and accurate
- [ ] Metrics are calculated correctly
- [ ] Status indicators reflect reality
- [ ] Action items have clear owners and dates
- [ ] Language is appropriate for audience
- [ ] Visual elements are clear and helpful
- [ ] Contact information is correct

## Related Commands

- **[daily-summary.md](daily-summary.md)** - Daily progress tracking
- **[client-management.md](client-management.md)** - Client communication
- **[weekly-review.md](weekly-review.md)** - Team retrospectives

---

*Keep stakeholders informed and projects on track with regular status reporting!*