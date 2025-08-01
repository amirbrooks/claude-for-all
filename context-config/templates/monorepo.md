# [Project Name] - Monorepo

Multi-package monorepo managed with [npm workspaces/yarn/pnpm/lerna/nx/turborepo].

## 🚀 Overview

This monorepo contains all applications, packages, and services for [project/company name]. We use [tool] for workspace management and shared dependencies.

### Repository Contents
- **Applications**: Web apps, mobile apps, desktop apps
- **Packages**: Shared libraries, components, utilities
- **Services**: Backend APIs, microservices, workers
- **Tools**: Build tools, CLI utilities, scripts

## 📁 Monorepo Structure

```
.
├── apps/                       # Applications
│   ├── web/                    # Main web application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── mobile/                 # React Native app
│   │   ├── ios/
│   │   ├── android/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── admin/                  # Admin dashboard
│   │   └── [structure]
│   │
│   └── desktop/                # Electron app
│       └── [structure]
│
├── packages/                   # Shared packages
│   ├── ui/                     # Component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                  # Utility functions
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                  # Shared TypeScript types
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                 # Shared configuration
│   │   ├── eslint/
│   │   ├── prettier/
│   │   ├── typescript/
│   │   └── package.json
│   │
│   └── design-tokens/          # Design system tokens
│       └── [structure]
│
├── services/                   # Backend services
│   ├── api/                    # Main API service
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── auth/                   # Authentication service
│   │   └── [structure]
│   │
│   ├── worker/                 # Background job worker
│   │   └── [structure]
│   │
│   └── gateway/                # API gateway
│       └── [structure]
│
├── tools/                      # Development tools
│   ├── scripts/                # Build and utility scripts
│   ├── generators/             # Code generators
│   └── cli/                    # Custom CLI tools
│
├── docs/                       # Documentation
│   ├── architecture/           # System design docs
│   ├── api/                    # API documentation
│   └── guides/                 # Development guides
│
├── .github/                    # GitHub configuration
│   ├── workflows/              # CI/CD workflows
│   └── CODEOWNERS             # Code ownership
│
├── package.json                # Root package.json
├── turbo.json                  # Turborepo config (if using)
├── nx.json                     # Nx config (if using)
├── lerna.json                  # Lerna config (if using)
├── pnpm-workspace.yaml         # PNPM workspaces (if using)
└── tsconfig.json               # Root TypeScript config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- [pnpm/yarn/npm] (workspace manager)
- Git

### Initial Setup

```bash
# Clone the repository
git clone <repo-url>
cd monorepo

# Install dependencies for all packages
pnpm install  # or yarn/npm install

# Build all packages
pnpm build    # or yarn/npm run build

# Start development (all apps)
pnpm dev      # or yarn/npm run dev
```

### Workspace Commands

#### Development
```bash
# Start all applications in dev mode
pnpm dev

# Start specific app
pnpm dev --filter web
pnpm dev --filter mobile
pnpm dev --filter api

# Start multiple apps
pnpm dev --filter web --filter api

# Start by pattern
pnpm dev --filter "./apps/*"
```

#### Building
```bash
# Build all packages
pnpm build

# Build specific package
pnpm build --filter @company/ui

# Build dependencies first
pnpm build --filter @company/web...

# Build in topological order
pnpm -r build
```

#### Testing
```bash
# Test all packages
pnpm test

# Test specific package
pnpm test --filter @company/utils

# Test changed packages only
pnpm test --filter ...[HEAD^1]

# Test with coverage
pnpm test:coverage
```

#### Linting & Formatting
```bash
# Lint all packages
pnpm lint

# Fix lint issues
pnpm lint:fix

# Format code
pnpm format

# Type check
pnpm typecheck
```

## 📦 Package Management

### Creating New Packages

```bash
# Generate new package (if using generator)
pnpm generate:package @company/new-package

# Manual creation
mkdir packages/new-package
cd packages/new-package
pnpm init
```

### Package Structure Template
```json
// packages/new-package/package.json
{
  "name": "@company/new-package",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest",
    "lint": "eslint src",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@company/types": "workspace:*"
  },
  "devDependencies": {
    "@company/config": "workspace:*"
  }
}
```

### Dependency Management

#### Adding Dependencies
```bash
# Add to specific package
pnpm add axios --filter @company/api

# Add to root (shared)
pnpm add -w eslint

# Add workspace package
pnpm add @company/utils --filter @company/web

# Add dev dependency
pnpm add -D jest --filter @company/ui
```

#### Workspace Protocol
```json
{
  "dependencies": {
    "@company/ui": "workspace:*",
    "@company/utils": "workspace:^1.0.0",
    "@company/types": "workspace:~"
  }
}
```

## 🏗️ Development Workflow

### Local Development

#### Using Multiple Packages
```typescript
// apps/web/src/App.tsx
import { Button, Card } from '@company/ui';
import { formatDate, parseQuery } from '@company/utils';
import type { User, ApiResponse } from '@company/types';

export function App() {
  const date = formatDate(new Date());
  
  return (
    <Card>
      <Button>Click me</Button>
      <p>Today is {date}</p>
    </Card>
  );
}
```

#### Hot Module Replacement
```bash
# Package changes automatically reflect in apps
# 1. Start dev mode
pnpm dev

# 2. Edit packages/ui/src/Button.tsx
# 3. Changes appear instantly in apps/web
```

### Building for Production

```bash
# Build in correct order
pnpm build:deps    # Build packages first
pnpm build:apps    # Then build applications

# Or use turbo/nx for automatic ordering
turbo run build
nx run-many --target=build
```

### Version Management

#### Changesets (Recommended)
```bash
# Add a changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish to npm
pnpm changeset publish
```

#### Lerna
```bash
# Version all packages
lerna version

# Publish changed packages
lerna publish
```

## 🧪 Testing Strategy

### Unit Testing
```typescript
// packages/utils/src/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });
});
```

### Integration Testing
```typescript
// apps/web/tests/integration/auth.test.ts
import { render, screen } from '@testing-library/react';
import { LoginPage } from '../src/pages/Login';
import { mockApi } from '@company/test-utils';

test('login flow', async () => {
  mockApi.auth.login.mockResolvedValue({ token: 'abc' });
  
  render(<LoginPage />);
  // ... test implementation
});
```

### E2E Testing
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'user@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');
  
  await expect(page).toHaveURL('/dashboard');
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      
      - uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            apps/*/dist
            apps/*/.next
            packages/*/dist
```

### Deployment Strategy

#### Apps Deployment
```yaml
# Deploy web app to Vercel
web:
  provider: vercel
  build: pnpm build --filter web
  output: apps/web/.next

# Deploy mobile to app stores
mobile:
  ios:
    provider: app-store-connect
    build: pnpm build:ios
  android:
    provider: google-play
    build: pnpm build:android

# Deploy API to AWS
api:
  provider: aws-ecs
  dockerfile: services/api/Dockerfile
  build: pnpm build --filter api
```

## 🛠️ Development Tools

### Code Generation
```bash
# Generate component
pnpm generate:component Button --package ui

# Generate API endpoint
pnpm generate:endpoint user --service api

# Generate full feature
pnpm generate:feature authentication
```

### Scripts & Automation

```json
// package.json scripts
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "clean": "turbo run clean && rm -rf node_modules",
    "deps:check": "syncpack list-mismatches",
    "deps:fix": "syncpack fix-mismatches",
    "deps:update": "pnpm update -r --interactive",
    "release": "changeset publish",
    "prepare": "husky install"
  }
}
```

### Git Hooks
```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
```

```json
// lint-staged.config.js
module.exports = {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
};
```

## 📊 Performance Optimization

### Build Optimization
```javascript
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    }
  }
}
```

### Bundle Size Management
```bash
# Analyze bundle sizes
pnpm analyze

# Check size limits
pnpm size-limit

# Find large dependencies
pnpm why <package-name>
```

### Shared Dependencies
```javascript
// Use workspace protocol for deduplication
{
  "dependencies": {
    "react": "^18.2.0",          // Shared version
    "@company/ui": "workspace:*"  // Internal package
  }
}
```

## 🔒 Security & Compliance

### Dependency Scanning
```bash
# Audit dependencies
pnpm audit

# Fix vulnerabilities
pnpm audit fix

# Check licenses
pnpm licenses list
```

### Access Control
```
# CODEOWNERS
# Global owners
* @monorepo-admins

# Package-specific owners
/packages/ui/ @design-system-team
/packages/auth/ @security-team
/services/api/ @backend-team
/apps/web/ @frontend-team
```

## 🐛 Troubleshooting

### Common Issues

#### "Cannot find module '@company/package'"
```bash
# Ensure package is built
pnpm build --filter @company/package

# Check tsconfig paths
# Verify package.json exports
```

#### "Workspace dependency not updating"
```bash
# Clear cache and reinstall
pnpm clean
pnpm install --force

# Rebuild affected packages
pnpm build --filter "...[HEAD^1]"
```

#### "Type errors in IDE"
```bash
# Restart TS server
# In VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"

# Rebuild types
pnpm typecheck
```

## 📈 Monitoring & Metrics

### Build Performance
```bash
# Measure build times
TURBO_LOG_LEVEL=info pnpm build

# Generate build graph
turbo run build --graph

# Cache hit rate
turbo run build --dry-run
```

### Dependency Graph
```bash
# Visualize dependencies
pnpm why @company/utils

# Show workspace graph
pnpm -r list --depth 0

# Find circular dependencies
pnpm dedupe --check
```

## 📚 Best Practices

### Package Design
1. **Single Responsibility**: Each package does one thing well
2. **Minimal Dependencies**: Keep packages lightweight
3. **Clear APIs**: Well-documented exports
4. **Versioning**: Follow semver strictly

### Code Sharing
1. **Types First**: Share TypeScript types
2. **Utilities Second**: Share pure functions
3. **Components Last**: Share UI carefully
4. **Configuration**: Centralize config

### Monorepo Hygiene
1. **Regular Updates**: Keep dependencies current
2. **Clean Builds**: Clear caches periodically
3. **Prune Unused**: Remove dead code
4. **Document Changes**: Maintain changelogs

## 🤝 Team Guidelines

### Contributing
1. Create feature branch
2. Make changes in packages
3. Update consumers
4. Add tests
5. Update documentation
6. Create changeset
7. Submit PR

### Code Review
- Check package boundaries
- Verify dependency updates
- Ensure tests pass
- Review bundle size impact
- Validate type exports

## 📚 Resources

### Documentation
- [Monorepo Guide](./docs/monorepo-guide.md)
- [Package Guidelines](./docs/package-guidelines.md)
- [Architecture Decisions](./docs/architecture/)

### Tools
- [Turborepo](https://turbo.build)
- [Nx](https://nx.dev)
- [Lerna](https://lerna.js.org)
- [Changesets](https://github.com/changesets/changesets)

### Team
- **Monorepo Lead**: @monorepo-lead
- **Platform Team**: @platform-team
- **Package Owners**: See CODEOWNERS

---

For questions, post in #monorepo channel or consult the [FAQ](./docs/FAQ.md).