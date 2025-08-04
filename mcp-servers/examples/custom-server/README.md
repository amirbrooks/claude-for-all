# 🛠️ Custom MCP Server Template

> A complete template for building your own MCP server for Claude Code

## 📖 Overview

This template provides a starting point for creating custom MCP servers. It includes:

- ✅ Complete TypeScript setup
- ✅ Basic function examples
- ✅ Error handling
- ✅ Testing setup
- ✅ Build configuration
- ✅ Documentation templates

## 🚀 Quick Start

### 1. Clone Template

```bash
# Clone this template
git clone https://github.com/claude-code-hub/custom-mcp-template
cd custom-mcp-template

# Or use degit
npx degit claude-code-hub/custom-mcp-template my-server
cd my-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy example env
cp .env.example .env

# Edit with your settings
nano .env
```

### 4. Start Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
custom-mcp-server/
├── src/
│   ├── index.ts           # Main server entry point
│   ├── server.ts          # Server configuration
│   ├── functions/         # Function implementations
│   │   ├── index.ts      # Function registry
│   │   ├── example.ts    # Example function
│   │   └── types.ts      # Shared types
│   ├── schemas/          # Input/output schemas
│   │   └── example.ts    
│   ├── utils/            # Utility functions
│   │   ├── errors.ts     # Error handling
│   │   ├── logger.ts     # Logging utility
│   │   └── validation.ts # Input validation
│   └── types/            # TypeScript types
│       └── index.ts
├── tests/                # Test files
│   ├── server.test.ts
│   └── functions.test.ts
├── examples/             # Usage examples
│   └── claude-config.json
├── docs/                 # Documentation
│   ├── API.md
│   └── DEVELOPMENT.md
├── .env.example         # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## 🔧 Implementation Guide

### Step 1: Define Your Functions

Edit `src/functions/example.ts`:

```typescript
import { z } from 'zod';
import { createFunction } from '../utils/function-factory.js';

// Define input schema
const MyFunctionSchema = z.object({
  input: z.string().describe('Input parameter'),
  options: z.object({
    mode: z.enum(['fast', 'accurate']).default('fast'),
    limit: z.number().min(1).max(100).default(10),
  }).optional(),
});

// Create function
export const myFunction = createFunction({
  name: 'myFunction',
  description: 'Does something useful',
  schema: MyFunctionSchema,
  handler: async (params) => {
    const { input, options } = params;
    
    // Your implementation here
    const result = await processInput(input, options);
    
    return {
      content: [
        {
          type: 'text',
          text: `Processed: ${result}`,
        },
      ],
    };
  },
});

async function processInput(input: string, options?: any) {
  // Implementation
  return input.toUpperCase();
}
```

### Step 2: Register Functions

Edit `src/functions/index.ts`:

```typescript
import { myFunction } from './example.js';
// Import other functions

export const functions = {
  myFunction,
  // Add other functions
};

export const functionList = Object.values(functions);
```

### Step 3: Configure Server

Edit `src/server.ts`:

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { functionList } from './functions/index.js';
import { handleFunctionCall } from './utils/handler.js';

export function createServer() {
  const server = new Server(
    {
      name: 'my-custom-server',
      version: '1.0.0',
      description: 'Custom MCP server for X functionality',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register functions
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: functionList.map(fn => ({
        name: fn.name,
        description: fn.description,
        inputSchema: fn.schema,
      })),
    };
  });

  // Handle function calls
  server.setRequestHandler(CallToolRequestSchema, handleFunctionCall);

  return server;
}
```

### Step 4: Add Error Handling

Edit `src/utils/errors.ts`:

```typescript
export class MCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'MCPError';
  }
}

export class ValidationError extends MCPError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class NotFoundError extends MCPError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND');
  }
}

export class RateLimitError extends MCPError {
  constructor(retryAfter?: number) {
    super('Rate limit exceeded', 'RATE_LIMIT', { retryAfter });
  }
}
```

### Step 5: Add Logging

Edit `src/utils/logger.ts`:

```typescript
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = this.parseLevel(process.env.LOG_LEVEL || 'INFO');
  }

  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: any) {
    this.log(LogLevel.ERROR, message, error);
  }

  private log(level: LogLevel, message: string, data?: any) {
    if (level >= this.level) {
      const timestamp = new Date().toISOString();
      const levelName = LogLevel[level];
      console.error(`[${timestamp}] [${levelName}] ${message}`, data || '');
    }
  }

  private parseLevel(level: string): LogLevel {
    return LogLevel[level as keyof typeof LogLevel] || LogLevel.INFO;
  }
}

export const logger = new Logger();
```

## 🧪 Testing

### Unit Test Example

```typescript
// tests/functions.test.ts
import { describe, it, assert } from 'node:test';
import { myFunction } from '../src/functions/example.js';

describe('myFunction', () => {
  it('should process input correctly', async () => {
    const result = await myFunction.handler({
      input: 'test',
      options: { mode: 'fast' },
    });

    assert(result.content);
    assert.equal(result.content[0].text, 'Processed: TEST');
  });

  it('should validate input', async () => {
    try {
      await myFunction.handler({ input: 123 }); // Invalid type
      assert.fail('Should have thrown');
    } catch (error) {
      assert(error instanceof ValidationError);
    }
  });
});
```

### Integration Test Example

```typescript
// tests/server.test.ts
import { describe, it, assert } from 'node:test';
import { createServer } from '../src/server.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

describe('Server', () => {
  it('should list available tools', async () => {
    const server = createServer();
    const transport = new StdioServerTransport();
    
    // Mock request
    const request = {
      jsonrpc: '2.0',
      method: 'tools/list',
      id: 1,
    };

    const response = await server.handleRequest(request);
    
    assert(response.result);
    assert(Array.isArray(response.result.tools));
    assert(response.result.tools.length > 0);
  });
});
```

## 📦 Building & Publishing

### Build for Production

```bash
# Clean previous build
rm -rf dist

# Build TypeScript
npm run build

# Test production build
node dist/index.js
```

### Prepare for NPM

1. Update `package.json`:
   ```json
   {
     "name": "@yourname/mcp-server-custom",
     "version": "1.0.0",
     "description": "Your server description",
     "bin": {
       "mcp-server-custom": "./dist/index.js"
     },
     "files": [
       "dist",
       "README.md",
       "LICENSE"
     ]
   }
   ```

2. Add shebang to entry:
   ```typescript
   #!/usr/bin/env node
   // src/index.ts
   ```

3. Test locally:
   ```bash
   npm link
   npx mcp-server-custom
   ```

### Publish

```bash
# Login to npm
npm login

# Publish
npm publish --access public
```

## 🔌 Integration Examples

### Claude Configuration

```json
{
  "mcpServers": {
    "custom": {
      "command": "npx",
      "args": ["-y", "@yourname/mcp-server-custom"],
      "env": {
        "API_KEY": "$CUSTOM_API_KEY",
        "LOG_LEVEL": "INFO"
      }
    }
  }
}
```

### Docker Deployment

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
```

### Environment Variables

```bash
# .env.example
# Server Configuration
NODE_ENV=development
LOG_LEVEL=DEBUG

# API Keys (if needed)
CUSTOM_API_KEY=your-api-key

# Feature Flags
ENABLE_CACHING=true
CACHE_TTL=3600

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600
```

## 🚀 Advanced Features

### Add Caching

```typescript
// src/utils/cache.ts
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});

export function getCached<T>(
  key: string,
  factory: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);

  return factory().then(result => {
    cache.set(key, result);
    return result;
  });
}
```

### Add Rate Limiting

```typescript
// src/utils/rate-limit.ts
class RateLimiter {
  private requests = new Map<string, number[]>();

  check(key: string, limit: number, window: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests
    const valid = requests.filter(time => now - time < window);
    
    if (valid.length >= limit) {
      return false;
    }
    
    valid.push(now);
    this.requests.set(key, valid);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
```

### Add Metrics

```typescript
// src/utils/metrics.ts
class Metrics {
  private counters = new Map<string, number>();
  private timers = new Map<string, number[]>();

  increment(name: string, value = 1) {
    const current = this.counters.get(name) || 0;
    this.counters.set(name, current + value);
  }

  timing(name: string, duration: number) {
    const timings = this.timers.get(name) || [];
    timings.push(duration);
    this.timers.set(name, timings);
  }

  getStats() {
    const stats: any = {};
    
    for (const [name, value] of this.counters) {
      stats[name] = value;
    }
    
    for (const [name, timings] of this.timers) {
      stats[`${name}_avg`] = timings.reduce((a, b) => a + b, 0) / timings.length;
      stats[`${name}_count`] = timings.length;
    }
    
    return stats;
  }
}

export const metrics = new Metrics();
```

## 📚 Resources

### Documentation Templates
- [API Documentation](docs/API.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

### Example Implementations
- [Database Server](../database-example/)
- [API Gateway](../api-gateway/)
- [File Manager](../file-manager/)

### Tools & Libraries
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)
- [Zod](https://github.com/colinhacks/zod) - Schema validation
- [TSX](https://github.com/esbuild-kit/tsx) - TypeScript execution

## 🤝 Contributing

1. Fork the template repository
2. Create your feature branch
3. Add your functions and tests
4. Submit a pull request

## 📄 License

This template is MIT licensed. Your server can use any license.

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [Development Guide](../../development-guide.md)