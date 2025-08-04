# 🧠 Context Management Guide

> Strategies for optimizing context usage and maintaining conversation quality in Claude Code

## 🎯 Understanding Context in Claude Code

### What is Context?
Context is the "memory" of your conversation with Claude Code - everything from:
- Previous messages and responses
- File contents that have been read
- Command outputs and results
- Configuration settings and environment state
- Active subagent conversations

### Context Window Limits
- **Context window**: Maximum tokens Claude can process at once
- **Token limits**: Vary by model (Claude 3 models have different limits)
- **Context overflow**: When you exceed the limit, older information is dropped
- **Quality degradation**: Performance decreases as context approaches limits

## 📊 Context Usage Patterns

### High Context Consumption Activities
```bash
# File reading operations
claude "Read all Python files in this project"  # High token usage

# Large data processing
claude "Analyze this 1000-line CSV file"        # Very high usage

# Complex conversations
# Long conversation with multiple topics        # Gradual accumulation

# Subagent orchestration
# Multiple parallel subagents                   # Multiplies context usage
```

### Low Context Consumption Activities
```bash
# Specific targeted questions
claude "How do I install package X?"           # Low usage

# Focused code generation
claude "Create a simple React component"       # Moderate usage

# Direct commands
claude "Run the test suite"                    # Low usage
```

## 🔧 Context Optimization Strategies

### 1. Strategic Subagent Usage

#### When to Use Subagents
- **Preserve main context** for important ongoing work
- **Delegate specialized tasks** that don't need main conversation history
- **Handle parallel operations** without context interference
- **Isolate experimental** or exploratory work

```bash
# ✅ Good: Delegate debugging to preserve main context
claude "Use debug-expert subagent to investigate this memory leak while I continue with feature development"

# ❌ Avoid: Mixing debugging with main development conversation
claude "Let me debug this memory leak... [long debugging session] ...now back to the feature"
```

#### Subagent Context Benefits
- **Fresh context** for each subagent task
- **Specialized knowledge** without cluttering main conversation
- **Parallel processing** without context conflicts
- **Task isolation** for cleaner conversation management

### 2. Context Window Management

#### Monitor Context Usage
```bash
# Check current context usage (if available)
claude "How much context am I currently using?"

# Be aware of context-heavy operations
claude "Before reading all these files, let me check if I need all of them"
```

#### Context Pruning Strategies
- **Summarize conclusions** before moving to new topics
- **Extract key information** into separate notes
- **Use subagents** for information gathering
- **Break complex tasks** into focused sessions

### 3. Information Architecture

#### Structured Information Hierarchy
```markdown
## Context Priority Levels

### High Priority (Keep in Main Context)
- Current primary objective
- Key architectural decisions
- Critical constraints and requirements
- Recent important discoveries

### Medium Priority (Summarize or Reference)
- Implementation details from earlier
- Previous exploration results
- Background information
- Supporting documentation

### Low Priority (Move to Subagents or External)
- Exploratory investigations
- Alternative approaches considered
- Detailed debugging sessions
- Extensive research results
```

#### Context Bookmarking
```bash
# Create checkpoints in long conversations
claude "Let me summarize what we've accomplished so far before continuing..."

# Reference external resources instead of including full content
claude "Based on the React documentation (link), let's implement..."

# Use file references instead of reading entire files
claude "Looking at the structure in src/components/Button.tsx..."
```

## 🎯 Advanced Context Techniques

### Context Compression Strategies

#### Progressive Summarization
```markdown
## Long Session Management

### Every 20-30 exchanges:
1. **Summarize key decisions** made so far
2. **Document current state** of the work  
3. **Note next steps** clearly
4. **Archive detailed discussions** that are complete

### Example Compression:
❌ Long: "Earlier we discussed whether to use Redux or Zustand, looked at bundle sizes, considered team familiarity, debated TypeScript integration, examined middleware options..."

✅ Compressed: "Decided on Zustand for state management due to smaller bundle size and simpler TypeScript integration."
```

#### Information Layering
```markdown
## Layered Context Strategy

### Layer 1: Core Context (Always Present)
- Current objective and constraints
- Key architectural decisions
- Critical next steps

### Layer 2: Working Context (Recent Activity)
- Current implementation details
- Recent problem-solving discussions
- Active debugging or development

### Layer 3: Reference Context (As Needed)
- Background information
- Alternative approaches
- Detailed research and exploration
```

### Context-Aware Planning

#### Session Design
```bash
# Plan context-intensive activities
claude "I need to analyze 10 large files. Let me use subagents to process them individually and report back key findings."

# Instead of:
claude "Let me read through all these files one by one..." # Uses massive context
```

#### Context Budgeting
```markdown
## Context Budget Planning

### High-Context Activities (Use Sparingly)
- Reading multiple large files
- Complex multi-step debugging
- Extensive research and exploration
- Long architectural discussions

### Context-Efficient Alternatives
- **File analysis**: Use subagents to process and summarize
- **Debugging**: Isolate to specialized subagents
- **Research**: External tools or focused sessions
- **Architecture**: Document decisions, use diagrams
```

## 📈 Context Performance Monitoring

### Quality Indicators

#### Signs of Good Context Management
- **Consistent response quality** throughout session
- **Relevant references** to earlier conversation
- **Coherent decision tracking** across topics
- **Efficient problem-solving** without repetition

#### Signs of Context Issues
- **Degraded response quality** over time
- **Loss of conversation thread** or repetitive questions
- **Inconsistent recommendations** compared to earlier
- **Forgotten previous decisions** or context

### Context Health Checks
```bash
# Periodic context quality assessment
claude "Can you remind me of the key decisions we've made in this session?"

# Test context retention
claude "Based on our earlier discussion about [specific topic], what should our next step be?"

# Identify context overload
claude "Are you still tracking all the context from our conversation effectively?"
```

## 🔄 Context Refresh Strategies

### When to Refresh Context

#### Conversation Restart Triggers
- **Quality degradation** in responses
- **Loss of coherent thread** across topics
- **Approaching context limits** (if detectable)
- **Major topic shifts** or project phases
- **Complex debugging sessions** complete

#### Context Handoff Techniques
```bash
# Summarize and restart
claude "Let me summarize our progress: [key points]. Now let's start fresh with the next phase."

# Export context to external systems
claude "Let me document our architectural decisions in a separate file before we continue."

# Use subagents for continuation
claude "Pass the current state to a specialized subagent for the implementation phase."
```

### Context Continuity Strategies

#### State Documentation
```markdown
## Session State Template

### Project Status
- **Current Objective**: [What we're working on now]
- **Progress Made**: [Key accomplishments this session]
- **Key Decisions**: [Important choices made]
- **Next Steps**: [Immediate priorities]

### Technical Context
- **Architecture**: [Key architectural decisions]
- **Tech Stack**: [Technologies and versions in use]
- **Constraints**: [Limitations and requirements]
- **Dependencies**: [Critical integrations or dependencies]

### Context Notes
- **Files Modified**: [List of changed files]
- **Commands Run**: [Important commands executed]
- **Issues Found**: [Problems discovered and solutions]
- **Resources**: [Links, documentation, references]
```

## 🛠️ Practical Context Management

### Daily Workflow Integration

#### Session Planning
```bash
# Morning context planning
claude "Today's objective: [goal]. Context strategy: [approach]. Expected context usage: [high/medium/low]"

# Pre-task context check
claude "Before starting this complex task, let me ensure we have optimal context allocation."
```

#### Mid-Session Management
```bash
# Context checkpoints
claude "Let me summarize our progress before diving into the next complex topic."

# Context optimization
claude "This research task would be better handled by a subagent to preserve our main context."
```

#### End-of-Session Cleanup
```bash
# Context summarization
claude "Let me create a summary of today's work and decisions for future reference."

# State documentation
claude "Document the current project state for tomorrow's session."
```

### Team Context Strategies

#### Shared Context Management
- **Documentation standards** for context handoffs
- **State summaries** for team member transitions
- **Context templates** for consistent session structures
- **Subagent libraries** for common context-intensive tasks

#### Context Collaboration Patterns
```bash
# Team member handoff
claude "Here's the project state summary for the next team member: [structured summary]"

# Context sharing strategies
claude "Use this subagent configuration to maintain consistent context across team sessions."
```

## 🎯 Context Optimization Examples

### Before Optimization
```bash
# Inefficient context usage
claude "Read file1.js, file2.js, file3.js... [reads 20 files]"
claude "Now analyze all these files for security issues"
claude "Also check for performance problems"
claude "And look for code style issues"  # Context getting cluttered
```

### After Optimization
```bash
# Efficient context usage
claude "Use security-audit subagent to analyze files 1-10 for security issues"
claude "Use performance-analyzer subagent to check files 11-20 for performance"
claude "Compile the findings from both subagents and provide recommendations"
```

## 📚 Context Management Best Practices

### Do's ✅
- **Use subagents** for specialized or context-heavy tasks
- **Summarize progress** regularly in long sessions
- **Plan context usage** for complex operations
- **Monitor response quality** as sessions progress
- **Document key decisions** for future reference

### Don'ts ❌
- **Read unnecessary files** into context
- **Mix unrelated tasks** in the same conversation
- **Ignore quality degradation** signs
- **Overload context** with experimental work
- **Forget to manage** context in long sessions

### Emergency Context Recovery
```bash
# When context becomes problematic
claude "I notice the conversation quality declining. Let me summarize our key progress and restart with fresh context."

# Context reset with state preservation
claude "Export our current architectural decisions to a document, then let's continue with optimized context."
```

Remember: Effective context management is like maintaining a clean workspace - it keeps you productive, focused, and able to build on previous work efficiently. The goal is to maximize the value of your limited context window while maintaining conversation quality and continuity.

---

*Context is your most valuable resource in Claude Code. Manage it strategically to maintain high-quality interactions throughout your development workflow.*