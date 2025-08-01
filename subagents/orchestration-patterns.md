# 🎭 Subagent Orchestration Patterns

> Advanced patterns for coordinating multiple Claude Code subagents to solve complex problems

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Basic Patterns](#basic-patterns)
3. [Advanced Patterns](#advanced-patterns)
4. [Industry-Specific Patterns](#industry-specific-patterns)
5. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
6. [Performance Considerations](#performance-considerations)
7. [Real-World Examples](#real-world-examples)

## 🎯 Introduction

Orchestration patterns define how multiple subagents work together. Like a conductor leading an orchestra, these patterns ensure each subagent plays its part at the right time.

### Key Principles

- **🎼 Coordination**: Agents work in harmony
- **📊 Efficiency**: Minimize redundant work
- **🔄 Flexibility**: Adapt to different scenarios
- **📈 Scalability**: Handle complexity gracefully

## 🎨 Basic Patterns

### 1. Sequential Pipeline

```
Agent A → Agent B → Agent C → Result
```

**When to use**: Tasks with clear dependencies

**Example Implementation**:
```bash
claude "Design, implement, test, and document a user authentication system"

# Execution flow:
# 1. architect-agent: Designs the system
# 2. backend-developer: Implements the API
# 3. test-automator: Creates test suite
# 4. documentation-writer: Creates docs
```

**Subagent Configuration**:
```yaml
---
name: architect-agent
description: Designs system architecture. ALWAYS runs first for new features.
tools: Read, Write
---

Create detailed technical specifications including:
- API endpoints and contracts
- Database schema
- Security considerations
- Integration points
Pass clear requirements to the next agent.
```

### 2. Parallel Execution

```
        ┌→ Agent A →┐
Input → ┼→ Agent B →┼→ Merge → Result
        └→ Agent C →┘
```

**When to use**: Independent tasks that can run simultaneously

**Example**:
```bash
claude "Analyze this codebase for security, performance, and accessibility issues"

# Parallel execution:
# - security-auditor: Scans for vulnerabilities
# - performance-analyzer: Identifies bottlenecks
# - accessibility-checker: Ensures WCAG compliance
```

### 3. Hub and Spoke

```
           ┌→ Specialist A
           ├→ Specialist B
Hub Agent →├→ Specialist C
           ├→ Specialist D
           └→ Specialist E
```

**When to use**: Central coordinator managing specialized tasks

**Example Hub Agent**:
```yaml
---
name: project-coordinator
description: Orchestrates complex projects by delegating to specialists
tools: Read, TodoWrite
---

You are a project coordinator who:
1. Breaks down complex requests
2. Identifies required specialists
3. Delegates tasks appropriately
4. Monitors progress
5. Integrates results

Mention specific specialists needed for each subtask.
```

### 4. Recursive Delegation

```
Main Agent → Sub Agent → Sub-Sub Agent → ...
     ↑            ↓
     └────────────┘
```

**When to use**: Tasks that reveal complexity as you go deeper

**Example**:
```bash
claude "Refactor this legacy codebase"

# Main agent discovers it needs:
# - Code analyzer to understand structure
# - Which finds complex areas needing:
#   - Algorithm specialist for optimization
#   - Database expert for query improvement
```

## 🚀 Advanced Patterns

### 1. Consensus Pattern

Multiple agents analyze the same problem independently:

```
        ┌→ Expert A → Opinion A →┐
Input → ┼→ Expert B → Opinion B →┼→ Consensus → Decision
        └→ Expert C → Opinion C →┘
```

**Implementation**:
```yaml
---
name: consensus-coordinator
description: Gathers multiple expert opinions for critical decisions
---

For important decisions:
1. Consult frontend-expert for UX implications
2. Consult backend-expert for technical feasibility
3. Consult security-expert for risk assessment
4. Synthesize opinions into balanced recommendation
5. Highlight any strong disagreements
```

### 2. Quality Gate Pattern

Each stage must pass before proceeding:

```
Code → Linter → Tests → Security → Performance → Deploy
  ↓       ↓        ↓         ↓           ↓          ↓
 Fail    Fail     Fail      Fail       Fail      Success
```

**Example**:
```bash
claude "Implement and validate this feature with all quality checks"

# Each agent can halt the pipeline:
# - linting-agent: Code style issues
# - test-agent: Failing tests
# - security-agent: Vulnerabilities
# - performance-agent: Regression
```

### 3. Map-Reduce Pattern

Split large tasks, process in parallel, then combine:

```
         ┌→ Process Chunk 1 →┐
         ├→ Process Chunk 2 →┤
Big Task→├→ Process Chunk 3 →┼→ Reduce → Result
         ├→ Process Chunk 4 →┤
         └→ Process Chunk 5 →┘
```

**Use Case**: Analyzing large codebases
```yaml
---
name: codebase-analyzer
description: Coordinates analysis of large codebases
---

For large analysis tasks:
1. Split codebase into logical modules
2. Assign module-analyzer to each part
3. Collect all analysis results
4. Synthesize into comprehensive report
5. Identify cross-module issues
```

### 4. Circuit Breaker Pattern

Prevent cascade failures:

```
Request → Monitor → Agent → Response
            ↓         ↓
         Timeout   Error
            ↓         ↓
         Fallback  Fallback
```

**Implementation**:
```yaml
---
name: resilient-coordinator
description: Handles agent failures gracefully
---

When delegating tasks:
1. Set reasonable timeouts
2. Have fallback strategies
3. If specialist fails, try:
   - Simpler approach
   - Different specialist
   - Manual intervention request
4. Never let one failure stop everything
```

### 5. Event-Driven Pattern

Agents triggered by specific events:

```
File Change → Watcher → Triggers → Test Agent
                ↓                      ↓
              Triggers → Lint Agent    ↓
                ↓                      ↓
              Triggers → Build Agent   ↓
                                      ↓
                                All Results
```

## 🏭 Industry-Specific Patterns

### Web Development Pattern

```yaml
---
name: fullstack-orchestrator
description: Coordinates full-stack web development
---

Development flow:
1. ui-designer: Create component designs
2. frontend-developer: Implement React components
3. backend-developer: Create API endpoints
4. database-architect: Design data models
5. integration-tester: Ensure everything works together
6. deployment-specialist: Prepare for production
```

### Data Science Pattern

```yaml
---
name: ml-pipeline-coordinator
description: Manages machine learning workflows
---

ML Pipeline:
1. data-engineer: Prepare and clean data
2. feature-engineer: Create relevant features
3. model-trainer: Train multiple models
4. model-evaluator: Compare performance
5. deployment-engineer: Productionize best model
```

### DevOps Pattern

```yaml
---
name: cicd-orchestrator
description: Manages CI/CD pipeline
---

Pipeline stages:
1. code-validator: Syntax and style checks
2. test-runner: Execute all test suites
3. security-scanner: Check for vulnerabilities
4. performance-tester: Load and stress tests
5. deployment-agent: Deploy to staging/production
6. monitoring-agent: Set up observability
```

### Mobile Development Pattern

```yaml
---
name: mobile-coordinator
description: Manages cross-platform mobile development
---

Mobile workflow:
1. ux-designer: Design mobile interfaces
2. ios-developer: Native iOS implementation
3. android-developer: Native Android implementation
4. api-developer: Backend services
5. test-automator: Cross-platform testing
6. release-manager: App store deployment
```

## ❌ Anti-Patterns to Avoid

### 1. The Bottleneck

```
A → B → C → D → E → F → G
```

**Problem**: Too many sequential dependencies
**Solution**: Identify parallelizable tasks

### 2. The Chaos

```
Everyone → Everything → Confusion
```

**Problem**: No clear coordination
**Solution**: Define clear responsibilities

### 3. The Infinite Loop

```
A → B → C → A → B → C → ...
```

**Problem**: Circular dependencies
**Solution**: Clear completion criteria

### 4. The Kitchen Sink

```yaml
# Bad: Agent trying to do everything
---
name: do-everything
description: Handles all tasks
tools: All
---
```

**Problem**: No specialization
**Solution**: Focused, specific agents

## 📊 Performance Considerations

### Token Usage by Pattern

| Pattern | Token Usage | Best For |
|---------|-------------|----------|
| Sequential | Low (1x) | Simple workflows |
| Parallel | Medium (Nx) | Independent tasks |
| Hub & Spoke | Medium | Complex coordination |
| Map-Reduce | High | Large-scale analysis |

### Optimization Strategies

1. **Early Termination**
   ```yaml
   If requirements are met, stop processing.
   Don't continue for perfectionism.
   ```

2. **Selective Invocation**
   ```yaml
   Only invoke specialists when truly needed.
   Simple tasks don't need multiple agents.
   ```

3. **Result Caching**
   ```yaml
   If analyzing same code multiple times,
   reuse previous analysis results.
   ```

4. **Progressive Enhancement**
   ```yaml
   Start with basic implementation.
   Add complexity only if needed.
   ```

## 🌟 Real-World Examples

### Example 1: E-commerce Platform

```bash
claude "Build a complete e-commerce platform with search, cart, and checkout"
```

**Orchestration**:
```
1. architect-agent: System design
   ├→ frontend-team: UI components
   │  ├→ search-specialist: Search functionality
   │  ├→ cart-specialist: Shopping cart
   │  └→ checkout-specialist: Payment flow
   ├→ backend-team: API development
   │  ├→ product-api: Product management
   │  ├→ order-api: Order processing
   │  └→ payment-api: Payment integration
   └→ infrastructure-team: Deployment
      ├→ database-admin: Data setup
      ├→ devops-engineer: CI/CD
      └→ security-auditor: Security review
```

### Example 2: Real-time Chat Application

```bash
claude "Create a Slack-like chat application with channels and direct messages"
```

**Pattern**: Event-driven + Parallel
```
Message Sent → websocket-handler → Triggers:
                                   ├→ message-validator
                                   ├→ notification-sender
                                   ├→ message-persister
                                   └→ analytics-tracker
```

### Example 3: Code Migration Project

```bash
claude "Migrate this JavaScript project to TypeScript"
```

**Pattern**: Pipeline with Checkpoints
```
1. analyzer: Scan JS codebase
2. planner: Create migration plan
3. converter: Convert files to TS
   └→ For each file:
      ├→ type-inferrer: Infer types
      ├→ converter: Apply types
      └→ validator: Check validity
4. tester: Ensure functionality
5. documenter: Update docs
```

## 🎯 Choosing the Right Pattern

### Decision Matrix

| If you need... | Use this pattern |
|----------------|------------------|
| Step-by-step process | Sequential Pipeline |
| Multiple viewpoints | Parallel Execution |
| Central coordination | Hub and Spoke |
| Large-scale processing | Map-Reduce |
| Reliability | Circuit Breaker |
| Real-time response | Event-Driven |

### Pattern Combinations

Often, you'll combine patterns:

```yaml
# Hub + Parallel + Sequential
Hub Coordinator
├→ Parallel Analysis Phase
│  ├→ Security Check
│  ├→ Performance Check
│  └→ Code Quality Check
└→ Sequential Implementation Phase
   ├→ Fix Security Issues
   ├→ Optimize Performance
   └→ Refactor Code
```

## 📚 Best Practices

1. **Start Simple**: Begin with basic patterns
2. **Document Flow**: Clear agent interactions
3. **Handle Failures**: Plan for agent errors
4. **Monitor Performance**: Track token usage
5. **Iterate**: Refine based on results

## 🔧 Implementation Tips

### Creating Pattern Templates

```yaml
---
name: pattern-template-{type}
description: Reusable template for {pattern} orchestration
---

# Define your pattern structure
# List agent roles and responsibilities
# Specify handoff points
# Include error handling
```

### Testing Patterns

```bash
# Test with simple case first
claude "Test the orchestration with a small example"

# Then scale up
claude "Apply the same pattern to the full project"
```

## 🎉 Conclusion

Mastering orchestration patterns enables you to:
- 🚀 Tackle complex projects efficiently
- 🎯 Leverage specialized expertise
- ⚡ Maximize parallel processing
- 🛡️ Build resilient workflows

Start with basic patterns and gradually combine them for sophisticated multi-agent symphonies!

---

📖 **Related Resources**:
- [Subagent Examples](examples/)
- [Creating Subagents](comprehensive-guide.md#creating-subagents)
- [Performance Optimization](comprehensive-guide.md#performance--optimization)