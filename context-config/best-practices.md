# 🎯 CLAUDE.md Best Practices

> Patterns and strategies for different project types and team sizes

## 📖 Overview

This guide provides advanced patterns for creating effective CLAUDE.md files tailored to specific scenarios. Learn from real-world examples and proven strategies.

## 🏗️ Project Type Patterns

### 🌐 Web Applications

#### Frontend SPA
```markdown
# Project Name - Frontend

## Architecture Decisions
- **Framework**: React 18 with TypeScript for type safety
- **State**: Zustand for simple global state
- **Styling**: Tailwind CSS with custom design system
- **Data Fetching**: TanStack Query with 5min cache

## Component Patterns
- Atomic design structure (atoms → molecules → organisms)
- Co-located tests and stories
- Lazy loading for route components
- Error boundaries at route level

## Performance Guidelines
- Bundle size budget: 200KB gzipped
- Lighthouse score target: 95+
- Image optimization required (WebP with fallbacks)
- Code splitting by route
```

#### Full-Stack Application
```markdown
# Project Name - Full Stack

## Architecture Overview
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Next.js   │────▶│   API       │────▶│  PostgreSQL │
│   Frontend  │     │   Routes    │     │  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
        │                   │                    │
        └───────Redis Cache─┴────S3 Storage─────┘
```

## Development Workflow
1. API changes require migration: `npm run db:migrate`
2. Type generation: `npm run generate:types`
3. API testing: `npm run test:api`
4. E2E testing: `npm run test:e2e`

## Deployment Pipeline
- PR Preview: Vercel auto-deploy
- Staging: Merge to develop branch
- Production: Merge to main + tag
```

### 🔧 Backend Services

#### Microservices
```markdown
# Service Name - Microservice

## Service Responsibilities
- User authentication and authorization
- JWT token generation and validation
- Session management
- Password reset flows

## API Contract
All endpoints follow OpenAPI 3.0 spec in `/openapi.yaml`

Key endpoints:
- POST /auth/login
- POST /auth/logout  
- POST /auth/refresh
- GET /auth/me

## Inter-Service Communication
- Events: RabbitMQ (see /events/schema)
- Sync: gRPC (see /proto files)
- Service discovery: Consul

## Error Handling
- All errors follow RFC 7807 (Problem Details)
- Correlation IDs required
- Structured logging to Elasticsearch
```

#### Monolithic API
```markdown
# API Service

## Module Structure
src/
├── modules/
│   ├── auth/       # Authentication module
│   ├── users/      # User management
│   ├── products/   # Product catalog
│   └── orders/     # Order processing
├── shared/         # Shared utilities
└── core/           # Core framework

## Database Patterns
- Repository pattern for data access
- Unit of Work for transactions
- Migrations in /migrations (sequential)
- Seeders in /seeders (idempotent)

## API Versioning
- URL versioning: /api/v1, /api/v2
- Deprecated endpoints marked with sunset headers
- Breaking changes require major version bump
```

### 📊 Data & ML Projects

#### Data Pipeline
```markdown
# Data Pipeline Project

## Pipeline Architecture
```
Sources → Ingestion → Processing → Storage → Analytics
  │          │            │           │          │
  └─Kafka───┴─Airflow────┴─Spark────┴─S3──────┴─Tableau
```

## Data Flow
1. Raw data lands in `/data/raw/YYYY/MM/DD/`
2. Cleaned data in `/data/processed/YYYY/MM/DD/`
3. Aggregates in `/data/aggregates/YYYY/MM/DD/`

## Running Jobs
- Local: `python -m pipelines.daily_etl`
- Airflow: Automatically scheduled
- Backfill: `airflow backfill -s START_DATE -e END_DATE daily_etl`

## Data Quality
- Validation rules in `/src/validators/`
- Data profiling reports in `/reports/quality/`
- Alerts configured in `/config/alerts.yaml`
```

#### ML Model Development
```markdown
# ML Model Project

## Model Development Workflow
1. Exploration: `/notebooks/exploration/`
2. Feature engineering: `/src/features/`
3. Model training: `/src/models/`
4. Evaluation: `/notebooks/evaluation/`
5. Deployment: `/src/serving/`

## Experiment Tracking
- MLflow tracking server: http://localhost:5000
- Experiments named: `project_model_version`
- Best models tagged: `production-ready`

## Model Serving
- REST API: FastAPI app in `/src/api/`
- Batch predictions: `/scripts/batch_predict.py`
- Model artifacts: S3 bucket `models/project-name/`

## Reproducibility
- Python environment: `/requirements.txt`
- Data version: DVC tracked in `/data.dvc`
- Random seeds: Set in `/config/seeds.yaml`
```

### 📱 Mobile Applications

#### React Native
```markdown
# Mobile App - React Native

## Project Setup
- Expo managed workflow
- TypeScript for type safety
- React Navigation 6 for routing

## Platform Differences
```typescript
// Use platform-specific code sparingly
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0
  }
});
```

## State Management
- Zustand for global state
- MMKV for persistent storage
- React Query for server state

## Performance
- FlatList for long lists (not ScrollView)
- Image caching with FastImage
- Lazy load heavy screens
- Minimize bridge calls
```

### 🏢 Enterprise Applications

#### Large Team Project
```markdown
# Enterprise Platform

## Team Structure
- Frontend Team: /apps/web-ui
- Backend Team: /apps/api
- Mobile Team: /apps/mobile
- DevOps Team: /infrastructure

## Code Ownership
Check CODEOWNERS file for module ownership

Key areas:
- /libs/auth - @security-team
- /libs/payments - @payments-team  
- /libs/ui - @design-system-team

## Development Process
1. Feature branches from develop
2. PR requires 2 approvals
3. Must pass all CI checks
4. Security scan required
5. Performance benchmarks must pass

## Compliance Requirements
- HIPAA: PHI handling in /libs/health
- PCI: Payment processing in /libs/payments
- SOC2: Audit logs in all services
- GDPR: Data privacy tools in /libs/privacy
```

## 🎨 Structure Patterns

### Monorepo Structure
```markdown
# Monorepo Workspace

## Workspace Layout
```
packages/
├── apps/
│   ├── web/          # Main web application
│   ├── admin/        # Admin dashboard
│   └── mobile/       # React Native app
├── libs/
│   ├── ui/           # Shared component library
│   ├── utils/        # Shared utilities
│   └── types/        # Shared TypeScript types
└── services/
    ├── api/          # Backend API
    └── worker/       # Background jobs
```

## Monorepo Commands
```bash
# Run all apps
npm run dev

# Run specific app
npm run dev --workspace=@company/web

# Build all
npm run build

# Test changed packages
npm run test:changed

# Add dependency to specific package
npm install express --workspace=@company/api
```

## Dependency Management
- Shared deps in root package.json
- App-specific deps in app's package.json
- Use workspace protocol: "workspace:*"
```

### Microservices Structure
```markdown
# Microservices Platform

## Service Map
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Gateway    │  │    Auth      │  │   Users      │
│   (Kong)     │  │   Service    │  │   Service    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                  │
       └─────────────────┴──────────────────┘
                         │
                    ┌────┴────┐
                    │ Message │
                    │  Bus    │
                    └─────────┘
```

## Service Communication
- Sync: REST over HTTP/2
- Async: RabbitMQ for events
- Service mesh: Istio for routing

## Local Development
```bash
# Start core services
docker-compose up gateway auth users

# Start specific service
cd services/orders && npm run dev

# Run integration tests
npm run test:integration
```
```

## 📋 Content Patterns

### Command Documentation
```markdown
## 🛠️ Commands

### Development
| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run dev` | Start dev server | Port 3000, hot reload |
| `npm run build` | Production build | Outputs to /dist |
| `npm run test` | Run all tests | Includes unit + integration |
| `npm run test:watch` | Test watch mode | Re-runs on changes |

### Database
| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run db:migrate` | Run migrations | Required after pull |
| `npm run db:seed` | Seed dev data | Safe to run multiple times |
| `npm run db:reset` | Reset database | ⚠️ Destroys all data |

### Deployment
| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run deploy:staging` | Deploy to staging | Auto-runs tests |
| `npm run deploy:prod` | Deploy to production | Requires approval |
```

### Environment Configuration
```markdown
## 🔐 Environment Variables

### Required Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `REDIS_URL` | Redis connection | `redis://...` |
| `JWT_SECRET` | JWT signing key | Random 32+ chars |
| `API_KEY` | External API key | From provider |

### Optional Variables
| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | Server port |
| `LOG_LEVEL` | `info` | Logging verbosity |
| `CACHE_TTL` | `3600` | Cache duration (seconds) |

### Environment Files
- `.env.example` - Template with all variables
- `.env.local` - Local development (gitignored)
- `.env.test` - Test environment
- Never commit real `.env` files!
```

### Error Handling Patterns
```markdown
## 🚨 Error Handling

### API Error Responses
All errors follow this format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email",
    "requestId": "req_123abc"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid input (400)
- `UNAUTHORIZED` - Not authenticated (401)
- `FORBIDDEN` - Not authorized (403)
- `NOT_FOUND` - Resource not found (404)
- `RATE_LIMITED` - Too many requests (429)
- `INTERNAL_ERROR` - Server error (500)

### Client-Side Handling
```typescript
try {
  const data = await api.createUser(userData);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Show field-specific errors
  } else {
    // Show generic error message
  }
}
```
```

## 🔄 Evolution Patterns

### Growing Projects
```markdown
## 📈 Scaling Guidelines

As this project grows, consider:

### At 10K LOC
- [ ] Extract shared utilities to packages
- [ ] Implement feature flags
- [ ] Add performance monitoring

### At 50K LOC  
- [ ] Split into micro-frontends
- [ ] Implement module federation
- [ ] Add integration test suite

### At 100K LOC
- [ ] Consider service extraction
- [ ] Implement event sourcing
- [ ] Add dedicated DevOps role
```

### Migration Guides
```markdown
## 🔄 Migration in Progress

### TypeScript Migration (60% complete)
- ✅ Core utilities migrated
- ✅ API layer migrated
- 🚧 Components being migrated
- ❌ Legacy admin panel

To migrate a file:
1. Rename .js to .ts
2. Add types incrementally
3. Run `npm run type-check`
4. Fix any errors

### Database Migration (Planned)
Moving from MongoDB to PostgreSQL:
1. Run dual writes (Phase 1) ← We are here
2. Migrate read traffic (Phase 2)
3. Cutover writes (Phase 3)
4. Decommission MongoDB (Phase 4)
```

## 🎯 Team Size Patterns

### Solo Developer
```markdown
# Personal Project

## Quick Commands
```bash
make dev     # Start everything
make test    # Run tests
make deploy  # Deploy to prod
```

## My Conventions
- TODO comments for quick fixes
- HACK comments for temporary solutions
- Branch name: feature/description

## Deployment
Push to main = Auto-deploy to Vercel
```

### Small Team (2-5)
```markdown
# Team Project

## Team Conventions
- PR reviews required (1 approval)
- Branch naming: type/ticket-description
- Commit format: "type: description"
- Daily standup notes in /docs/standups

## Code Review Checklist
- [ ] Tests pass
- [ ] No console.logs
- [ ] Error handling added
- [ ] Types/docs updated

## Responsibility Areas
- Alice: Frontend, UI/UX
- Bob: Backend, Database
- Charlie: DevOps, Infrastructure
```

### Large Team (10+)
```markdown
# Enterprise Project

## Development Process
1. JIRA ticket required
2. Design review for UI changes
3. Architecture review for new features
4. Security review for auth changes
5. Performance review for critical paths

## Team Structure
- Tech Lead: @tech-lead
- Frontend: @frontend-team
- Backend: @backend-team
- QA: @qa-team
- DevOps: @devops-team

## Communication
- Slack: #project-name
- Weekly sync: Thursdays 2pm
- Architecture decisions: /docs/adr/
- RFCs: /docs/rfc/

## Quality Gates
- Code coverage: >80%
- Bundle size: <500KB
- Lighthouse: >90
- Load time: <3s
- Zero critical vulnerabilities
```

## 💡 Advanced Tips

### 1. Progressive Disclosure
```markdown
# Project Name

Quick start here for newcomers...

<details>
<summary>📚 Detailed Architecture</summary>

Detailed technical information that might overwhelm beginners...

</details>
```

### 2. Visual Documentation
```markdown
## Request Flow
```
User ──HTTP──▶ Nginx ──▶ Express ──▶ PostgreSQL
  ▲                         │
  └────────Response─────────┘
```
```

### 3. Living Documentation
```markdown
## Auto-Generated Docs

API Docs: http://localhost:3000/api-docs (auto-generated from OpenAPI)
Component Docs: http://localhost:6006 (Storybook)
Type Docs: Run `npm run docs:types` (TypeDoc)
```

### 4. Contextual Examples
```markdown
## Adding a New Feature

Example: Adding user notifications

1. **Schema**: Add to `prisma/schema.prisma`
   ```prisma
   model Notification {
     id String @id
     userId String
     message String
     read Boolean @default(false)
   }
   ```

2. **API**: Create endpoint in `/src/api/notifications.ts`
3. **Frontend**: Add components in `/src/components/notifications/`
4. **Tests**: Add tests following existing patterns
```

### 5. Decision Records
```markdown
## Architecture Decisions

### ADR-001: Use PostgreSQL over MongoDB
**Date**: 2024-01-15
**Status**: Accepted
**Context**: Need ACID compliance for financial data
**Decision**: PostgreSQL with strong consistency
**Consequences**: More complex queries but data integrity guaranteed

[See all ADRs](/docs/adr/)
```

## 📚 Resources

- [CLAUDE.md Templates](templates/) - Ready-to-use templates
- [Real Examples](examples/) - From successful projects
- [Community Patterns](https://github.com/claude-code-hub/patterns) - Community contributions
- [Discussion Forum](https://discord.gg/claude-code) - Get help and share ideas

---

Remember: The best CLAUDE.md evolves with your project. Start simple, add complexity as needed, and keep it updated! 🚀