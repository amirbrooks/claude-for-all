# 🎯 Token Optimization

> Master efficient token usage to maximize value and minimize costs

## 📖 Overview

Token optimization is crucial for cost-effective Claude Code usage. Understanding how tokens work, what consumes them, and how to minimize waste while maintaining quality can dramatically reduce your costs and improve efficiency.

## 🧠 Understanding Tokens

### What Are Tokens?

Tokens are the fundamental units that Claude Code uses to process text:
- **Input tokens**: Your prompts, context, and uploaded content
- **Output tokens**: Claude's responses and generated content
- **Roughly 4 characters = 1 token** (varies by language and content type)

### Token Consumption Examples

```markdown
Text: "Hello world"
Tokens: ~3 tokens

Text: "Create a React component"
Tokens: ~5 tokens

Text: "Please help me create a responsive React TypeScript component that displays user profile information including name, email, avatar, and bio with proper styling and accessibility features"
Tokens: ~32 tokens
```

### Token Pricing Impact

Understanding token costs helps optimize usage:
- **Claude 3.5 Sonnet**: $3/M input tokens, $15/M output tokens
- **Daily usage example**: 50K tokens = ~$0.15-0.75 depending on input/output ratio
- **Monthly cost**: Can range from $10-300+ based on usage patterns

## 📊 Token Consumption Analysis

### High Token Activities

#### 1. **Large Context Windows**
```markdown
❌ High consumption:
"Here's my entire 500-line codebase: [massive code dump]
Now fix this small bug on line 47"

Tokens used: ~2,000 tokens for context + response

✅ Optimized approach:
"Bug in user authentication (line 47): 
[relevant 10-line code snippet]
Error: 'Cannot read property id of undefined'"

Tokens used: ~200 tokens + response
Savings: 90% reduction
```

#### 2. **Verbose Prompts**
```markdown
❌ Verbose (150 tokens):
"I'm currently working on a web application project using React and TypeScript, and I'm having some difficulties with creating a component that needs to display user information. Specifically, I need help creating a component that shows a user's profile details in a clean and organized way."

✅ Concise (25 tokens):
"Create React TypeScript component to display user profile details cleanly"

Savings: 83% reduction
```

#### 3. **Repetitive Context**
```markdown
❌ Repetitive context in conversation:
Prompt 1: "In my React TypeScript project using Tailwind CSS..."
Prompt 2: "In my React TypeScript project using Tailwind CSS..."
Prompt 3: "In my React TypeScript project using Tailwind CSS..."

✅ Context reference:
Prompt 1: "React TypeScript project with Tailwind CSS"
Prompt 2: "For the project we discussed..."
Prompt 3: "Building on the previous component..."
```

### Medium Token Activities

#### Code Generation
```markdown
Typical consumption:
- Simple component: 800-1,200 tokens
- Complex feature: 2,000-4,000 tokens
- Full module: 4,000-8,000 tokens
```

#### Code Reviews
```markdown
Typical consumption:
- Function review: 500-1,000 tokens
- Component review: 1,000-2,000 tokens
- Architecture review: 3,000-6,000 tokens
```

### Low Token Activities

#### Quick Questions
```markdown
Examples:
- "How do I center a div?" (~50 tokens)
- "What's the React useEffect syntax?" (~100 tokens)
- "Fix this TypeScript error" (~150 tokens)
```

## 🎯 Optimization Strategies

### 1. **Prompt Compression Techniques**

#### Remove Unnecessary Words
```markdown
❌ Before: "I would like you to please help me create"
✅ After: "Create"

❌ Before: "Could you possibly show me how to"
✅ After: "Show how to"

❌ Before: "I'm wondering if it would be possible to"
✅ After: "Can I"
```

#### Use Abbreviations and Shorthand
```markdown
❌ Long form: "TypeScript React component"
✅ Short form: "TS React component"

❌ Long form: "JavaScript object notation"
✅ Short form: "JSON"

❌ Long form: "Cascading Style Sheets"
✅ Short form: "CSS"
```

#### Structured Requests
```markdown
❌ Narrative style:
"I need to build a login form and it should have email and password fields, and I want it to validate the inputs, and also handle form submission with error handling"

✅ Structured:
"Create login form:
- Fields: email, password
- Validation: email format, required fields
- Error handling on submit"
```

### 2. **Context Optimization**

#### Smart Context Management
```markdown
// Session Context Pattern
Prompt 1: "Project: React TS e-commerce, using Redux, Tailwind CSS"
Prompt 2: "Add shopping cart to our e-commerce project"
Prompt 3: "Update cart component with quantity controls"

Instead of repeating full context each time
```

#### Context Layering
```markdown
Layer 1 (Session): Tech stack, project type, key decisions
Layer 2 (Task): Current feature, specific requirements  
Layer 3 (Request): Immediate action needed

Example:
"For our React TS project (established context), 
in the user dashboard feature (task context), 
add profile edit button (specific request)"
```

#### Context References
```markdown
❌ Repeat everything:
"In the authentication system we built with JWT tokens, refresh token rotation, role-based access control, and secure password hashing, now I want to add..."

✅ Reference established context:
"In our JWT auth system, add password reset functionality"
```

### 3. **Response Format Optimization**

#### Specify Desired Length
```markdown
❌ Unlimited response:
"Explain how React hooks work"
(Could generate 2,000+ token response)

✅ Length-controlled:
"Explain React hooks in 3 key points with brief examples"
(Typically 300-500 token response)
```

#### Request Specific Formats
```markdown
❌ Open-ended:
"Help me with this code"

✅ Format-specific:
"Review this code, return only:
1. Critical issues found
2. Specific fixes needed  
3. Performance improvements"
```

#### Exclude Unnecessary Content
```markdown
✅ Targeted request:
"Create React component - code only, no explanations"

✅ Skip boilerplate:
"Show implementation changes only, skip imports/exports"

✅ Focus on specifics:
"Just the validation logic, not the full form"
```

### 4. **Batch Optimization**

#### Combine Related Requests
```markdown
❌ Separate requests (3x token overhead):
Request 1: "Create User component"
Request 2: "Create UserList component"  
Request 3: "Create UserCard component"

✅ Batched request (1x token overhead):
"Create 3 user-related components:
1. User - individual user display
2. UserList - array of users
3. UserCard - compact user summary"
```

#### Template-Based Batching
```markdown
Template approach:
"Create CRUD components for these entities using standard pattern:
- User (fields: name, email, avatar)
- Product (fields: title, price, description)
- Order (fields: id, date, total, status)

Standard pattern: List view, Detail view, Edit form"
```

## 📈 Token Efficiency Patterns

### 1. **The Reference Pattern**

Build on previous context efficiently:

```markdown
Conversation Flow:
1. "Create React auth system with JWT tokens"
2. "Add password reset to auth system" (references #1)
3. "Add email verification to auth flow" (references #1-2)
4. "Add 2FA to complete auth system" (references #1-3)

Token savings: 60-80% vs repeating full context
```

### 2. **The Template Pattern**

Create reusable prompt templates:

```yaml
# Component Template
"Create {{type}} component:
- Name: {{name}}
- Props: {{props}}
- Features: {{features}}
- Style: {{style}}"

# Usage
"Create form component:
- Name: ContactForm
- Props: onSubmit, initialData
- Features: validation, error display
- Style: Tailwind CSS"
```

### 3. **The Incremental Pattern**

Build complexity gradually:

```markdown
Phase 1: "Create basic user registration form"
Phase 2: "Add email validation to registration"
Phase 3: "Add password strength checking"
Phase 4: "Add terms acceptance checkbox"

Benefits:
- Smaller token chunks
- Early validation of approach
- Easier debugging
- Better quality control
```

### 4. **The Specification Pattern**

Use structured specifications:

```yaml
Feature: User Dashboard
Requirements:
  - Display: user stats, recent activity, quick actions
  - Data: fetch from /api/dashboard endpoint
  - Auth: require logged-in user
  - Style: responsive grid layout
Constraints:
  - Load time < 2 seconds
  - Mobile-first design
  - Accessibility compliant
```

## 🔧 Advanced Optimization Techniques

### 1. **Context Compression**

#### Summarization Technique
```markdown
Long conversation summary:
"Previous 50 messages covered:
- Project setup: React TS, Vite, Tailwind
- Auth system: JWT with refresh tokens
- Database: PostgreSQL with Prisma
- Current task: Adding user profile management"

Use this summary to reference previous context (90% token reduction)
```

#### Key Decision Extraction
```markdown
From lengthy architectural discussion:
"Architecture decisions made:
- Microservices over monolith
- Event-driven communication
- PostgreSQL for transactional data
- Redis for caching
- Docker containerization"
```

### 2. **Smart Prompting**

#### Conditional Logic
```markdown
"Create user component with these conditional features:
IF mobile: show compact view
IF admin user: show admin controls  
IF loading: show skeleton loader
ELSE: show full user details"

More efficient than separate components/requests
```

#### Parameter-Based Requests
```json
{
  "task": "create_component",
  "type": "user_profile",
  "features": ["avatar", "edit_button", "status_indicator"],
  "style": "tailwind",
  "responsive": true
}
```

### 3. **Response Optimization**

#### Response Length Control
```markdown
❌ Open-ended: "Explain authentication"
(Could be 2,000+ tokens)

✅ Controlled: "Explain authentication in 5 bullet points"
(Typically 200-400 tokens)

✅ Ultra-brief: "Authentication definition + 2 examples"
(Typically 50-100 tokens)
```

#### Format Specifications
```markdown
Request specific formats:
- "Code only, no comments"
- "Implementation steps as numbered list"  
- "Key points in table format"
- "Summary in 3 sentences max"
```

## 📊 Token Monitoring and Analytics

### Usage Tracking

Monitor your token consumption patterns:

```yaml
Daily Tracking:
  Input Tokens: 25,000
  Output Tokens: 15,000
  Total Cost: $0.30
  Most Expensive: Code generation (40%)
  Most Efficient: Quick questions (5%)

Weekly Analysis:
  Token Trend: Decreasing 15%
  Efficiency Improvement: 23%
  Cost per Task: $0.08 (down from $0.12)
  Top Waste: Verbose prompts (30% of excess)
```

### Optimization Opportunities

Identify areas for improvement:

```yaml
High Impact Optimizations:
  1. Prompt compression: 40% savings potential
  2. Context reuse: 25% savings potential
  3. Response formatting: 20% savings potential
  4. Batch processing: 30% savings potential

Quick Wins:
  - Remove filler words from prompts
  - Use abbreviations consistently
  - Reference previous context
  - Specify response length limits
```

## 🎯 Optimization Tools and Techniques

### 1. **Prompt Templates**

Create a library of optimized prompts:

```yaml
# Code Review Template (Optimized)
"Review {{file_name}} for:
- Security issues
- Performance problems  
- Best practice violations
Return: issue + fix for each"

# Component Creation Template (Optimized)
"Create {{component_type}}:
- Name: {{name}}
- Props: {{props}}
- Features: {{feature_list}}
Include: TS types, basic styling"
```

### 2. **Context Libraries**

Build reusable context blocks:

```yaml
# Project Context (50 tokens)
"React TS project, Vite build, Tailwind CSS, Jest testing"

# Tech Stack Context (30 tokens)  
"Stack: React 18, TypeScript, Tailwind, Prisma, PostgreSQL"

# API Context (40 tokens)
"REST API: Express, JWT auth, validation middleware, error handling"
```

### 3. **Abbreviation Dictionary**

Standardize abbreviations:

```yaml
Common Abbreviations:
  - TS = TypeScript
  - JS = JavaScript
  - CSS = Cascading Style Sheets
  - HTML = HyperText Markup Language
  - API = Application Programming Interface
  - DB = Database
  - UI = User Interface
  - UX = User Experience
  - CRUD = Create Read Update Delete
  - JWT = JSON Web Token
```

### 4. **Response Format Library**

Template response formats:

```yaml
Code Only: "Return implementation code only"
Brief Explanation: "Explain in 3 bullet points max"
Step-by-Step: "Numbered steps, 1 sentence each"
Problem-Solution: "Issue description + specific fix"
Comparison: "Option A vs B, pros/cons only"
```

## 📈 Measuring Optimization Success

### Key Metrics

Track these indicators of optimization success:

#### Efficiency Metrics
- **Tokens per task**: Decreasing over time
- **Cost per deliverable**: Reducing month over month
- **Success rate**: Maintaining high quality with fewer tokens
- **Iteration ratio**: First-attempt success increasing

#### Quality Metrics
- **Response relevance**: Getting exactly what you need
- **Implementation success**: Code works without modification
- **Completeness**: Requirements met in single response
- **Accuracy**: Fewer corrections needed

#### Time Metrics
- **Response time**: Faster due to shorter prompts
- **Total task time**: Including iterations and refinements
- **Context switching**: Less time spent providing context
- **Problem resolution**: End-to-end completion time

### Optimization Benchmarks

| Optimization Level | Tokens/Task | Cost/Task | Success Rate |
|--------------------|-------------|-----------|--------------|
| Unoptimized | 4,000 | $0.15 | 75% |
| Basic | 2,800 | $0.11 | 80% |
| Intermediate | 2,000 | $0.08 | 85% |
| Advanced | 1,400 | $0.06 | 90% |
| Expert | 1,000 | $0.04 | 92% |

## 🚨 Common Token Waste Patterns

### Avoid These Mistakes

#### 1. **Prompt Bloat**
```markdown
❌ "I'm working on a project and I was wondering if you could help me with something. I need to create a component and I'm not sure how to approach it..."

✅ "Create React component for user profile display"
```

#### 2. **Context Repetition**
```markdown
❌ Repeating full project context in every prompt
✅ Reference established context: "In our e-commerce project..."
```

#### 3. **Over-Specification**
```markdown
❌ "Create a component with every possible feature"
✅ "Create basic component, we'll add features incrementally"
```

#### 4. **Unnecessary Explanations**
```markdown
❌ "Explain everything about React hooks"
✅ "Show useState and useEffect examples"
```

### Recovery Strategies

When you notice token waste:

1. **Audit Recent Conversations**
   - Identify repetitive patterns
   - Note unnecessary verbosity
   - Find context redundancy

2. **Create Optimization Templates**
   - Build concise prompt patterns
   - Establish context shortcuts
   - Define response formats

3. **Implement Monitoring**
   - Track daily token usage
   - Set spending alerts
   - Review weekly patterns

4. **Refine Gradually**
   - Start with biggest wins
   - Test optimization impact
   - Maintain quality standards

---

Master token optimization to maximize your Claude Code investment! 🎯💰