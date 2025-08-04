# 🔄 Automation Patterns

> Master the art of creating powerful automated workflows with Claude Code

## 📖 Overview

Automation patterns are reusable templates and strategies for building efficient workflows. This guide covers everything from basic file operations to complex multi-agent orchestrations.

## 🎯 Core Patterns

### 1. Sequential Processing

The most basic pattern - execute operations one after another.

```yaml
---
description: "Process files in sequence"
allowed-tools: ["Read", "Write", "Edit"]
---

1. Read the input file
2. Process the content
3. Validate the results  
4. Write the output file
5. Log the operation
```

**Use Cases:**
- File transformations
- Data processing pipelines
- Build processes
- Report generation

**Example Implementation:**
```bash
claude "Convert all markdown files to HTML:
1. Find all .md files
2. For each file:
   - Read content
   - Convert to HTML
   - Write .html file
3. Generate index.html
4. Create summary report"
```

### 2. Conditional Branching

Make decisions based on conditions.

```yaml
---
description: "Smart file processing with conditions"
allowed-tools: ["Read", "Write", "Grep", "Bash"]
---

Check if configuration exists:
  IF exists:
    - Load configuration
    - Validate settings
  ELSE:
    - Create default config
    - Prompt for values
    
Process based on file type:
  IF .js/.ts:
    - Run ESLint
    - Check types
  IF .py:
    - Run Black formatter
    - Check with mypy
  IF .md:
    - Check links
    - Validate frontmatter
```

**Decision Patterns:**
```
File existence: IF file exists THEN update ELSE create
Content check: IF contains pattern THEN process ELSE skip
Size check: IF file > 1MB THEN split ELSE process whole
Date check: IF modified today THEN include ELSE ignore
```

### 3. Parallel Execution

Run multiple operations simultaneously for efficiency.

```yaml
---
description: "Parallel analysis workflow"
allowed-tools: ["Read", "Grep", "Task", "WebSearch"]
---

SIMULTANEOUSLY execute:
  - Task 1: Analyze code complexity
  - Task 2: Check security vulnerabilities  
  - Task 3: Review documentation coverage
  - Task 4: Scan for TODOs and FIXMEs

THEN combine results into unified report
```

**Parallel Patterns:**
```bash
# Launch multiple subagents
claude "Analyze project:
PARALLEL:
  - Launch code-quality agent
  - Launch security-scan agent
  - Launch performance-check agent
  - Launch documentation-review agent
  
Combine all reports into executive summary"
```

### 4. Iterative Processing

Loop through collections with smart handling.

```yaml
---
description: "Batch process with iteration"
allowed-tools: ["Read", "Write", "Edit", "Glob"]
---

FOR each file in directory:
  1. Read file
  2. Check if needs processing
  3. Apply transformations
  4. Validate output
  5. Track progress
  
IF errors:
  - Log failed files
  - Continue with next
  - Report summary at end
```

**Iterator Examples:**
```bash
# Process all test files
claude "For each test file:
1. Check test coverage
2. Identify missing tests
3. Generate test stubs
4. Update test documentation"

# Batch refactoring
claude "For each component:
1. Convert class to function
2. Add TypeScript types
3. Update imports
4. Fix linting issues"
```

### 5. Error Recovery

Graceful error handling with recovery strategies.

```yaml
---
description: "Robust workflow with error handling"
allowed-tools: ["Read", "Write", "Bash", "Edit"]
---

TRY:
  - Execute main operation
  - Validate results
  
CATCH specific errors:
  - FileNotFound: Create file with defaults
  - PermissionError: Request elevated access
  - ValidationError: Log and skip
  - NetworkError: Retry with backoff
  
FINALLY:
  - Clean up temporary files
  - Generate summary report
  - Notify completion
```

**Recovery Strategies:**
```
Retry with backoff:
  - Attempt 1: Immediate
  - Attempt 2: Wait 1s
  - Attempt 3: Wait 5s
  - Attempt 4: Wait 30s
  - Fail: Log and notify

Fallback options:
  - Primary: Use API
  - Fallback 1: Use cache
  - Fallback 2: Use defaults
  - Final: Manual intervention
```

## 🔧 Advanced Patterns

### 6. State Management

Maintain state across workflow steps.

```yaml
---
description: "Stateful processing workflow"
allowed-tools: ["Read", "Write", "Edit"]
---

Initialize state:
  processed_files: []
  errors: []
  metrics: {}

For each operation:
  - Update processed_files
  - Track metrics
  - Log any errors
  
Save state periodically:
  - Every 10 files
  - On errors
  - Before long operations
  
Resume from saved state if interrupted
```

**State Patterns:**
```javascript
// State file structure
{
  "workflow": "data-migration",
  "started": "2024-01-15T10:00:00Z",
  "progress": {
    "total": 1000,
    "processed": 450,
    "failed": 3
  },
  "checkpoint": "phase-2",
  "next_file": "data/file451.csv"
}
```

### 7. Pipeline Composition

Chain workflows into complex pipelines.

```yaml
---
description: "Multi-stage pipeline"
allowed-tools: ["Read", "Write", "Task", "Bash"]
---

PIPELINE:
  Stage 1: Data Collection
    - Gather from multiple sources
    - Validate and clean
    - OUTPUT: cleaned_data/
    
  Stage 2: Processing
    - INPUT: cleaned_data/
    - Transform and enrich
    - OUTPUT: processed_data/
    
  Stage 3: Analysis
    - INPUT: processed_data/
    - Generate insights
    - OUTPUT: reports/
    
  Stage 4: Distribution
    - INPUT: reports/
    - Format for audiences
    - Send notifications
```

### 8. Event-Driven Workflows

React to events and triggers.

```yaml
---
description: "Event-responsive workflow"
allowed-tools: ["Read", "Write", "Bash", "WebSearch"]
---

ON file_created:
  - Validate file format
  - Process content
  - Update indexes
  
ON pull_request:
  - Run tests
  - Check coverage
  - Generate report
  
ON schedule (daily):
  - Aggregate metrics
  - Clean old files
  - Send summary
  
ON manual_trigger:
  - Full system scan
  - Generate documentation
  - Deploy updates
```

### 9. Template Expansion

Use templates for consistent output.

```yaml
---
description: "Template-based generation"
allowed-tools: ["Read", "Write"]
---

Load template based on type:
  - Report: templates/report.md
  - Email: templates/email.md
  - Code: templates/component.tsx

Gather variables:
  - Extract from context
  - Calculate metrics
  - Format dates/times

Expand template:
  - Replace variables
  - Process conditionals
  - Include partials

Post-process:
  - Format output
  - Validate result
  - Save to destination
```

**Template Example:**
```markdown
# {{project}} Status Report

**Date**: {{date}}
**Sprint**: {{sprint_number}}

## Summary
{{#if all_tests_passing}}
✅ All systems operational
{{else}}
⚠️ {{failed_tests}} tests failing
{{/if}}

## Metrics
- Velocity: {{velocity}} points
- Coverage: {{coverage}}%
- Bug Count: {{bug_count}}

## Next Steps
{{#each next_steps}}
- {{this}}
{{/each}}
```

### 10. Intelligent Routing

Route tasks based on content or conditions.

```yaml
---
description: "Smart task routing"
allowed-tools: ["Read", "Task", "Grep"]
---

Analyze input:
  - Determine type
  - Check complexity
  - Assess requirements

Route to appropriate handler:
  IF code_review:
    → Launch code-review-expert
  IF bug_fix:
    → Launch debug-expert
  IF documentation:
    → Launch docs-expert
  IF performance:
    → Launch performance-expert
    
Combine results:
  - Merge outputs
  - Resolve conflicts
  - Generate summary
```

## 📊 Pattern Combinations

### Full Project Automation

Combine multiple patterns for complex workflows:

```yaml
---
description: "Complete project automation"
allowed-tools: ["Read", "Write", "Bash", "Task", "WebSearch"]
---

1. PARALLEL: Initial Analysis
   - Code quality scan
   - Security audit  
   - Documentation check
   - Dependency analysis

2. CONDITIONAL: Address Issues
   IF security_issues:
     - Generate patches
     - Update dependencies
   IF quality_issues:
     - Refactor code
     - Fix linting
   IF missing_docs:
     - Generate documentation
     
3. ITERATIVE: Process Files
   FOR each module:
     - Apply fixes
     - Update tests
     - Regenerate docs
     
4. PIPELINE: Build & Deploy
   - Run test suite
   - Build artifacts
   - Deploy to staging
   - Run smoke tests
   
5. EVENT: Monitor Results
   ON test_failure:
     - Rollback
     - Notify team
   ON success:
     - Deploy to production
     - Update documentation
```

### Intelligent Content Pipeline

```yaml
---
description: "AI-powered content workflow"
allowed-tools: ["Read", "Write", "WebSearch", "Task"]
---

1. Content Planning
   - Research trending topics
   - Analyze audience interests
   - Generate content calendar

2. Content Creation (PARALLEL)
   - Draft main content
   - Create supporting graphics
   - Research citations
   - Generate metadata

3. Optimization (PIPELINE)
   - SEO optimization
   - Readability check
   - Fact verification
   - Plagiarism scan

4. Distribution (CONDITIONAL)
   IF blog_post:
     - Format for CMS
     - Schedule publication
   IF social_media:
     - Create variants
     - Schedule posts
   IF newsletter:
     - Format email
     - Segment audience

5. Analysis (EVENT-DRIVEN)
   AFTER publication:
     - Track metrics
     - Gather feedback
     - Generate reports
```

## 🛠️ Implementation Tips

### Start Simple
1. Begin with sequential workflows
2. Add conditions as needed
3. Introduce parallelism carefully
4. Build error handling incrementally

### Test Thoroughly
```bash
# Test with sample data
claude "Run workflow on test-data/"

# Dry run mode
claude "Simulate workflow without writing files"

# Verbose logging
claude "Run workflow with detailed logging"
```

### Monitor Performance
- Track execution time
- Log resource usage
- Identify bottlenecks
- Optimize iteratively

### Version Control
```yaml
---
version: "1.2.0"
changelog:
  - v1.2.0: Added parallel processing
  - v1.1.0: Improved error handling
  - v1.0.0: Initial workflow
---
```

## 🎯 Real-World Examples

### Automated Code Review
```bash
claude "Review all changed files:
1. Get list of modified files from git
2. For each file (PARALLEL):
   - Check code style
   - Run security scan
   - Verify test coverage
   - Analyze complexity
3. IF issues found:
   - Generate fix suggestions
   - Create review comments
4. Generate summary report
5. Post to pull request"
```

### Documentation Generation
```bash
claude "Generate complete documentation:
1. Scan codebase for all public APIs
2. Extract JSDoc comments
3. Generate API reference
4. Create usage examples
5. Build interactive docs site
6. Deploy to GitHub Pages"
```

### Dependency Management
```bash
claude "Update all dependencies safely:
1. Check for updates
2. For each update:
   - Read changelog
   - Assess breaking changes
   - Update in test branch
   - Run full test suite
3. IF tests pass:
   - Merge updates
   - Update documentation
ELSE:
   - Log issues
   - Create tickets"
```

## 🚨 Common Pitfalls

### Avoid These Mistakes

1. **Over-Engineering**
   - Start simple, add complexity gradually
   - Don't automate everything at once

2. **Poor Error Handling**
   - Always include error cases
   - Provide meaningful error messages

3. **Missing Validation**
   - Validate inputs before processing
   - Verify outputs meet requirements

4. **Resource Exhaustion**
   - Limit parallel operations
   - Include timeouts
   - Monitor memory usage

5. **Lack of Idempotency**
   - Ensure workflows can be re-run safely
   - Check before creating/modifying

## 📚 Pattern Library

### Quick Reference

| Pattern | Use Case | Complexity |
|---------|----------|------------|
| Sequential | Simple transformations | Low |
| Conditional | Decision-based processing | Medium |
| Parallel | Multi-task operations | Medium |
| Iterative | Batch processing | Medium |
| Pipeline | Multi-stage workflows | High |
| Event-Driven | Reactive automation | High |
| State Management | Long-running processes | High |
| Template Expansion | Consistent generation | Low |
| Error Recovery | Robust operations | Medium |
| Intelligent Routing | Dynamic task allocation | High |

## 🤝 Next Steps

1. Explore [Custom Commands](custom-commands/) for ready-to-use workflows
2. Read [Daily Routines](daily-routines.md) for productivity patterns
3. Check [Team Collaboration](team-collaboration.md) for multi-user workflows
4. Join the [Community](https://discord.gg/claude-code) to share patterns

---

Master these patterns to unlock the full potential of Claude Code automation! 🚀