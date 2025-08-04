# [Project Name] - Documentation Site

Technical documentation website built with [documentation framework].

## 🚀 Overview

This repository contains the documentation for [project/product name]. The docs are built using [Docusaurus/VitePress/MkDocs/Nextra] and deployed to [hosting platform].

### Documentation Types
- **User Guides**: End-user documentation
- **API Reference**: Complete API documentation  
- **Developer Docs**: Contributing and development guides
- **Tutorials**: Step-by-step learning materials
- **Architecture**: System design and decisions

## 📁 Project Structure

```
docs/
├── docs/                       # Documentation content
│   ├── getting-started/        # Onboarding guides
│   │   ├── installation.md
│   │   ├── quick-start.md
│   │   └── first-project.md
│   │
│   ├── guides/                 # How-to guides
│   │   ├── basics/
│   │   ├── advanced/
│   │   └── best-practices/
│   │
│   ├── reference/              # API/CLI reference
│   │   ├── api/
│   │   ├── cli/
│   │   ├── configuration/
│   │   └── errors/
│   │
│   ├── tutorials/              # Learning materials
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   │
│   └── contributing/           # Contribution guides
│       ├── setup.md
│       ├── style-guide.md
│       └── pull-requests.md
│
├── static/                     # Static assets
│   ├── img/                    # Images and diagrams
│   ├── api/                    # OpenAPI specs
│   └── examples/               # Code examples
│
├── src/                        # Custom components/plugins
│   ├── components/
│   ├── css/
│   └── theme/
│
├── blog/                       # Blog posts (if enabled)
├── i18n/                       # Translations
└── docusaurus.config.js        # Site configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone <repo-url>
cd docs-site

# Install dependencies
npm install

# Start development server
npm run start

# The site will be available at http://localhost:3000
```

### Build for Production

```bash
# Build static site
npm run build

# Test production build locally
npm run serve

# Deploy (platform-specific)
npm run deploy
```

## ✍️ Writing Documentation

### File Structure

```markdown
---
id: unique-page-id
title: Page Title
sidebar_label: Sidebar Title
sidebar_position: 1
description: SEO description
keywords: [keyword1, keyword2]
---

# Page Title

Brief introduction paragraph explaining what this page covers.

## Prerequisites

What users need to know or have before reading this page.

## Main Content

The primary content of the documentation...
```

### Content Guidelines

#### Writing Style
- **Be Clear**: Use simple, direct language
- **Be Concise**: Get to the point quickly
- **Be Consistent**: Follow the style guide
- **Be Helpful**: Anticipate user questions

#### Structure
1. Start with the most important information
2. Use descriptive headings
3. Include examples for everything
4. Add "Next Steps" sections

#### Code Examples

````markdown
```javascript title="example.js"
// Always include descriptive comments
function greet(name) {
  return `Hello, ${name}!`;
}
```

```bash title="Terminal"
# Show command and output
$ npm install
✓ Installed 200 packages
```
````

### Markdown Features

#### Admonitions

```markdown
:::note
This is a note with helpful information.
:::

:::tip
This is a tip for best practices.
:::

:::warning
This is a warning about common pitfalls.
:::

:::danger
This is a danger notice for critical issues.
:::

:::info Custom Title
You can customize the admonition title.
:::
```

#### Tabs

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```javascript
const greeting = 'Hello World';
```

  </TabItem>
  <TabItem value="py" label="Python">

```python
greeting = 'Hello World'
```

  </TabItem>
</Tabs>
```

#### Interactive Elements

```markdown
<details>
<summary>Click to expand</summary>

Hidden content that can be toggled.

</details>
```

## 🎨 Customization

### Theme Configuration

```javascript
// docusaurus.config.js
module.exports = {
  title: 'Project Docs',
  tagline: 'Comprehensive documentation',
  url: 'https://docs.example.com',
  baseUrl: '/',
  
  themeConfig: {
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/org/repo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
      ],
    },
    
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['rust', 'ruby', 'php'],
    },
  },
};
```

### Custom CSS

```css
/* src/css/custom.css */
:root {
  --ifm-color-primary: #2563eb;
  --ifm-color-primary-dark: #1d4ed8;
  --ifm-color-primary-darker: #1e40af;
  --ifm-color-primary-darkest: #1e3a8a;
  --ifm-color-primary-light: #3b82f6;
  --ifm-color-primary-lighter: #60a5fa;
  --ifm-color-primary-lightest: #93bbfc;
}

/* Custom styles */
.feature {
  padding: 2rem;
  border-radius: 8px;
  background: var(--ifm-card-background-color);
}
```

### Custom Components

```jsx
// src/components/FeatureCard.js
import React from 'react';

export default function FeatureCard({title, description, icon}) {
  return (
    <div className="card">
      <div className="card__header">
        <h3>{icon} {title}</h3>
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
    </div>
  );
}
```

## 📦 Plugins & Features

### Search
```javascript
// docusaurus.config.js
module.exports = {
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};
```

### Analytics
```javascript
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'UA-000000-2',
        anonymizeIP: true,
      },
    ],
  ],
};
```

### Sitemap
```javascript
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
      },
    ],
  ],
};
```

## 🔍 SEO Optimization

### Page Metadata
```markdown
---
title: Complete Guide to Feature X
description: Learn how to use Feature X with examples and best practices
keywords: [feature x, tutorial, guide, examples]
image: /img/feature-x-banner.png
---
```

### Structured Data
```javascript
// src/components/StructuredData.js
export default function StructuredData({type, data}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

## 🌐 Internationalization

### Adding Translations
```bash
# Initialize i18n
npm run write-translations -- --locale fr

# Structure
i18n/
├── en/
│   ├── docusaurus-plugin-content-docs/
│   └── docusaurus-theme-classic/
└── fr/
    ├── docusaurus-plugin-content-docs/
    └── docusaurus-theme-classic/
```

### Translation Workflow
1. Mark strings for translation
2. Extract translation files
3. Translate content
4. Build localized versions

## 📊 Documentation Standards

### API Documentation
```markdown
## POST /api/users

Creates a new user account.

### Request

```http
POST /api/users HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

### Response

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Error Responses

| Status | Description |
|--------|------------|
| 400 | Invalid request data |
| 409 | Email already exists |
| 500 | Internal server error |
```

### CLI Documentation
```markdown
## command-name

Brief description of what the command does.

### Usage

```bash
command-name [options] <required-arg> [optional-arg]
```

### Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--verbose` | `-v` | Enable verbose output | `false` |
| `--output <path>` | `-o` | Output file path | `stdout` |

### Examples

```bash
# Basic usage
command-name input.txt

# With options
command-name --verbose --output result.txt input.txt
```
```

## 🚀 Deployment

### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build website
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Netlify
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build/"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/docs"
  to = "/docs/intro"
  status = 301
```

### Vercel
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus-2",
  "devCommand": "npm run start -- --port $PORT"
}
```

## 🧪 Testing Documentation

### Link Checking
```bash
# Check for broken links
npm run check-links

# Check for broken anchors
npm run check-anchors
```

### Spell Checking
```bash
# Run spell checker
npm run spellcheck

# Add words to dictionary
echo "customword" >> .spellcheck-dictionary.txt
```

### Vale (Prose Linting)
```yaml
# .vale.ini
StylesPath = styles
MinAlertLevel = warning

[*.md]
BasedOnStyles = write-good, proselint
```

## 📈 Documentation Metrics

### Analytics Tracking
- Page views and unique visitors
- Search queries
- 404 errors
- Time on page
- Navigation patterns

### User Feedback
```jsx
// src/components/Feedback.js
export default function Feedback() {
  return (
    <div className="feedback">
      <h4>Was this page helpful?</h4>
      <button onClick={() => track('helpful', 'yes')}>Yes</button>
      <button onClick={() => track('helpful', 'no')}>No</button>
    </div>
  );
}
```

## 🤝 Contributing

### Documentation Workflow
1. Create feature branch
2. Write/update documentation
3. Run local preview
4. Submit pull request
5. Address review feedback
6. Merge and deploy

### Style Guide
- Use present tense
- Write in second person (you)
- Include examples
- Keep paragraphs short
- Use lists for steps
- Add diagrams when helpful

### Review Checklist
- [ ] Spelling and grammar
- [ ] Technical accuracy
- [ ] Code examples work
- [ ] Links are valid
- [ ] Follows style guide
- [ ] SEO metadata added

## 🚨 Common Issues

### Build Failures
```bash
# Clear cache
rm -rf .docusaurus
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Search Not Working
```bash
# Rebuild search index
npm run build
npm run serve
```

### Broken Links
```bash
# Find and fix broken links
npm run check-links -- --fix
```

## 📚 Resources

### Documentation Tools
- [Docusaurus](https://docusaurus.io)
- [VitePress](https://vitepress.dev)
- [MkDocs](https://www.mkdocs.org)
- [Nextra](https://nextra.site)

### Writing Resources
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Writing Style Guide](https://docs.microsoft.com/style-guide)
- [Write the Docs](https://www.writethedocs.org)

### Team
- **Documentation Lead**: @docs-lead
- **Technical Writers**: @tech-writers
- **Developers**: @dev-team
- **Reviewers**: @review-team

---

For questions about documentation, post in #docs channel or see our [contribution guide](./CONTRIBUTING.md).