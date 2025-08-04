# 🔍 Perplexity MCP Server

> Real-time web search capabilities for Claude Code using Perplexity's Sonar API

## 📖 Overview

The Perplexity MCP server provides Claude Code with access to current information from the web, enabling:

- 🌐 **Real-time Search**: Access to up-to-date information
- 🎯 **Contextual Results**: AI-powered result synthesis
- 📰 **Source Attribution**: Direct links to information sources
- ⏰ **Time-based Filtering**: Search by recency (hour, day, week, month)
- 🔍 **Domain Filtering**: Focus searches on specific websites
- 📊 **Structured Responses**: Clean, formatted search results

## 🚀 Quick Start

### 1. Get API Key

1. Visit [Perplexity AI](https://www.perplexity.ai/)
2. Sign up for a developer account
3. Navigate to [API Settings](https://www.perplexity.ai/settings/api)
4. Generate a Sonar API key
5. Copy your key (starts with `pplx-`)

### 2. Configure Environment

Add to `.claude/.env`:
```bash
PERPLEXITY_API_KEY=pplx-your-api-key-here
```

### 3. Add to Configuration

Update `.claude/settings.json`:
```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY"
      }
    }
  }
}
```

### 4. Test the Server

```bash
# Verify server installation
npx -y server-perplexity-ask --version

# Test with Claude
claude "Search for the latest AI developments"
```

## 📋 Configuration Options

### Basic Configuration

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY"
      }
    }
  }
}
```

### Advanced Configuration

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY",
        "PERPLEXITY_MODEL": "sonar-medium",  // or sonar-small
        "PERPLEXITY_TIMEOUT": "30000",       // 30 seconds
        "PERPLEXITY_CACHE": "true",          // Enable caching
        "PERPLEXITY_CACHE_TTL": "3600"       // 1 hour cache
      }
    }
  }
}
```

### Model Options

- **sonar-small**: Faster, more concise responses
- **sonar-medium**: Balanced performance and detail (default)

## 🎯 Use Cases

### 1. Current Events & News

```bash
claude "What are today's top technology news stories?"

claude "Search for recent developments in renewable energy from the past week"

claude "Find the latest updates on the AI regulation in Europe"
```

### 2. Technical Research

```bash
claude "Search for the latest React 19 features and changes"

claude "Find recent benchmarks comparing Node.js and Bun performance"

claude "What are the current best practices for Kubernetes security?"
```

### 3. Market Research

```bash
claude "Search for recent market analysis on SaaS industry trends"

claude "Find current pricing strategies for AI-powered tools"

claude "What are competitors doing in the code assistant space?"
```

### 4. Documentation & Learning

```bash
claude "Search for tutorials on implementing OAuth 2.0 with Next.js"

claude "Find recent guides on optimizing PostgreSQL performance"

claude "Look for examples of successful MicroSaaS launches in 2024"
```

### 5. Client Research

```bash
claude "Search for recent news about [client company name]"

claude "Find information about trends in [client's industry]"

claude "Research best practices for [specific client challenge]"
```

## 🔧 Advanced Usage

### Time-based Searches

```bash
# Last hour
claude "Find breaking news about AI from the past hour"

# Last 24 hours
claude "Search for cryptocurrency market updates from today"

# Last week
claude "What were the major tech announcements this week?"

# Last month
claude "Find security vulnerabilities disclosed in the past month"
```

### Domain-specific Searches

```bash
# Search specific sites
claude "Search site:reddit.com for discussions about Claude Code"

claude "Find site:github.com repositories using MCP servers"

claude "Search site:news.ycombinator.com for startup advice"
```

### Combining with Other Tools

```bash
# Search + Analysis
claude "Search for the latest JavaScript frameworks and create a comparison table"

# Search + Code Generation
claude "Find the latest Next.js App Router patterns and implement an example"

# Search + Content Creation
claude "Research current SEO best practices and write a blog post outline"
```

## 🐛 Troubleshooting

### Common Issues

**1. "API Key not found" Error**

```bash
# Check if environment variable is set
echo $PERPLEXITY_API_KEY

# Verify .env file exists and has correct format
cat .claude/.env | grep PERPLEXITY

# Try setting directly (temporary)
export PERPLEXITY_API_KEY="pplx-your-key"
```

**2. "No results found" Response**

- Check internet connectivity
- Verify API key has active credits
- Try simpler search queries
- Check API status at [status.perplexity.ai](https://status.perplexity.ai)

**3. Server Won't Start**

```bash
# Clear npx cache
npx clear-npx-cache

# Try direct execution
npx -y server-perplexity-ask --debug

# Check Node version (needs 18+)
node --version
```

**4. Slow Response Times**

- Check network latency
- Consider using `sonar-small` model
- Enable caching for repeated queries
- Reduce query complexity

### Debug Mode

Enable detailed logging:

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "server-perplexity-ask", "--debug"],
      "env": {
        "PERPLEXITY_API_KEY": "$PERPLEXITY_API_KEY",
        "DEBUG": "perplexity:*"
      }
    }
  }
}
```

## 💰 API Usage & Limits

### Free Tier
- 5 requests per minute
- 50 requests per day
- Basic search functionality

### Pro Tier
- 20 requests per minute
- 1000 requests per day
- Advanced features
- Priority support

### Monitoring Usage

```bash
# Check your usage
claude "Check my Perplexity API usage statistics"

# Implement usage tracking
cat > track-usage.js << 'EOF'
let requestCount = 0;
const resetTime = Date.now() + 86400000; // 24 hours

function trackRequest() {
  if (Date.now() > resetTime) {
    requestCount = 0;
    resetTime = Date.now() + 86400000;
  }
  requestCount++;
  console.log(`Requests today: ${requestCount}/50`);
}
EOF
```

## 🚀 Best Practices

### 1. Optimize Queries

```bash
# ❌ Too vague
claude "Search for stuff about AI"

# ✅ Specific and targeted
claude "Search for recent breakthroughs in large language model efficiency from the past month"
```

### 2. Cache Frequently Used Searches

```javascript
// cache-config.js
const cacheConfig = {
  "common-searches": [
    "latest AI news",
    "JavaScript best practices",
    "security vulnerabilities"
  ],
  "ttl": 3600 // 1 hour
};
```

### 3. Combine with Subagents

```bash
# Use search results with specialized agents
claude "Search for React performance optimization techniques, then have the frontend-developer agent implement the top 3"
```

### 4. Error Handling

```javascript
// Always handle search failures gracefully
try {
  const results = await search("query");
  processResults(results);
} catch (error) {
  console.log("Search unavailable, using cached data");
  useFallbackData();
}
```

## 📊 Performance Tips

1. **Use Appropriate Models**
   - `sonar-small` for quick lookups
   - `sonar-medium` for detailed research

2. **Batch Related Searches**
   ```bash
   claude "Search for: 1) Latest React features, 2) Vue 3 updates, 3) Svelte 5 changes"
   ```

3. **Enable Caching**
   - Reduces API calls
   - Improves response time
   - Saves API credits

4. **Optimize Query Structure**
   - Use specific keywords
   - Include time frames
   - Specify domains when relevant

## 🔐 Security Considerations

1. **API Key Protection**
   - Never commit keys to git
   - Use environment variables
   - Rotate keys regularly
   - Monitor usage for anomalies

2. **Result Validation**
   - Verify source credibility
   - Cross-reference important information
   - Be aware of potential biases
   - Check publication dates

3. **Rate Limiting**
   - Implement client-side limiting
   - Handle 429 errors gracefully
   - Use exponential backoff
   - Monitor quota usage

## 🎨 Example Workflows

### Daily News Briefing

```bash
claude "Create a daily tech news briefing by searching for:
1. Top AI developments from the past 24 hours
2. Major security incidents reported today
3. Significant startup funding announcements
4. New developer tool releases
Format as a concise bullet-point summary with source links"
```

### Competitive Analysis

```bash
claude "Perform competitive analysis:
1. Search for recent features added by GitHub Copilot
2. Find pricing changes in AI coding assistants
3. Look for user reviews and comparisons
4. Identify market gaps and opportunities
Create a strategic report with recommendations"
```

### Content Research

```bash
claude "Research for blog post on 'Future of AI in Software Development':
1. Search for expert predictions from the past 3 months
2. Find recent surveys or studies on AI adoption
3. Look for contrarian viewpoints
4. Identify emerging trends
Create an outline with key points and sources"
```

## 📚 Additional Resources

- [Perplexity API Documentation](https://docs.perplexity.ai/)
- [Sonar API Reference](https://docs.perplexity.ai/sonar)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp)

## 🤝 Contributing

Found a bug or have a feature request? Please:
1. Check existing issues
2. Create a detailed bug report
3. Submit a pull request
4. Share your use cases

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [FAQ](../../../resources/faq.md)