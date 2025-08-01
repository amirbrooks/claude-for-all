# [Project Name] - Web Application

Full-stack web application built with modern technologies.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Zustand for global state, TanStack Query for server state
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 15 with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Validation**: Zod schemas

### Infrastructure
- **Hosting**: Vercel (frontend) + Railway (backend)
- **File Storage**: AWS S3
- **Monitoring**: Sentry
- **Analytics**: Plausible

## 📁 Project Structure

```
.
├── apps/
│   ├── web/                    # React frontend application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── features/       # Feature-specific modules
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── lib/            # Utilities and helpers
│   │   │   ├── pages/          # Page components
│   │   │   └── styles/         # Global styles
│   │   └── public/             # Static assets
│   │
│   └── api/                    # Express backend application
│       ├── src/
│       │   ├── routes/         # API route handlers
│       │   ├── controllers/    # Business logic
│       │   ├── services/       # External services
│       │   ├── middleware/     # Express middleware
│       │   ├── utils/          # Helper functions
│       │   └── types/          # TypeScript types
│       └── prisma/             # Database schema and migrations
│
├── packages/
│   ├── ui/                     # Shared UI component library
│   ├── types/                  # Shared TypeScript types
│   └── config/                 # Shared configuration
│
└── docs/                       # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm 9+

### Setup

```bash
# Clone repository
git clone <repo-url>
cd project-name

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev
```

### Available Ports
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:5432

## 🛠️ Development

### Commands

#### All Apps
```bash
npm run dev          # Start all development servers
npm run build        # Build all applications
npm run test         # Run all tests
npm run lint         # Lint all code
npm run type-check   # TypeScript checking
```

#### Frontend Only
```bash
npm run dev:web      # Start frontend dev server
npm run build:web    # Build frontend
npm run test:web     # Test frontend
npm run preview:web  # Preview production build
```

#### Backend Only
```bash
npm run dev:api      # Start backend with hot reload
npm run build:api    # Build backend
npm run test:api     # Test backend
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### Code Style

#### Component Structure
```typescript
// components/Button/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, styles[variant], styles[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

#### API Route Structure
```typescript
// routes/users.ts
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import * as userController from '../controllers/users';

const router = Router();

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
  }),
});

router.get('/users', authenticate, userController.getUsers);
router.post('/users', validate(createUserSchema), userController.createUser);
router.get('/users/:id', authenticate, userController.getUser);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id', authenticate, userController.deleteUser);

export default router;
```

### State Management

#### Global State (Zustand)
```typescript
// stores/auth.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

#### Server State (TanStack Query)
```typescript
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUserData) => api.post('/users', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

## 🧪 Testing

### Frontend Testing
```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Backend Testing
```typescript
// users.test.ts
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../lib/prisma';

describe('GET /api/users', () => {
  it('returns list of users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${testToken}`)
      .expect(200);
      
    expect(response.body).toHaveProperty('users');
    expect(Array.isArray(response.body.users)).toBe(true);
  });
});
```

## 🚀 Deployment

### Environment Variables

#### Frontend (.env)
```bash
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=your-sentry-dsn
VITE_PLAUSIBLE_DOMAIN=example.com
```

#### Backend (.env)
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
SENTRY_DSN=your-sentry-dsn
```

### Deployment Process

1. **Frontend (Vercel)**
   ```bash
   npm run build:web
   vercel --prod
   ```

2. **Backend (Railway)**
   ```bash
   railway up
   ```

3. **Database Migrations**
   ```bash
   npm run db:migrate:deploy
   ```

## 🔒 Security

### Authentication Flow
1. User logs in with credentials
2. Server validates and returns access token (15min) + refresh token (7 days)
3. Access token stored in memory, refresh token in httpOnly cookie
4. Client includes access token in Authorization header
5. Server validates token on each request
6. Client refreshes token when expired

### Security Headers
```typescript
// middleware/security.ts
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
```

## 📊 Performance

### Frontend Optimization
- Code splitting by route
- Lazy loading for heavy components
- Image optimization with next-gen formats
- CSS purging in production
- Bundle analysis: `npm run analyze:web`

### Backend Optimization
- Database query optimization with indexes
- Redis caching for frequent queries
- Connection pooling
- Gzip compression
- Request logging and monitoring

### Performance Targets
- Lighthouse score: 95+
- Time to Interactive: <3s
- API response time: <200ms (p95)
- Bundle size: <300KB gzipped

## 🐛 Debugging

### Frontend Debugging
```typescript
// Enable debug mode
localStorage.setItem('debug', 'app:*');

// Component debugging
import { useDebugValue } from 'react';

function useCustomHook() {
  useDebugValue(state, (state) => `State: ${JSON.stringify(state)}`);
}
```

### Backend Debugging
```bash
# Debug mode
DEBUG=app:* npm run dev:api

# Database queries
DEBUG=prisma:query npm run dev:api

# Performance profiling
NODE_OPTIONS='--inspect' npm run dev:api
```

## 🔄 Git Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `chore/description` - Maintenance tasks
- `docs/description` - Documentation updates

### Commit Convention
```
type(scope): description

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

### PR Process
1. Create feature branch from `develop`
2. Make changes and commit
3. Push branch and create PR
4. Wait for CI checks
5. Request review
6. Merge after approval

## 📝 Additional Notes

### Known Issues
- Hot reload may fail on Windows - restart dev server
- Database migrations must run sequentially
- S3 uploads require CORS configuration

### Performance Tips
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Cache API responses with TanStack Query
- Use database indexes for frequent queries

### Helpful Resources
- [React Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [TanStack Query Docs](https://tanstack.com/query)
- [Project Wiki](./docs/wiki)

## 🤝 Team

- **Frontend Lead**: @frontend-dev
- **Backend Lead**: @backend-dev
- **DevOps**: @devops-engineer
- **Designer**: @ui-designer

---

For questions, check our [FAQ](./docs/FAQ.md) or ask in #project-name on Slack.