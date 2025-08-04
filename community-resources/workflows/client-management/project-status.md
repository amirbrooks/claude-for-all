---
description: "Generate comprehensive status report for all active projects with risk analysis"
allowed-tools: ["Read(*)", "LS(*)", "Glob(*)", "Grep(*)", "Write(*)"]
---

# 📊 Project Status Reporter: Real-Time Project Intelligence

> **The Project Radar**: Automated scanning and analysis of all active projects with risk detection, progress tracking, and actionable insights

---

## 🎯 Command Purpose

The Project Status command delivers **executive-level project intelligence** by:
- **Scanning** all active projects across your workspace
- **Analyzing** progress, risks, and blockers automatically
- **Generating** comprehensive status reports for stakeholders
- **Identifying** at-risk projects before they become critical
- **Providing** actionable recommendations for project success

---

## 🧠 How It Works

### 1. **Multi-Source Project Discovery**
The AI intelligently scans:
```yaml
scan_locations:
  - 💼 Projects/Active/         # Personal projects
  - 👥 Clients/Active/*/Projects/  # Client projects
  - 🧠 Knowledge Base/Development/  # Technical projects
  - 📅 Daily Operations/          # Time-based project mentions
```

### 2. **Intelligent Analysis Engine**
For each discovered project:
- **Progress Calculation**: Based on completed vs. total tasks
- **Risk Assessment**: Deadline proximity, blocker severity, resource availability
- **Health Scoring**: Green/Yellow/Red status assignment
- **Trend Analysis**: Velocity changes and momentum tracking
- **Dependency Mapping**: Inter-project relationships and conflicts

### 3. **Automated Reporting**
Generates professional reports with:
- **Executive Summary**: High-level project portfolio view
- **Detailed Analysis**: Deep dive into each project
- **Risk Matrix**: Visual representation of project health
- **Action Items**: Specific steps to address issues
- **Client Communications**: Ready-to-send status updates

---

## 📊 Project Status Report Template

```markdown
# 📊 Project Status Report
**Generated**: {{date:YYYY-MM-DD HH:mm}}
**Report Period**: {{period_start}} to {{period_end}}
**Total Active Projects**: {{count}}

---

## 🎯 Executive Summary

### Portfolio Health
| Status | Count | Percentage | Change |
|--------|-------|------------|---------|
| 🟢 On Track | X | XX% | ↑X |
| 🟡 At Risk | X | XX% | ↓X |
| 🔴 Critical | X | XX% | →0 |

### Key Metrics
- **Average Completion**: XX% (↑X% from last report)
- **On-Time Delivery Rate**: XX%
- **Resource Utilization**: XX%
- **Client Satisfaction**: X.X/5

---

## 🚀 Project Details

### 🟢 On Track Projects

#### [Project Name] - [Client/Type]
- **Status**: 🟢 On Track (Confidence: 95%)
- **Progress**: ███████░░░ 73% Complete
- **Timeline**: Started {{start_date}} | Due {{due_date}} | Days Remaining: {{days}}
- **Last Activity**: {{last_update}} - [Activity description]

**Recent Achievements**:
- ✅ [Completed milestone with impact]
- ✅ [Delivered feature ahead of schedule]

**Upcoming Milestones**:
- 📅 {{date}}: [Milestone] - [Deliverable]
- 📅 {{date}}: [Milestone] - [Deliverable]

**Team/Resources**: [Allocation status]
**Budget**: $X,XXX used of $Y,YYY (XX%)
**Client Feedback**: "[Recent positive feedback]"

---

### 🟡 At Risk Projects

#### [Project Name] - [Client/Type]
- **Status**: 🟡 At Risk (Risk Level: Medium)
- **Progress**: ████░░░░░░ 42% Complete
- **Timeline**: ⚠️ 5 days behind schedule

**Risk Factors**:
1. **[Risk Type]**: [Specific issue description]
   - **Impact**: [High/Medium/Low]
   - **Mitigation**: [Proposed solution]
   - **Owner**: [Responsible party]

2. **[Risk Type]**: [Specific issue description]
   - **Impact**: [High/Medium/Low]  
   - **Mitigation**: [Proposed solution]
   - **Required Action**: [Immediate steps needed]

**Recovery Plan**:
- [ ] [Specific action with deadline]
- [ ] [Resource reallocation needed]
- [ ] [Stakeholder communication required]

**Escalation**: [If needed, to whom and when]

---

### 🔴 Critical Projects

#### [Project Name] - [Client/Type]
- **Status**: 🔴 Critical (Immediate Action Required)
- **Progress**: ██░░░░░░░░ 23% Complete
- **Timeline**: ❌ 10 days overdue

**Critical Issues**:
1. **Blocker**: [Major impediment description]
   - **Business Impact**: [Revenue/relationship risk]
   - **Resolution Path**: [Steps to unblock]
   - **ETA to Resolution**: [Timeframe]

**Emergency Actions**:
- 🚨 [Immediate action required today]
- 🚨 [Stakeholder escalation needed]
- 🚨 [Resource reallocation urgent]

**Recovery Options**:
1. **Option A**: [Scope reduction approach]
2. **Option B**: [Timeline extension approach]
3. **Option C**: [Additional resource approach]

**Recommendation**: [Specific recommended path]

---

## 📈 Trend Analysis

### Velocity Trends
```
Week 1: ████████░░ 8 tasks/week
Week 2: ██████░░░░ 6 tasks/week  
Week 3: ████░░░░░░ 4 tasks/week ⚠️ Declining velocity
Week 4: ██████████ 10 tasks/week ✅ Recovered
```

### Project Momentum
- **Accelerating**: [Projects gaining speed]
- **Steady**: [Projects maintaining pace]
- **Decelerating**: [Projects losing momentum]

### Resource Patterns
- **Overallocated**: [Resources stretched thin]
- **Optimal**: [Well-balanced resources]
- **Underutilized**: [Available capacity]

---

## ⚠️ Risk Matrix

| Project | Schedule Risk | Resource Risk | Technical Risk | Overall |
|---------|--------------|---------------|----------------|---------|
| [Name] | 🟢 Low | 🟡 Medium | 🟢 Low | 🟢 |
| [Name] | 🔴 High | 🟡 Medium | 🟡 Medium | 🔴 |
| [Name] | 🟡 Medium | 🟢 Low | 🔴 High | 🟡 |

### Top Risks Requiring Attention
1. **[Project]**: [Specific risk] - Due: [Date]
2. **[Project]**: [Specific risk] - Due: [Date]
3. **[Project]**: [Specific risk] - Due: [Date]

---

## 💰 Financial Summary

### Budget Overview
| Project | Budget | Spent | Remaining | Status |
|---------|--------|-------|-----------|---------|
| [Name] | $XX,XXX | $X,XXX | $X,XXX | 🟢 On budget |
| [Name] | $XX,XXX | $X,XXX | $X,XXX | 🟡 75% consumed |
| [Name] | $XX,XXX | $X,XXX | $X,XXX | 🔴 Over budget |

**Total Portfolio Value**: $XXX,XXX
**Revenue at Risk**: $XX,XXX
**Projected Revenue**: $XXX,XXX

---

## 🎯 Recommended Actions

### Immediate (Today)
1. **[Project Name]**: [Specific action to prevent escalation]
2. **[Project Name]**: [Critical decision needed]
3. **[Stakeholder]**: [Communication required]

### This Week
- [ ] [Risk mitigation action for at-risk project]
- [ ] [Resource reallocation to address bottlenecks]
- [ ] [Client communication for transparency]
- [ ] [Process improvement to prevent future issues]

### Strategic Considerations
- **Capacity Planning**: [Recommendation based on current load]
- **Pipeline Management**: [New project intake recommendations]
- **Process Optimization**: [Systemic improvements identified]

---

## 📞 Stakeholder Communications

### Client Updates Required
**[Client Name] - [Project]**
```
Subject: Project Status Update - [Project Name]

Current Status: [On Track/At Risk/Delayed]
Completion: XX%
Next Milestone: [Date] - [Deliverable]

[Customized message based on project status]

Action Required: [If any]
```

### Internal Communications
- **Team Meeting Topics**: [Critical items for discussion]
- **Escalations Needed**: [Management attention required]
- **Resource Requests**: [Additional support needed]

---

## 📊 KPI Dashboard

### Performance Metrics
- **On-Time Delivery**: XX% (Target: 90%)
- **Budget Adherence**: XX% (Target: 95%)
- **Quality Score**: X.X/5 (Target: 4.5)
- **Client Satisfaction**: X.X/5 (Target: 4.7)

### Productivity Metrics  
- **Average Cycle Time**: XX days
- **Task Completion Rate**: XX%
- **Rework Percentage**: X%
- **Automation Adoption**: XX%

---

## 🔄 Continuous Improvement

### Lessons Learned
- **Success Pattern**: [What's working well]
- **Failure Pattern**: [What's causing issues]
- **Process Gap**: [What's missing]

### Recommended Improvements
1. **Process**: [Specific process enhancement]
2. **Tool**: [Technology that could help]
3. **Communication**: [Better stakeholder management]

---

*Report generated by AI Project Intelligence System*
*Next scheduled report: {{next_report_date}}*
*Historical reports available in: Reports/Archive/*
```

---

## 🚀 Advanced Features

### Risk Detection Algorithm
The AI uses multiple signals to assess project risk:
- **Schedule Analysis**: Deadline proximity vs. completion rate
- **Velocity Tracking**: Is work speeding up or slowing down?
- **Blocker Severity**: Impact and duration of impediments
- **Resource Availability**: Team capacity vs. requirements
- **Dependency Health**: Status of related projects

### Predictive Analytics
- **Completion Forecasting**: When will the project actually finish?
- **Risk Probability**: Likelihood of various risk scenarios
- **Resource Needs**: Future capacity requirements
- **Budget Projection**: Expected final costs

### Intelligent Recommendations
Based on pattern analysis across all projects:
- **Resource Optimization**: Move person X from Project A to Project B
- **Timeline Adjustments**: Realistic deadline recommendations
- **Scope Management**: What to cut to meet deadlines
- **Risk Mitigation**: Specific actions to prevent issues

---

## 🎯 Implementation Guide

### Initial Setup
1. **Organize Projects**: Ensure projects follow standard structure
2. **Define Templates**: Create project templates with required fields
3. **Set Baselines**: Establish normal velocity and metrics
4. **Configure Alerts**: Define risk thresholds

### Running Reports
```bash
# Generate standard weekly report
claude "/project-status"

# Generate client-specific report
claude "/project-status" "Focus on Client ABC projects"

# Generate executive summary only
claude "/project-status" "Executive summary only, no details"
```

### Report Distribution
- **Auto-generate**: Schedule weekly reports
- **Client Versions**: Sanitized external versions
- **Team Dashboards**: Visual status boards
- **Executive Briefs**: High-level summaries

---

## 💡 Pro Tips

### For Maximum Accuracy
1. **Update Regularly**: Daily task updates improve predictions
2. **Track Everything**: Include all work, even small tasks
3. **Be Realistic**: Honest estimates lead to better forecasts
4. **Document Blockers**: Clear blocker descriptions enable solutions
5. **Learn from History**: Past project patterns predict future

### Common Patterns to Watch
- **The 80% Trap**: Projects stall at 80% complete
- **Scope Creep**: Gradual expansion of requirements
- **Resource Conflicts**: Same person needed everywhere
- **Communication Gaps**: Stakeholder alignment issues

---

## 🎉 Success Story

*"The project status command saved our largest client relationship. It detected a critical project trending toward failure 3 weeks before the deadline. The risk analysis suggested a specific intervention that got us back on track. We delivered on time and the client never knew how close we came to missing."* - Digital Agency Director

---

## 🚀 Next Steps

1. **Install Command**: Save as `.claude/commands/project-status.md`
2. **Run First Report**: Generate baseline status
3. **Review Accuracy**: Verify project detection and analysis
4. **Set Schedule**: Weekly reports recommended
5. **Share with Team**: Transparency improves outcomes

**Remember: Project success is about early detection and rapid response. This command gives you the radar to see problems coming.**

*Stop firefighting. Start preventing fires.*