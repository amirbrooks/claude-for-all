#!/usr/bin/env node

/**
 * Custom MCP Server Template
 * 
 * This is a minimal JavaScript template for creating MCP servers.
 * For TypeScript version, see the README.md
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Create server instance
const server = new Server(
  {
    name: 'custom-mcp-server',
    version: '1.0.0',
    description: 'A custom MCP server that does X',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define your custom functions here
const customFunctions = {
  // Example function 1: Simple text processing
  processText: {
    description: 'Process text in a custom way',
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'Text to process',
        },
        operation: {
          type: 'string',
          enum: ['uppercase', 'lowercase', 'reverse', 'wordcount'],
          description: 'Operation to perform',
        },
      },
      required: ['text', 'operation'],
    },
    handler: async ({ text, operation }) => {
      let result;
      
      switch (operation) {
        case 'uppercase':
          result = text.toUpperCase();
          break;
        case 'lowercase':
          result = text.toLowerCase();
          break;
        case 'reverse':
          result = text.split('').reverse().join('');
          break;
        case 'wordcount':
          result = `Word count: ${text.split(/\s+/).filter(w => w).length}`;
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    },
  },

  // Example function 2: Data fetching
  fetchData: {
    description: 'Fetch data from a source',
    schema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description: 'Data source identifier',
        },
        filters: {
          type: 'object',
          description: 'Optional filters',
          properties: {
            limit: {
              type: 'number',
              description: 'Maximum number of results',
            },
            offset: {
              type: 'number',
              description: 'Number of results to skip',
            },
          },
        },
      },
      required: ['source'],
    },
    handler: async ({ source, filters = {} }) => {
      // Simulate data fetching
      const data = {
        source,
        timestamp: new Date().toISOString(),
        filters,
        results: [
          { id: 1, name: 'Item 1', value: 100 },
          { id: 2, name: 'Item 2', value: 200 },
          { id: 3, name: 'Item 3', value: 300 },
        ].slice(filters.offset || 0, (filters.offset || 0) + (filters.limit || 10)),
      };
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    },
  },

  // Example function 3: File operations
  fileOperation: {
    description: 'Perform file operations',
    schema: {
      type: 'object',
      properties: {
        operation: {
          type: 'string',
          enum: ['read', 'write', 'list'],
          description: 'File operation to perform',
        },
        path: {
          type: 'string',
          description: 'File or directory path',
        },
        content: {
          type: 'string',
          description: 'Content for write operations',
        },
      },
      required: ['operation', 'path'],
    },
    handler: async ({ operation, path, content }) => {
      // Import fs dynamically to avoid top-level await issues
      const fs = await import('fs/promises');
      const pathModule = await import('path');
      
      // Security: Restrict to workspace directory
      const workspaceDir = process.env.WORKSPACE_DIR || process.cwd();
      const safePath = pathModule.resolve(workspaceDir, path);
      
      if (!safePath.startsWith(workspaceDir)) {
        throw new Error('Access denied: Path outside workspace');
      }
      
      let result;
      
      switch (operation) {
        case 'read':
          result = await fs.readFile(safePath, 'utf-8');
          break;
          
        case 'write':
          if (!content) throw new Error('Content required for write operation');
          await fs.writeFile(safePath, content, 'utf-8');
          result = `File written successfully: ${path}`;
          break;
          
        case 'list':
          const files = await fs.readdir(safePath);
          result = files.join('\n');
          break;
          
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    },
  },
};

// Register tool listing handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.entries(customFunctions).map(([name, func]) => ({
      name,
      description: func.description,
      inputSchema: func.schema,
    })),
  };
});

// Register tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const func = customFunctions[name];
  if (!func) {
    throw new Error(`Unknown tool: ${name}`);
  }
  
  try {
    // Validate arguments against schema
    validateArguments(args, func.schema);
    
    // Execute function
    return await func.handler(args);
  } catch (error) {
    // Return error as content
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Simple argument validation
function validateArguments(args, schema) {
  if (!args || typeof args !== 'object') {
    throw new Error('Arguments must be an object');
  }
  
  // Check required properties
  const required = schema.required || [];
  for (const prop of required) {
    if (!(prop in args)) {
      throw new Error(`Missing required property: ${prop}`);
    }
  }
  
  // Validate property types
  const properties = schema.properties || {};
  for (const [key, value] of Object.entries(args)) {
    const propSchema = properties[key];
    if (!propSchema) continue;
    
    const expectedType = propSchema.type;
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    
    if (expectedType && actualType !== expectedType) {
      throw new Error(`Property ${key} must be of type ${expectedType}, got ${actualType}`);
    }
    
    // Validate enum values
    if (propSchema.enum && !propSchema.enum.includes(value)) {
      throw new Error(`Property ${key} must be one of: ${propSchema.enum.join(', ')}`);
    }
  }
}

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log startup to stderr (stdout is used for communication)
  console.error(`${server.serverInfo.name} v${server.serverInfo.version} started`);
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});