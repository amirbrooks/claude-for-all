# 🛠️ MCP Server Development Guide

> Build custom MCP servers to extend Claude Code with your own tools and integrations

## 📖 Overview

This guide covers everything you need to know to create custom MCP (Model Context Protocol) servers that integrate seamlessly with Claude Code.

## 📋 Table of Contents

1. [Understanding MCP](#understanding-mcp)
2. [Development Setup](#development-setup)
3. [Basic Server Structure](#basic-server-structure)
4. [Protocol Implementation](#protocol-implementation)
5. [Adding Custom Functions](#adding-custom-functions)
6. [Testing Your Server](#testing-your-server)
7. [Publishing & Distribution](#publishing--distribution)
8. [Advanced Topics](#advanced-topics)

## 🎯 Understanding MCP

### What is MCP?

The Model Context Protocol (MCP) is a standardized way for AI assistants to interact with external tools and services. It defines:

- **Communication Protocol**: How Claude and servers exchange messages
- **Function Registry**: How servers expose available functions
- **Type System**: How to define inputs and outputs
- **Error Handling**: Standardized error responses

### Key Concepts

1. **Server**: A process that provides functions to Claude
2. **Functions**: Individual capabilities exposed by the server
3. **Schema**: JSON Schema definitions for function parameters
4. **Transport**: Communication method (stdio, HTTP, WebSocket)

## 🚀 Development Setup

### Prerequisites

```bash
# Required tools
node --version  # >= 18.0.0
npm --version   # >= 8.0.0

# Recommended tools
npm install -g typescript tsx nodemon
```

### Project Structure

```
my-mcp-server/
├── src/
│   ├── index.ts           # Main server entry
│   ├── functions/         # Function implementations
│   │   ├── search.ts
│   │   └── process.ts
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
├── tests/                # Test files
├── package.json
├── tsconfig.json
├── README.md
└── .env.example
```

### Initialize Project

```bash
# Create project
mkdir my-mcp-server
cd my-mcp-server

# Initialize npm
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node tsx nodemon

# Initialize TypeScript
npx tsc --init
```

## 🏗️ Basic Server Structure

### Minimal Server Example

```typescript
// src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Create server instance
const server = new Server(
  {
    name: 'my-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'hello',
        description: 'Say hello to someone',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name to greet',
            },
          },
          required: ['name'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'hello':
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${args.name}!`,
          },
        ],
      };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
const transport = new StdioServerTransport();
server.connect(transport);
```

### Package.json Configuration

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "description": "Custom MCP server for Claude Code",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "test": "node --test tests/"
  },
  "bin": {
    "my-mcp-server": "./dist/index.js"
  },
  "files": [
    "dist"
  ],
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 📡 Protocol Implementation

### Function Schema Definition

```typescript
// src/functions/schemas.ts
import { z } from 'zod';

// Define input schemas using Zod
export const SearchSchema = z.object({
  query: z.string().describe('Search query'),
  limit: z.number().optional().default(10).describe('Maximum results'),
  filter: z.object({
    type: z.enum(['web', 'images', 'news']).optional(),
    date: z.enum(['day', 'week', 'month', 'year']).optional(),
  }).optional(),
});

export const ProcessSchema = z.object({
  data: z.array(z.any()).describe('Data to process'),
  operation: z.enum(['sum', 'average', 'filter', 'transform']),
  options: z.record(z.any()).optional(),
});

// Convert Zod schemas to JSON Schema
export function zodToJsonSchema(schema: z.ZodSchema): any {
  // Implementation of Zod to JSON Schema converter
  // Or use a library like zod-to-json-schema
}
```

### Advanced Function Implementation

```typescript
// src/functions/search.ts
import { SearchSchema } from './schemas.js';
import type { z } from 'zod';

export async function searchFunction(
  params: z.infer<typeof SearchSchema>
): Promise<any> {
  const { query, limit, filter } = params;

  try {
    // Implement your search logic
    const results = await performSearch(query, {
      limit,
      ...filter,
    });

    return {
      content: [
        {
          type: 'text',
          text: `Found ${results.length} results for "${query}"`,
        },
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Search failed: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}

async function performSearch(query: string, options: any) {
  // Your search implementation
  // Could call external APIs, databases, etc.
  return [
    { title: 'Result 1', url: 'https://example.com/1' },
    { title: 'Result 2', url: 'https://example.com/2' },
  ];
}
```

### Error Handling

```typescript
// src/utils/errors.ts
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

export function handleError(error: unknown): any {
  if (error instanceof MCPError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  }

  if (error instanceof Error) {
    return {
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message,
      },
    };
  }

  return {
    error: {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
    },
  };
}
```

## 🔧 Adding Custom Functions

### Database Integration Example

```typescript
// src/functions/database.ts
import { Pool } from 'pg';
import { z } from 'zod';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const QuerySchema = z.object({
  sql: z.string(),
  params: z.array(z.any()).optional(),
});

export async function queryDatabase(params: z.infer<typeof QuerySchema>) {
  const { sql, params = [] } = params;

  // Security: Validate SQL
  if (!isSelectQuery(sql)) {
    throw new MCPError('Only SELECT queries allowed', 'FORBIDDEN');
  }

  try {
    const result = await pool.query(sql, params);
    return {
      content: [
        {
          type: 'text',
          text: `Query returned ${result.rowCount} rows`,
        },
        {
          type: 'text',
          text: JSON.stringify(result.rows, null, 2),
        },
      ],
    };
  } catch (error) {
    throw new MCPError('Database query failed', 'DB_ERROR', error);
  }
}

function isSelectQuery(sql: string): boolean {
  return /^\s*SELECT/i.test(sql.trim());
}
```

### File System Operations

```typescript
// src/functions/filesystem.ts
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

const FileOperationSchema = z.object({
  operation: z.enum(['read', 'write', 'list', 'delete']),
  path: z.string(),
  content: z.string().optional(),
  encoding: z.enum(['utf8', 'base64']).default('utf8'),
});

export async function fileOperation(
  params: z.infer<typeof FileOperationSchema>
) {
  const { operation, path: filePath, content, encoding } = params;

  // Security: Validate path
  const safePath = path.resolve(process.env.WORKSPACE_DIR || '.', filePath);
  if (!safePath.startsWith(process.env.WORKSPACE_DIR || process.cwd())) {
    throw new MCPError('Access denied', 'FORBIDDEN');
  }

  switch (operation) {
    case 'read':
      const data = await fs.readFile(safePath, encoding);
      return {
        content: [{
          type: 'text',
          text: data,
        }],
      };

    case 'write':
      await fs.writeFile(safePath, content || '', encoding);
      return {
        content: [{
          type: 'text',
          text: `File written successfully: ${filePath}`,
        }],
      };

    case 'list':
      const files = await fs.readdir(safePath);
      return {
        content: [{
          type: 'text',
          text: files.join('\n'),
        }],
      };

    case 'delete':
      await fs.unlink(safePath);
      return {
        content: [{
          type: 'text',
          text: `File deleted: ${filePath}`,
        }],
      };
  }
}
```

### External API Integration

```typescript
// src/functions/api.ts
import axios from 'axios';
import { z } from 'zod';

const APIRequestSchema = z.object({
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).default('GET'),
  headers: z.record(z.string()).optional(),
  data: z.any().optional(),
  timeout: z.number().default(30000),
});

export async function makeAPIRequest(
  params: z.infer<typeof APIRequestSchema>
) {
  try {
    const response = await axios({
      ...params,
      validateStatus: () => true, // Don't throw on HTTP errors
    });

    return {
      content: [
        {
          type: 'text',
          text: `Status: ${response.status} ${response.statusText}`,
        },
        {
          type: 'text',
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new MCPError('API request failed', 'API_ERROR', {
        message: error.message,
        code: error.code,
      });
    }
    throw error;
  }
}
```

## 🧪 Testing Your Server

### Unit Tests

```typescript
// tests/functions.test.ts
import { describe, it, assert } from 'node:test';
import { searchFunction } from '../src/functions/search.js';

describe('Search Function', () => {
  it('should return results for valid query', async () => {
    const result = await searchFunction({
      query: 'test',
      limit: 5,
    });

    assert(result.content);
    assert(result.content.length > 0);
    assert(result.content[0].text.includes('Found'));
  });

  it('should handle empty query', async () => {
    const result = await searchFunction({
      query: '',
      limit: 10,
    });

    assert(result.content);
    assert(!result.isError);
  });
});
```

### Integration Tests

```typescript
// tests/server.test.ts
import { spawn } from 'child_process';
import { describe, it, assert } from 'node:test';

describe('MCP Server', () => {
  it('should start and respond to list tools', async () => {
    const server = spawn('tsx', ['src/index.ts']);
    
    // Send list tools request
    server.stdin.write(JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/list',
      id: 1,
    }) + '\n');

    // Wait for response
    const response = await new Promise((resolve) => {
      server.stdout.on('data', (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });

    assert(response.result);
    assert(Array.isArray(response.result.tools));
    
    server.kill();
  });
});
```

### Manual Testing

```bash
# 1. Run server in debug mode
npm run dev

# 2. Test with Claude Code
claude --settings test-settings.json "Test my custom server"

# 3. Use test client
cat > test-request.json << EOF
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "hello",
    "arguments": {"name": "World"}
  },
  "id": 1
}
EOF

cat test-request.json | npm start
```

## 📦 Publishing & Distribution

### Prepare for Publishing

1. **Update package.json:**
   ```json
   {
     "name": "@yourname/mcp-server-custom",
     "version": "1.0.0",
     "description": "Custom MCP server for X functionality",
     "keywords": ["mcp", "claude", "ai", "assistant"],
     "author": "Your Name",
     "license": "MIT",
     "repository": {
       "type": "git",
       "url": "https://github.com/yourname/mcp-server-custom"
     },
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

2. **Create README.md:**
   ```markdown
   # Custom MCP Server

   Description of what your server does.

   ## Installation

   ```bash
   npm install -g @yourname/mcp-server-custom
   ```

   ## Configuration

   Add to `.claude/settings.json`:

   ```json
   {
     "mcpServers": {
       "custom": {
         "command": "mcp-server-custom"
       }
     }
   }
   ```

   ## Available Functions

   - `function1`: Description
   - `function2`: Description
   ```

3. **Add CLI wrapper:**
   ```typescript
   // bin/cli.js
   #!/usr/bin/env node
   import '../dist/index.js';
   ```

### Publish to NPM

```bash
# Build project
npm run build

# Test locally
npm link
npm link @yourname/mcp-server-custom

# Login to npm
npm login

# Publish
npm publish --access public
```

### Distribution Methods

1. **NPM Package** (Recommended)
   - Easy installation with `npm install`
   - Version management
   - Dependency handling

2. **GitHub Release**
   - Direct download
   - Source code access
   - Issue tracking

3. **Docker Image**
   ```dockerfile
   FROM node:20-slim
   WORKDIR /app
   COPY . .
   RUN npm install && npm run build
   CMD ["node", "dist/index.js"]
   ```

## 🚀 Advanced Topics

### Performance Optimization

```typescript
// src/utils/cache.ts
class SimpleCache<T> {
  private cache = new Map<string, { value: T; expires: number }>();

  set(key: string, value: T, ttl: number = 3600000) {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl,
    });
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value;
  }
}

export const cache = new SimpleCache();
```

### Authentication & Security

```typescript
// src/middleware/auth.ts
export function authenticateRequest(headers: Record<string, string>) {
  const apiKey = headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new MCPError('Unauthorized', 'UNAUTHORIZED');
  }
}

// In your function handler
if (requiresAuth) {
  authenticateRequest(request.headers || {});
}
```

### Streaming Responses

```typescript
// src/functions/stream.ts
export async function* streamData() {
  for (let i = 0; i < 100; i++) {
    yield {
      content: [{
        type: 'text',
        text: `Processing item ${i}...`,
      }],
    };
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
```

### Multi-Transport Support

```typescript
// src/transports/http.ts
import express from 'express';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

export function createHTTPTransport(server: Server, port: number) {
  const app = express();
  app.use(express.json());

  app.post('/rpc', async (req, res) => {
    const response = await server.handleRequest(req.body);
    res.json(response);
  });

  app.listen(port, () => {
    console.log(`MCP server listening on http://localhost:${port}`);
  });
}
```

## 📚 Resources

### Documentation
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [Example Servers](https://github.com/modelcontextprotocol/servers)

### Tools
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector) - Debug MCP messages
- [Schema Generator](https://github.com/modelcontextprotocol/schema-gen) - Generate schemas from TypeScript

### Community
- [Discord Server](https://discord.gg/mcp-community)
- [GitHub Discussions](https://github.com/modelcontextprotocol/sdk/discussions)

---

Ready to build? Check our [example server](examples/custom-server/) or join the [community](https://discord.gg/claude-code)!