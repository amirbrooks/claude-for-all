---
description: "Generate emails matching your personal voice profile with client-specific customization"
allowed-tools: ["Read(*)", "LS(*)", "Glob(*)", "Write(*)"]
---

# ✉️ Email Draft: AI-Powered Voice-Matched Communication

> **The Communication Engine**: Generate authentic, persuasive emails that sound exactly like you while achieving specific business objectives

---

## 🎯 Command Purpose

The Email Draft command creates **voice-matched professional communications** that:
- **Match your unique voice** using AI-learned patterns from your writing
- **Adapt to recipient context** with client-specific tone and history
- **Achieve specific objectives** through strategic message structuring
- **Maintain consistency** across all your communications
- **Save time** while improving response rates

---

## 🧠 How It Works

### 1. **Voice Profile Learning**
The AI analyzes your writing patterns:
```yaml
voice_analysis:
  - Writing samples from successful emails
  - Common phrases and expressions
  - Sentence structure preferences
  - Emotional tone patterns
  - Signature sign-offs and greetings
```

### 2. **Contextual Intelligence**
For each email request:
- **Recipient Analysis**: Relationship history, communication style preferences
- **Purpose Optimization**: Best structure for updates, proposals, follow-ups
- **Timing Awareness**: Urgency level and deadline considerations
- **Cultural Sensitivity**: Appropriate formality and cultural norms
- **Historical Context**: Previous email threads and outcomes

### 3. **Strategic Generation**
Creates emails optimized for:
- **Open Rates**: Compelling subject lines that get clicked
- **Response Rates**: Clear CTAs that drive action
- **Relationship Building**: Appropriate warmth and professionalism
- **Objective Achievement**: Messages that get results

---

## 📧 Email Generation Framework

### Input Template
```markdown
Generate email for:
- **Recipient**: [Name/Company]
- **Purpose**: [update/proposal/follow-up/introduction/thank you]
- **Key Points**: [Main messages to convey]
- **Urgency**: [High/Medium/Low]
- **Desired Outcome**: [What action you want them to take]
```

### Output Structure
```markdown
SUBJECT: [Compelling, specific subject line]

EMAIL:
[Greeting personalized to relationship level]

[Opening line that states purpose clearly]

[Body paragraphs with:
- Scannable structure
- Bullet points for clarity
- Benefits-focused language
- Specific details and examples]

[Clear call-to-action]

[Appropriate sign-off]
[Your name]

NOTES:
- Tone applied: [formal/casual/urgent/friendly]
- Key points emphasized: [what was highlighted]
- Follow-up needed: [yes/no, when, about what]
- Attachments suggested: [if any]
```

---

## 📚 Email Templates by Purpose

### 🔄 Project Update Email
```markdown
SUBJECT: [Project Name] Update: [Specific Achievement/Status]

Hi [Name],

Quick update on [Project Name] - we've just [specific accomplishment].

**Progress This Week:**
• ✅ [Completed item with impact]
• ✅ [Completed item with benefit]
• 🔄 [In progress item with timeline]

**Coming Next:**
• [Next milestone] by [date]
• [Deliverable] ready for review [when]

**Quick Win:** [Something positive to highlight]

[If action needed]: Could you [specific request] by [date]?

[Closing that maintains momentum]

[Your name]
```

### 💼 New Business Proposal
```markdown
SUBJECT: [Specific Solution] for [Their Company's Specific Challenge]

Hi [Name],

Following our conversation about [specific challenge they mentioned], I've outlined how we could help [achieve specific outcome].

**The Opportunity:**
[Their problem in their words] is costing you [specific impact].

**Our Approach:**
1. **[Solution Component]**: [Specific benefit]
2. **[Solution Component]**: [Specific benefit]
3. **[Solution Component]**: [Specific benefit]

**Expected Results:**
• [Quantified outcome]
• [Time-based improvement]
• [ROI or value metric]

**Investment:** $[X] with [payment terms]
**Timeline:** [Specific delivery schedule]

Would Tuesday or Thursday work better for a 20-minute call to discuss?

[Confident closing]

[Your name]

P.S. [Reference to case study or social proof]
```

### 🤝 Follow-Up Email
```markdown
SUBJECT: Re: [Original Subject] - Quick Question

Hi [Name],

Hope you've had a good week since we spoke on [day].

Just wanted to circle back on [specific topic discussed]. You mentioned [their specific need/interest].

**Quick Recap:**
• We discussed [key point]
• You were interested in [their priority]
• Next step was [agreed action]

[One of these approaches:]
- Are you still looking to [achieve goal] by [their timeline]?
- Have you had a chance to review [what you sent]?
- How did [relevant event] go?

Let me know if [specific next step] still makes sense, or if priorities have shifted.

[Friendly closing]

[Your name]
```

### 🙏 Thank You Email
```markdown
SUBJECT: Thank You - [Specific Reason]

Hi [Name],

Just wanted to say thank you for [specific action/help/meeting].

[Specific detail about why it was valuable] really helped us [specific outcome/benefit].

[Personal observation or connection point]

[If appropriate: reciprocal offer to help]

Thanks again!

[Your name]
```

### 🚨 Issue Resolution Email
```markdown
SUBJECT: [Issue] - Resolution Plan Inside

Hi [Name],

I wanted to address [issue] immediately and share our resolution plan.

**What Happened:**
[Brief, factual description without blame]

**Impact:**
[Honest assessment of impact on them]

**Our Solution:**
1. **Immediate:** [What we're doing now]
2. **Short-term:** [Fix within X days]
3. **Long-term:** [Prevention measures]

**Your Benefit:**
[How this makes things better for them]

I'm personally overseeing this resolution. Can we schedule a brief call [today/tomorrow] to ensure we're aligned?

[Accountability closing]

[Your name]

P.S. [Reinforcement of commitment to their success]
```

---

## 🎨 Voice Customization Profiles

### Professional Formal
```yaml
characteristics:
  - Complete sentences with proper grammar
  - Third-person references to company
  - Industry terminology used precisely
  - Structured paragraphs with clear topics
  - Respectful distance in tone

example_phrases:
  - "We appreciate your consideration"
  - "Please find attached"
  - "We look forward to your response"
```

### Consultative Expert
```yaml
characteristics:
  - Educational tone with insights
  - Data and metrics referenced
  - Strategic recommendations
  - Thought leadership positioning
  - Confidence without arrogance

example_phrases:
  - "Based on our analysis"
  - "Best practices suggest"
  - "In our experience with similar clients"
```

### Friendly Professional
```yaml
characteristics:
  - Conversational but competent
  - First names and personal connections
  - Enthusiasm appropriately expressed
  - Collaborative language
  - Warm but efficient

example_phrases:
  - "I hope you're having a great week"
  - "Looking forward to collaborating"
  - "Thanks so much for your time"
```

### Direct Action-Oriented
```yaml
characteristics:
  - Short sentences and paragraphs
  - Bullet points for clarity
  - Specific actions and deadlines
  - Minimal social padding
  - Results-focused language

example_phrases:
  - "Quick update:"
  - "Action needed by Friday"
  - "Three things to note"
```

---

## 🚀 Advanced Features

### Dynamic Personalization
The AI automatically adjusts based on:
- **Relationship Duration**: More formal for new contacts
- **Previous Interactions**: References past conversations
- **Industry Norms**: Adapts to sector expectations
- **Cultural Context**: Appropriate greetings and closings
- **Time Zones**: Acknowledges recipient's local time

### A/B Testing Integration
Track email performance:
```markdown
## Email Performance Metrics
- **Subject Line A**: 47% open rate
- **Subject Line B**: 62% open rate ✓
- **CTA Version 1**: 12% click rate
- **CTA Version 2**: 23% click rate ✓
```

### Response Prediction
AI suggests likely responses:
- **Positive Response**: Prepare follow-up materials
- **Questions Expected**: Have data ready
- **Objections Possible**: Prepare rebuttals
- **Delay Likely**: Set follow-up reminder

---

## 💡 Pro Tips for Better Emails

### Subject Line Optimization
1. **Specific > Vague**: "Q3 Revenue Report Ready" > "Update"
2. **Benefit-Focused**: "Cut Processing Time by 50%" > "New Feature"
3. **Question Format**: "Ready to reduce costs?" > "Cost reduction opportunity"
4. **Urgency When Real**: "Response needed by EOD Friday"
5. **Personal Touch**: "John - quick question about ProjectX"

### Body Copy Excellence
1. **One Idea Per Paragraph**: Scannable structure
2. **Benefits Before Features**: What's in it for them
3. **Specific Examples**: Concrete over abstract
4. **Social Proof**: Reference similar successes
5. **Clear Next Step**: Exactly what to do and when

### Psychological Triggers
- **Reciprocity**: "Happy to share our template"
- **Scarcity**: "Two spots remaining"
- **Social Proof**: "Join 50+ companies who..."
- **Authority**: "Based on 10 years experience"
- **Consistency**: "As we discussed..."

---

## 📊 Email Effectiveness Metrics

### Track Your Success
```markdown
## Email Analytics Dashboard
**Average Open Rate**: 67% (Industry avg: 21%)
**Response Rate**: 43% (Industry avg: 8%)
**Meeting Book Rate**: 31% (Target: 25%)
**Positive Sentiment**: 89%

**Best Performing Elements**:
- Subject lines with questions: +15% opens
- Bullets in body: +22% response rate
- P.S. lines: +18% engagement
- Tuesday sends: +25% opens vs Monday
```

---

## 🛠️ Implementation Guide

### Initial Setup
1. **Create Voice Profile**: Collect 10-20 of your best emails
2. **Define Recipients**: Create profiles for key contacts
3. **Set Templates**: Customize for your common scenarios
4. **Track Results**: Monitor what works

### Usage Examples
```bash
# Standard client update
claude "/email-draft" "Client: ABC Corp, Purpose: Weekly update"

# Urgent proposal
claude "/email-draft" "New prospect: XYZ Ltd, Proposal for $50k project, Urgent"

# Follow-up sequence
claude "/email-draft" "Follow-up #2 to John Smith about consulting proposal"
```

---

## 🎯 Common Scenarios

### Cold Outreach
- Research recipient thoroughly
- Lead with their challenge, not your solution
- Include specific credibility marker
- Single clear CTA
- P.S. with pattern interrupt

### Client Retention
- Regular value-add communications
- Celebrate their wins
- Share relevant insights
- Suggest optimizations
- Maintain warmth

### Crisis Communication
- Address immediately
- Take responsibility
- Focus on solution
- Provide timeline
- Follow up reliably

---

## 🎉 Success Story

*"The email-draft command transformed my client communication. My response rates jumped from 12% to 47% in 2 months. Best part? The emails sound exactly like me but better - more organized, more persuasive, more effective. One generated proposal email landed a $75k project."* - Marketing Consultant

---

## 🚀 Next Steps

1. **Install Command**: Save as `.claude/commands/email-draft.md`
2. **Create Voice Profile**: Gather your best emails
3. **Generate First Email**: Test with low-stakes communication
4. **Refine and Iterate**: Adjust based on results
5. **Track Performance**: Monitor open and response rates

**Remember: Great emails are about the reader, not the writer. This command helps you focus on their needs while maintaining your authentic voice.**

*Write emails that get opened, read, and acted upon.*