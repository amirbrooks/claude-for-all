# 📊 Monitoring Usage

> Track, analyze, and optimize your Claude Code performance and costs

## 📖 Overview

Effective usage monitoring is essential for optimizing Claude Code performance and controlling costs. This guide covers analytics, reporting, alerting, and optimization strategies based on usage data.

## 🎯 Key Metrics to Monitor

### Usage Metrics
- **Daily token consumption**: Input vs output token ratios
- **Request frequency**: Patterns of usage throughout the day
- **Session length**: Average duration of Claude Code sessions
- **Task completion rate**: Successful vs failed requests

### Performance Metrics
- **Response time**: Time from request to first response
- **Success rate**: Percentage of tasks completed successfully
- **Iteration count**: Average refinements needed per task
- **Context efficiency**: How well you utilize available context

### Cost Metrics
- **Daily spend**: Cost breakdown by token type
- **Monthly trends**: Spending patterns over time
- **Cost per task**: Efficiency of different task types
- **ROI calculation**: Value generated vs cost incurred

### Quality Metrics
- **First-attempt success**: Tasks completed without iteration
- **Code accuracy**: Generated code that works without modification
- **Response relevance**: How well responses match requirements
- **User satisfaction**: Subjective quality assessment

## 📈 Setting Up Monitoring

### 1. **Basic Usage Tracking**

Create a simple tracking system:

```yaml
# Daily Usage Log
Date: 2024-01-15
Sessions: 8
Total Tokens: 45,000
Input Tokens: 28,000
Output Tokens: 17,000
Cost: $2.34
Tasks Completed: 23
Average Tokens/Task: 1,956

Top Activities:
1. Code generation (35% of tokens)
2. Code review (25% of tokens)  
3. Debugging (20% of tokens)
4. Documentation (15% of tokens)
5. Planning (5% of tokens)
```

### 2. **Automated Monitoring**

Set up automated tracking:

```bash
#!/bin/bash
# usage-monitor.sh

# Get daily usage stats
claude_usage=$(claude --usage-stats)

# Parse and log data
echo "$(date): $claude_usage" >> usage.log

# Check against thresholds
if [ $daily_tokens -gt 75000 ]; then
    echo "WARNING: High token usage detected" | mail -s "Claude Usage Alert" admin@company.com
fi
```

### 3. **Dashboard Creation**

Create visual dashboards:

```html
<!-- Simple Usage Dashboard -->
<div class="usage-dashboard">
  <div class="metric-card">
    <h3>Daily Tokens</h3>
    <span class="value">{{daily_tokens}}</span>
    <span class="trend {{trend_direction}}">{{trend_percent}}%</span>
  </div>
  
  <div class="metric-card">
    <h3>Cost Today</h3>
    <span class="value">${{daily_cost}}</span>
    <span class="budget">Budget: ${{daily_budget}}</span>
  </div>
  
  <div class="metric-card">
    <h3>Efficiency</h3>
    <span class="value">{{tokens_per_task}}</span>
    <span class="label">tokens/task</span>
  </div>
</div>
```

## 🔍 Analytics Patterns

### 1. **Usage Pattern Analysis**

#### Time-Based Patterns
```yaml
Peak Usage Hours:
  - 9-11 AM: 35% of daily usage (morning planning)
  - 2-4 PM: 40% of daily usage (afternoon coding)
  - 7-9 PM: 20% of daily usage (evening review)

Weekly Patterns:
  - Monday: High planning activity
  - Tuesday-Thursday: Peak coding sessions
  - Friday: Code review and documentation
  - Weekend: Learning and experimentation (20% of weekday usage)

Monthly Patterns:
  - Week 1-2: Feature development (high usage)
  - Week 3: Testing and refinement (medium usage)
  - Week 4: Documentation and planning (low usage)
```

#### Task Type Analysis
```yaml
Task Distribution:
  Code Generation: 40% of tokens, 60% of value
  Code Review: 25% of tokens, 90% success rate
  Debugging: 20% of tokens, 30% of time saved
  Documentation: 10% of tokens, 85% automation
  Architecture: 5% of tokens, highest strategic value

Efficiency by Task:
  Bug Fixes: 800 tokens average, 15 minutes saved
  Components: 1,200 tokens average, 45 minutes saved
  Features: 3,500 tokens average, 3 hours saved
  Architecture: 5,000 tokens average, 8 hours saved
```

### 2. **Cost Analysis**

#### Cost Breakdown
```yaml
Monthly Cost Analysis:
  Total Spend: $156
  Input Tokens: $87 (56%)
  Output Tokens: $69 (44%)
  
Cost by Activity:
  Development: $89 (57%)
  Learning: $31 (20%)
  Planning: $23 (15%)
  Documentation: $13 (8%)

ROI Analysis:
  Time Saved: 47 hours
  Hourly Rate: $75
  Value Generated: $3,525
  ROI: 2,258%
```

### 3. **Performance Trends**

#### Efficiency Improvements
```yaml
3-Month Trend:
  January: 3,200 tokens/task
  February: 2,400 tokens/task (25% improvement)
  March: 1,800 tokens/task (44% improvement)

Success Rate Trend:
  January: 73% first-attempt success
  February: 81% first-attempt success
  March: 89% first-attempt success

Quality Improvements:
  Code accuracy: 76% → 91%
  Response relevance: 82% → 94%
  Task completion: 85% → 96%
```

## 🚨 Alerting and Thresholds

### 1. **Usage Alerts**

Set up proactive monitoring:

```yaml
Daily Thresholds:
  Token Limit: 75,000 tokens
  Cost Limit: $5.00
  Low Efficiency: >3,000 tokens/task
  High Failure Rate: <80% success

Weekly Thresholds:
  Budget Limit: $35
  Efficiency Trend: >10% increase in tokens/task
  Quality Trend: <5% decrease in success rate

Monthly Thresholds:
  Budget Limit: $150
  ROI Minimum: 500%
  Efficiency Target: <2,000 tokens/task
```

### 2. **Alert Actions**

Define response actions:

```yaml
High Usage Alert:
  - Review recent prompts for inefficiency
  - Check for repetitive tasks
  - Consider batch processing
  - Evaluate subscription tier

Quality Drop Alert:
  - Analyze failed requests
  - Review prompt quality
  - Check context management
  - Reassess task complexity

Cost Spike Alert:
  - Audit expensive operations
  - Review optimization opportunities
  - Check for unnecessary iterations
  - Consider usage patterns
```

### 3. **Automated Responses**

```bash
# Alert response script
#!/bin/bash

case $alert_type in
  "high_usage")
    echo "Analyzing high usage patterns..."
    claude "/analyze-usage patterns"
    ;;
  "cost_spike")
    echo "Generating cost optimization report..."
    claude "/cost-optimization-report"
    ;;
  "quality_drop")
    echo "Reviewing recent prompt quality..."
    claude "/prompt-quality-analysis"
    ;;
esac
```

## 📊 Reporting Templates

### 1. **Daily Report**

```markdown
# Claude Code Daily Report - {{date}}

## Summary
- **Sessions**: {{session_count}}
- **Tokens Used**: {{total_tokens:,}} ({{daily_budget_percent}}% of daily budget)
- **Cost**: ${{daily_cost}} (Budget: ${{daily_budget}})
- **Tasks Completed**: {{task_count}}
- **Efficiency**: {{tokens_per_task}} tokens/task

## Performance
- **Success Rate**: {{success_rate}}%
- **Average Response Time**: {{avg_response_time}}s
- **Context Utilization**: {{context_utilization}}%

## Top Activities
1. {{activity_1}}: {{activity_1_percent}}%
2. {{activity_2}}: {{activity_2_percent}}%
3. {{activity_3}}: {{activity_3_percent}}%

## Optimization Opportunities
- {{optimization_1}}
- {{optimization_2}}
- {{optimization_3}}

## Tomorrow's Focus
- Monitor: {{monitor_focus}}
- Optimize: {{optimize_focus}}
- Budget: ${{tomorrow_budget}}
```

### 2. **Weekly Report**

```markdown
# Claude Code Weekly Report - Week of {{week_start}}

## Executive Summary
- **Total Cost**: ${{weekly_cost}} ({{budget_variance}} vs budget)
- **ROI**: {{roi}}% ({{hours_saved}} hours saved)
- **Efficiency Trend**: {{efficiency_trend}}
- **Quality Score**: {{quality_score}}/100

## Usage Patterns
- **Peak Days**: {{peak_days}}
- **Peak Hours**: {{peak_hours}}
- **Most Efficient Day**: {{efficient_day}}
- **Highest Volume Day**: {{volume_day}}

## Task Analysis
| Task Type | Count | Avg Tokens | Success Rate | Time Saved |
|-----------|-------|------------|--------------|------------|
| {{task_1}} | {{count_1}} | {{tokens_1}} | {{success_1}}% | {{time_1}}h |
| {{task_2}} | {{count_2}} | {{tokens_2}} | {{success_2}}% | {{time_2}}h |
| {{task_3}} | {{count_3}} | {{tokens_3}} | {{success_3}}% | {{time_3}}h |

## Key Achievements
- {{achievement_1}}
- {{achievement_2}}
- {{achievement_3}}

## Areas for Improvement
1. **{{improvement_1}}**: {{improvement_1_detail}}
2. **{{improvement_2}}**: {{improvement_2_detail}}
3. **{{improvement_3}}**: {{improvement_3_detail}}

## Next Week Goals
- Cost Target: ${{next_week_budget}}
- Efficiency Target: <{{efficiency_target}} tokens/task
- Quality Target: >{{quality_target}}% success rate
```

### 3. **Monthly Report**

```markdown
# Claude Code Monthly Report - {{month}} {{year}}

## Financial Summary
- **Total Spend**: ${{monthly_cost}}
- **Budget Variance**: {{budget_variance}}%
- **Cost per Hour Saved**: ${{cost_per_hour}}
- **ROI**: {{monthly_roi}}%

## Usage Statistics
- **Total Sessions**: {{total_sessions}}
- **Total Tokens**: {{total_tokens:,}}
- **Average Daily Usage**: {{avg_daily_tokens:,}} tokens
- **Peak Day**: {{peak_day}} ({{peak_tokens:,}} tokens)

## Efficiency Metrics
- **Tokens per Task**: {{tokens_per_task}} ({{efficiency_trend}})
- **Success Rate**: {{success_rate}}% ({{quality_trend}})
- **Time Saved**: {{time_saved}} hours
- **Tasks Completed**: {{tasks_completed}}

## Technology Impact
### Most Valuable Use Cases
1. **{{use_case_1}}**: {{use_case_1_value}}
2. **{{use_case_2}}**: {{use_case_2_value}}
3. **{{use_case_3}}**: {{use_case_3_value}}

### Productivity Gains
- **Development Speed**: {{dev_speed_gain}}% faster
- **Code Quality**: {{quality_improvement}}% improvement
- **Learning Acceleration**: {{learning_gain}}% faster skill acquisition

## Strategic Insights
### What's Working Well
- {{insight_1}}
- {{insight_2}}
- {{insight_3}}

### Optimization Opportunities
- {{opportunity_1}}: Potential {{savings_1}}% cost reduction
- {{opportunity_2}}: Potential {{savings_2}} hours/month saved
- {{opportunity_3}}: Potential {{improvement_3}}% quality increase

## Next Month Strategy
### Focus Areas
1. **{{focus_1}}**: {{focus_1_plan}}
2. **{{focus_2}}**: {{focus_2_plan}}
3. **{{focus_3}}**: {{focus_3_plan}}

### Targets
- Budget: ${{next_month_budget}}
- Efficiency: <{{efficiency_target}} tokens/task
- ROI: >{{roi_target}}%
- Quality: >{{quality_target}}% success rate
```

## 🔧 Optimization Based on Monitoring

### 1. **Data-Driven Improvements**

Use monitoring data to drive optimizations:

```yaml
High Token Usage Pattern Detected:
  Issue: Code review requests averaging 4,500 tokens
  Analysis: Including full file contents unnecessarily
  Solution: Focus on specific sections/functions
  Expected Savings: 60% token reduction

Low Success Rate Pattern:
  Issue: Architecture requests failing 40% of time
  Analysis: Insufficient context provided
  Solution: Create architecture context template
  Expected Improvement: 85% success rate

Cost Spike Analysis:
  Issue: 3x cost increase in week 2
  Analysis: Large file uploads and processing
  Solution: Pre-process files, provide summaries
  Expected Savings: 70% cost reduction
```

### 2. **Continuous Improvement Process**

```markdown
Weekly Optimization Cycle:
1. **Monday**: Review previous week's data
2. **Tuesday**: Identify top 3 inefficiencies
3. **Wednesday**: Implement optimizations
4. **Thursday**: Test optimization impact
5. **Friday**: Document learnings and plan next week

Monthly Strategic Review:
1. Analyze major usage patterns
2. Identify strategic opportunities
3. Plan infrastructure improvements
4. Set goals for next month
5. Update monitoring and alerting
```

### 3. **Automated Optimization**

```bash
# Daily optimization suggestions
claude "/analyze-usage-patterns" | parse_suggestions | apply_recommendations

# Weekly efficiency review
if [ $efficiency_drop -gt 10 ]; then
    claude "/generate-efficiency-recommendations"
fi

# Monthly strategic planning
claude "/monthly-optimization-plan" --budget=$next_month_budget --goals="$optimization_goals"
```

## 📱 Monitoring Tools and Dashboards

### 1. **Simple CLI Monitoring**

```bash
#!/bin/bash
# claude-stats.sh

echo "=== Claude Code Usage Stats ==="
echo "Today: $(claude --stats today)"
echo "Week: $(claude --stats week)"
echo "Month: $(claude --stats month)"
echo "Budget remaining: $(claude --budget remaining)"
echo "Top activities: $(claude --stats activities)"
```

### 2. **Web Dashboard**

```javascript
// Simple usage dashboard
const UsageDashboard = () => {
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    fetchUsageStats().then(setStats);
  }, []);
  
  return (
    <div className="dashboard">
      <MetricCard 
        title="Today's Usage"
        value={stats.dailyTokens?.toLocaleString()}
        trend={stats.dailyTrend}
      />
      <MetricCard 
        title="Cost"
        value={`$${stats.dailyCost}`}
        budget={`$${stats.dailyBudget}`}
      />
      <MetricCard 
        title="Efficiency"
        value={`${stats.tokensPerTask}`}
        label="tokens/task"
      />
      <ActivityChart data={stats.activities} />
      <TrendChart data={stats.weeklyTrend} />
    </div>
  );
};
```

### 3. **Advanced Analytics**

```python
# Advanced usage analytics
import pandas as pd
import matplotlib.pyplot as plt

def analyze_usage_patterns(usage_data):
    df = pd.DataFrame(usage_data)
    
    # Time series analysis
    daily_usage = df.groupby('date')['tokens'].sum()
    efficiency_trend = df.groupby('date')['tokens_per_task'].mean()
    
    # Cost analysis
    cost_breakdown = df.groupby('activity_type')['cost'].sum()
    
    # Optimization opportunities
    high_cost_activities = df[df['tokens_per_task'] > df['tokens_per_task'].quantile(0.8)]
    
    return {
        'daily_trend': daily_usage,
        'efficiency_trend': efficiency_trend,
        'cost_breakdown': cost_breakdown,
        'optimization_targets': high_cost_activities
    }
```

## 🎯 Success Metrics

### Key Performance Indicators

Track these KPIs for monitoring success:

#### Efficiency KPIs
- **Tokens per Task**: Trending downward
- **Cost per Hour Saved**: Decreasing over time
- **Success Rate**: Consistently above 85%
- **Response Time**: Under 15 seconds average

#### Quality KPIs
- **First-Attempt Success**: Above 80%
- **Code Accuracy**: Above 90%
- **User Satisfaction**: Above 4.5/5
- **Task Completion**: Above 95%

#### Financial KPIs
- **Monthly ROI**: Above 500%
- **Budget Adherence**: Within 10% of target
- **Cost Trend**: Stable or decreasing
- **Value per Dollar**: Increasing over time

### Optimization Targets

```yaml
Short-term Goals (1 month):
  - Reduce tokens/task by 20%
  - Increase success rate to 90%
  - Stay within monthly budget
  - Identify top 5 inefficiencies

Medium-term Goals (3 months):
  - Achieve <2,000 tokens/task average
  - Maintain >95% task completion
  - Establish automated monitoring
  - Build optimization playbook

Long-term Goals (6+ months):
  - Expert-level efficiency (<1,500 tokens/task)
  - Predictable cost patterns
  - Automated optimization recommendations
  - Team knowledge sharing system
```

---

Monitor smartly to optimize continuously and maximize your Claude Code ROI! 📊🚀