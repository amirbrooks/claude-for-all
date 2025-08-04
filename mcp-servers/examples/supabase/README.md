# 🗄️ Supabase MCP Server

> Direct PostgreSQL database access and Supabase platform integration for Claude Code

## 📖 Overview

The Supabase MCP server enables Claude Code to interact with PostgreSQL databases and Supabase services:

- 🗄️ **SQL Queries**: Execute SELECT, INSERT, UPDATE, DELETE operations
- 📊 **Schema Management**: Create tables, indexes, and relationships
- 🔐 **Row Level Security**: Manage RLS policies
- 📡 **Realtime**: Subscribe to database changes
- 🪣 **Storage**: Manage file uploads and downloads
- 🔑 **Auth**: User management operations

## 🚀 Quick Start

### 1. Get Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to Settings → API
4. Copy:
   - Project URL
   - Service Role Key (for full access)
   - Anon Key (for public access)

### 2. Configure Environment

Add to `.claude/.env`:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Add to Configuration

Update `.claude/settings.json`:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "$SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY": "$SUPABASE_SERVICE_KEY"
      }
    }
  }
}
```

### 4. Test the Server

```bash
# Test connection
claude "List all tables in my Supabase database"

# Test query
claude "Select all users from the profiles table"
```

## 📋 Configuration Options

### Basic Configuration

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "$SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY": "$SUPABASE_SERVICE_KEY"
      }
    }
  }
}
```

### Advanced Configuration

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "$SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY": "$SUPABASE_SERVICE_KEY",
        "SUPABASE_ANON_KEY": "$SUPABASE_ANON_KEY",
        "DEFAULT_SCHEMA": "public",
        "ENABLE_RLS": "true",
        "QUERY_TIMEOUT": "30000",
        "MAX_ROWS": "1000",
        "ALLOWED_OPERATIONS": "SELECT,INSERT,UPDATE",
        "RESTRICTED_TABLES": "auth,migrations"
      }
    }
  }
}
```

## 🎯 Common Use Cases

### 1. Database Queries

```bash
# Select data
claude "Select all posts where status = 'published' order by created_at desc limit 10"

# Insert data
claude "Insert a new user into profiles table with name 'John Doe' and email 'john@example.com'"

# Update data
claude "Update the posts table set status = 'archived' where created_at < '2024-01-01'"

# Delete data
claude "Delete from comments where spam_score > 0.8"

# Complex queries
claude "Select posts with their authors and comment count using joins"
```

### 2. Schema Management

```bash
# Create tables
claude "Create a table called 'products' with columns: id uuid primary key, name text, price decimal, stock integer"

# Add columns
claude "Add a 'description' text column to the products table"

# Create indexes
claude "Create an index on products table for the 'name' column"

# Add relationships
claude "Add foreign key from orders.product_id to products.id"
```

### 3. Row Level Security

```bash
# Enable RLS
claude "Enable row level security on the profiles table"

# Create policies
claude "Create RLS policy on profiles table allowing users to read their own profile"

# Complex policies
claude "Create policy allowing users to update posts they created or where they are collaborators"

# List policies
claude "Show all RLS policies for the posts table"
```

### 4. User Management

```bash
# List users
claude "Get all users from auth.users table"

# Create user
claude "Create a new user with email 'newuser@example.com' and password"

# Update user metadata
claude "Update user metadata for user_id X with preferred_theme = 'dark'"

# Manage roles
claude "Grant 'editor' role to user with email 'editor@example.com'"
```

### 5. Storage Operations

```bash
# List buckets
claude "List all storage buckets"

# Upload file
claude "Upload file.pdf to the 'documents' bucket"

# List files
claude "List all files in the 'avatars' bucket"

# Generate signed URL
claude "Generate a signed URL for 'documents/report.pdf' valid for 1 hour"
```

## 🔧 Advanced Usage

### Database Functions

```bash
# Create function
claude "Create a PostgreSQL function to calculate order totals"

# Call function
claude "Execute the calculate_order_total function with order_id = 123"

# Create trigger
claude "Create a trigger to update 'updated_at' timestamp on row updates"
```

### Data Migration

```bash
# Export data
claude "Export all data from the legacy_users table to CSV format"

# Import data
claude "Import users from CSV: 'name,email\nJohn,john@example.com\nJane,jane@example.com'"

# Transform data
claude "Migrate data from old_products to new products table with field mapping"
```

### Performance Optimization

```bash
# Analyze queries
claude "Explain analyze this query: SELECT * FROM posts JOIN users ON posts.user_id = users.id"

# View indexes
claude "Show all indexes on the posts table and their usage statistics"

# Vacuum tables
claude "Run VACUUM ANALYZE on the posts table"

# Monitor connections
claude "Show current database connections and their queries"
```

## 🛠️ Example Patterns

### E-commerce Database

```sql
-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);
```

### Blog System

```sql
-- Posts with RLS
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Authors can do everything with their posts
CREATE POLICY "Authors can manage their posts" ON posts
  FOR ALL USING (auth.uid() = author_id);

-- Policy: Published posts are public
CREATE POLICY "Published posts are public" ON posts
  FOR SELECT USING (status = 'published');
```

### Analytics Queries

```sql
-- Daily active users
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as daily_active_users
FROM user_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Revenue by category
SELECT 
  c.name as category,
  SUM(oi.quantity * oi.price) as revenue,
  COUNT(DISTINCT o.id) as order_count
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
  AND o.created_at >= NOW() - INTERVAL '1 month'
GROUP BY c.name
ORDER BY revenue DESC;
```

## 🐛 Troubleshooting

### Common Issues

**1. "Permission denied" errors**

```bash
# Check if using correct key
echo $SUPABASE_SERVICE_KEY | head -c 50

# Verify RLS policies
claude "Show all RLS policies for the table causing issues"

# Temporarily disable RLS (development only)
claude "ALTER TABLE your_table DISABLE ROW LEVEL SECURITY"
```

**2. "Relation does not exist"**

```bash
# List all tables
claude "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"

# Check schema
claude "SELECT schema_name FROM information_schema.schemata"

# Use fully qualified names
claude "SELECT * FROM public.your_table"
```

**3. Connection timeouts**

```bash
# Check connection
claude "SELECT version()"

# Test with simple query
claude "SELECT 1"

# Check project status
# Visit: https://app.supabase.com/project/YOUR_PROJECT/settings/general
```

**4. Query performance issues**

```bash
# Enable timing
claude "\\timing on"

# Analyze slow query
claude "EXPLAIN ANALYZE your_slow_query"

# Check missing indexes
claude "SELECT * FROM pg_stat_user_tables WHERE n_live_tup > 10000 AND n_dead_tup > 1000"
```

## ⚡ Performance Optimization

### 1. Indexing Strategy

```sql
-- Create indexes for common queries
CREATE INDEX idx_posts_author_status ON posts(author_id, status);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Partial indexes for specific conditions
CREATE INDEX idx_posts_published ON posts(published_at) 
WHERE status = 'published';

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

### 2. Query Optimization

```sql
-- Use LIMIT for large tables
SELECT * FROM large_table LIMIT 100;

-- Batch operations
INSERT INTO table_name (col1, col2) 
VALUES 
  ('val1', 'val2'),
  ('val3', 'val4'),
  ('val5', 'val6');

-- Use EXISTS instead of COUNT
SELECT EXISTS(SELECT 1 FROM users WHERE email = 'test@example.com');
```

### 3. Connection Pooling

```javascript
// Configure in application
const supabase = createClient(url, key, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: true,
  },
  global: {
    headers: {
      'x-connection-pooling': 'true'
    }
  }
});
```

## 🔒 Security Best Practices

### 1. Key Management

```bash
# Never use service key in client apps
# Use anon key for public operations
# Rotate keys regularly

# Create restricted keys
claude "Create a new API key with read-only access to specific tables"
```

### 2. RLS Policies

```sql
-- Always enable RLS on sensitive tables
ALTER TABLE sensitive_data ENABLE ROW LEVEL SECURITY;

-- Default deny all
CREATE POLICY "Deny all by default" ON sensitive_data
  FOR ALL USING (false);

-- Grant specific access
CREATE POLICY "Users see own data" ON sensitive_data
  FOR SELECT USING (user_id = auth.uid());
```

### 3. SQL Injection Prevention

```bash
# Always use parameterized queries
claude "Select from users where email = $1 with parameter 'user@example.com'"

# Validate input types
claude "Insert into products (name, price) values ($1, $2::decimal) with parameters"

# Restrict operations
# Set ALLOWED_OPERATIONS in environment
```

## 🎨 Integration Examples

### Next.js Integration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// API route
export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(10)
    
  return Response.json({ data, error })
}
```

### Real-time Subscriptions

```javascript
// Subscribe to changes
const subscription = supabase
  .channel('posts-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

### Edge Functions

```typescript
// supabase/functions/process-order/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: order } = await supabase
    .from('orders')
    .insert({ ...orderData })
    .select()
    .single()

  return new Response(JSON.stringify({ order }))
})
```

## 📊 Monitoring & Maintenance

### Database Metrics

```sql
-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Connection count
SELECT count(*) FROM pg_stat_activity;

-- Slow queries
SELECT 
  query,
  calls,
  mean_exec_time,
  total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### Backup Strategies

```bash
# Create backup
claude "Create a backup of the entire database"

# Export specific tables
claude "Export the users and posts tables to SQL format"

# Point-in-time recovery
# Available in Supabase Pro plans
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQL Tutorial](https://www.postgresqltutorial.com/)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [FAQ](../../../resources/faq.md)