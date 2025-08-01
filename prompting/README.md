# 📝 Prompting & Techniques

> Master the art of effective communication with Claude Code

## 📖 Overview

Effective prompting is the key to maximizing Claude Code's capabilities. This section covers advanced prompting techniques, thinking modes, plan mode usage, and strategies for maintaining consistent voice and quality across your interactions.

## 📚 Contents

### 🎯 [Effective Prompting](effective-prompting.md)
Core techniques for clear, actionable communication:
- Structuring requests for optimal results
- Providing context and constraints
- Breaking down complex tasks
- Error handling and iteration strategies

### 🧠 [Thinking Modes](thinking-modes.md)
Deep dive into Claude's enhanced reasoning capabilities:
- **think**: Basic reasoning and analysis
- **think hard**: Complex problem solving
- **ultrathink**: Maximum cognitive effort for difficult challenges

### 📋 [Plan Mode Guide](plan-mode-guide.md)
Comprehensive guide to using Plan Mode effectively:
- When to use plan mode (Shift+Tab)
- Planning complex multi-step tasks
- Reviewing and approving plans
- Optimizing for reliability and quality

### 🎭 [Voice Consistency](voice-consistency.md)
Maintaining consistent tone and style:
- Defining your voice profile
- Training Claude on your communication style
- Ensuring brand alignment
- Adapting voice for different audiences

### 🚀 [Advanced Techniques](advanced-techniques.md)
Sophisticated prompting patterns:
- Multi-step workflows
- Conditional logic
- Template systems
- Integration patterns

### 💡 [Prompt Examples](examples/)
Real-world examples by category:
- Coding and development
- Debugging and troubleshooting
- Architecture and design
- Content creation

## 🚀 Quick Start

### Basic Prompting Formula

```
CONTEXT + TASK + FORMAT + CONSTRAINTS = GREAT RESULTS

CONTEXT: "I'm working on a React TypeScript project..."
TASK: "Create a reusable Button component..."
FORMAT: "Include TypeScript interfaces, JSDoc, and tests..."
CONSTRAINTS: "Follow our team's style guide and use Tailwind CSS..."
```

### Thinking Mode Quick Reference

```bash
# Basic analysis
"Analyze this code for potential issues"

# Complex problem solving  
"think hard: How can I optimize this database query for better performance?"

# Maximum reasoning power
"ultrathink: Design a scalable architecture for handling 1M concurrent users"
```

### Plan Mode Activation

```
Press Shift+Tab before complex requests to activate Plan Mode:
- Multi-file operations
- Complex refactoring tasks
- System architecture changes
- Large-scale implementations
```

## 🎯 Key Principles

### 1. **Be Specific and Clear**
```markdown
❌ Vague: "Fix this code"
✅ Specific: "Fix the memory leak in this React component by properly cleaning up event listeners in useEffect"
```

### 2. **Provide Sufficient Context**
```markdown
❌ No context: "Add authentication"
✅ With context: "Add JWT-based authentication to this Express.js API, following our existing middleware pattern in auth.js"
```

### 3. **Define Success Criteria**
```markdown
❌ Open-ended: "Make it better"
✅ Clear criteria: "Improve performance to load under 2 seconds and achieve 95+ Lighthouse score"
```

### 4. **Use Progressive Refinement**
```markdown
1. Start with high-level request
2. Review initial response
3. Refine with specific feedback
4. Iterate until satisfied
```

## 🧩 Prompting Patterns

### The STAR Method

**S**ituation: Current state and context  
**T**ask: What needs to be accomplished  
**A**ction: Specific actions to take  
**R**esult: Expected outcome and format  

```
Situation: "I have a slow-loading React app with bundle size issues"
Task: "Optimize the application for better performance"
Action: "Analyze bundle size, implement code splitting, optimize images"
Result: "Provide specific recommendations with implementation code"
```

### The Component Pattern

Break complex requests into components:

```
Primary Goal: [Main objective]
Sub-tasks:
1. [Specific task 1]
2. [Specific task 2]  
3. [Specific task 3]

Constraints:
- [Requirement 1]
- [Requirement 2]

Output Format:
- [Format specification]
```

### The Iterative Pattern

Build complexity gradually:

```
Phase 1: "Create a basic user authentication system"
Phase 2: "Add role-based permissions to the auth system"
Phase 3: "Implement session management and refresh tokens"
Phase 4: "Add OAuth integration with Google and GitHub"
```

## 🎭 Voice and Style

### Establishing Your Voice

Define your communication preferences:

```yaml
Technical Level: Senior developer
Communication Style: Direct and concise
Code Preferences: TypeScript, functional programming
Documentation Style: Comprehensive with examples
Error Handling: Explicit and detailed
```

### Voice Consistency Techniques

1. **Create Style Templates**
   ```markdown
   When writing documentation:
   - Start with clear overview
   - Include practical examples
   - Add troubleshooting section
   - End with related resources
   ```

2. **Define Code Standards**
   ```typescript
   // Preferred patterns
   const useCustomHook = () => { /* ... */ }
   
   // Documentation style
   /**
    * Custom hook for managing user authentication
    * @returns {object} Authentication state and methods
    */
   ```

3. **Maintain Consistency**
   ```bash
   claude "Review this text for consistency with my established voice profile"
   ```

## 🚨 Common Pitfalls

### Avoid These Mistakes

1. **Ambiguous Requests**
   ```markdown
   ❌ "Help me with this project"
   ✅ "Help me implement user registration with email verification"
   ```

2. **Missing Context**
   ```markdown
   ❌ "This isn't working"
   ✅ "This React component isn't re-rendering when props change. Here's the code: [code]"
   ```

3. **Overwhelming Complexity**
   ```markdown
   ❌ "Build a complete e-commerce platform with payment, inventory, users, admin panel..."
   ✅ "Let's start with a simple product catalog component, then build from there"
   ```

4. **Ignoring Constraints**
   ```markdown
   ❌ "Make it work somehow"
   ✅ "Implement this using only built-in browser APIs, no external libraries"
   ```

## 📊 Prompting Effectiveness

### Measuring Success

Track these indicators:
- **First-time accuracy**: How often you get useful results immediately
- **Iteration count**: Average refinements needed
- **Task completion**: Successful end-to-end completion rate
- **Code quality**: How often generated code works without modification

### Optimization Strategies

1. **Learn from Patterns**
   - Save successful prompts as templates
   - Analyze what makes prompts effective
   - Build a personal prompt library

2. **Refine Incrementally**
   - Start with working solution
   - Iteratively improve quality
   - Add constraints progressively

3. **Use Context Efficiently**
   - Provide relevant information only
   - Structure context logically
   - Update context as needed

## 🎯 Advanced Techniques

### Multi-Modal Prompting

Combine different types of input:

```
Text: "Analyze this UI design and suggest improvements"
Image: [Screenshot of interface]
Code: [Existing implementation]
Context: "This is for a mobile-first e-commerce app"
```

### Conditional Logic

Use if-then patterns:

```
If this is a React component:
  - Add TypeScript interfaces
  - Include error boundaries
  - Add accessibility props

If this is a Node.js API:
  - Add input validation
  - Include error handling
  - Add rate limiting
```

### Template Systems

Create reusable prompt templates:

```markdown
# Component Creation Template

Create a {{component_type}} component named {{component_name}} that:
- Accepts these props: {{prop_list}}
- Follows our design system: {{design_system_url}}
- Includes accessibility features: {{a11y_requirements}}
- Has comprehensive tests: {{testing_requirements}}

Output format:
1. Component code with TypeScript
2. Storybook stories
3. Unit tests
4. Usage documentation
```

## 📱 Platform-Specific Tips

### Desktop App
- Use keyboard shortcuts effectively
- Leverage file drag-and-drop
- Utilize multiple workspace features

### Web Interface
- Use browser bookmarks for common prompts
- Leverage browser extensions
- Save chat history for reference

### Mobile
- Use voice input for quick captures
- Keep prompts concise
- Use templates for common patterns

## 🤝 Collaboration Patterns

### Team Prompting Standards

Establish team guidelines:

```yaml
Code Style: ESLint config + Prettier
Documentation: JSDoc for all public APIs
Testing: Jest + React Testing Library
Architecture: Feature-based folder structure
```

### Prompt Sharing

Share effective prompts:
- Create team prompt library
- Document successful patterns
- Share templates and workflows

## 📚 Learning Resources

### Prompt Engineering Guides
- [Anthropic's Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Advanced Prompting Techniques](https://learnprompting.org)
- [AI Safety and Alignment](https://www.anthropic.com/research)

### Practice Exercises
- Code generation challenges
- Debugging scenarios
- Architecture design problems
- Content creation tasks

### Community Resources
- [Claude Code Discord](https://discord.gg/claude-code)
- [r/PromptEngineering](https://reddit.com/r/PromptEngineering)
- [Prompt Library](https://github.com/claude-code-hub/prompts)

---

Master these techniques to unlock Claude Code's full potential! 🚀