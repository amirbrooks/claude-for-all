# 🔥 Firecrawl MCP Server

> Advanced web scraping and content extraction capabilities for Claude Code

## 📖 Overview

The Firecrawl MCP server provides Claude Code with powerful web scraping and crawling capabilities:

- 🕷️ **Web Crawling**: Crawl entire websites systematically
- 📄 **Content Extraction**: Extract clean, structured content from any webpage
- 🔍 **Smart Parsing**: Automatically identify and extract key content
- 📊 **Structured Data**: Extract tables, lists, and metadata
- 🖼️ **Media Handling**: Download images and process media
- 🔐 **Authentication**: Handle login-required content

## 🚀 Quick Start

### 1. Get API Key

1. Visit [Firecrawl.dev](https://firecrawl.dev)
2. Sign up for an account
3. Navigate to API Keys section
4. Generate a new API key

### 2. Configure Environment

Add to `.claude/.env`:
```bash
FIRECRAWL_API_KEY=fc_your_api_key_here
```

### 3. Add to Configuration

Update `.claude/settings.json`:
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "$FIRECRAWL_API_KEY"
      }
    }
  }
}
```

### 4. Test the Server

```bash
# Test scraping
claude "Scrape the content from example.com"

# Test crawling
claude "Crawl the first 5 pages of blog.example.com"
```

## 📋 Configuration Options

### Basic Configuration

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "$FIRECRAWL_API_KEY"
      }
    }
  }
}
```

### Advanced Configuration

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "$FIRECRAWL_API_KEY",
        "FIRECRAWL_TIMEOUT": "60000",
        "MAX_CRAWL_DEPTH": "3",
        "MAX_PAGES": "100",
        "FOLLOW_REDIRECTS": "true",
        "INCLUDE_HEADERS": "true",
        "EXTRACT_METADATA": "true",
        "WAIT_FOR_SELECTOR": "",
        "USER_AGENT": "FirecrawlBot/1.0",
        "RATE_LIMIT": "10",
        "CONCURRENT_REQUESTS": "5"
      }
    }
  }
}
```

## 🎯 Common Use Cases

### 1. Content Extraction

```bash
# Extract article content
claude "Extract the main article content from https://example.com/blog/post-title"

# Extract with specific selectors
claude "Extract content from .article-body on https://example.com/article"

# Extract structured data
claude "Extract all product information from https://shop.example.com/product/123"

# Extract tables
claude "Extract all tables from https://data.example.com/statistics"
```

### 2. Website Crawling

```bash
# Crawl entire site
claude "Crawl example.com and extract all page titles and descriptions"

# Limited crawl
claude "Crawl blog.example.com up to 20 pages, focusing on /posts/ URLs"

# Sitemap-based crawl
claude "Crawl pages listed in https://example.com/sitemap.xml"

# Pattern-based crawl
claude "Crawl only URLs matching /products/* on shop.example.com"
```

### 3. Data Collection

```bash
# E-commerce scraping
claude "Extract product names, prices, and images from category page at shop.example.com/electronics"

# News aggregation
claude "Collect headlines and summaries from news.example.com homepage"

# Research data
claude "Extract all research papers with titles, authors, and abstracts from journal.example.com"

# Social media
claude "Extract posts and engagement metrics from company profile page"
```

### 4. Monitoring & Tracking

```bash
# Price monitoring
claude "Extract current price of product at https://shop.example.com/product/123"

# Content changes
claude "Compare current content of example.com/terms with previous version"

# Availability checking
claude "Check if 'Out of Stock' appears on product pages"

# Competitor analysis
claude "Extract pricing and features from competitor websites"
```

### 5. Documentation Scraping

```bash
# API documentation
claude "Extract all endpoint documentation from api.example.com/docs"

# Technical specs
claude "Extract technical specifications table from product page"

# Code examples
claude "Extract all code snippets from tutorial page"

# Changelog extraction
claude "Extract version history and changes from changelog page"
```

## 🔧 Advanced Usage

### Handling Dynamic Content

```bash
# Wait for content to load
claude "Scrape SPA content from example.com after waiting for .content-loaded selector"

# Scroll to load more
claude "Scrape infinite scroll page, loading all content by scrolling"

# Interact with page
claude "Click 'Load More' button and extract additional content"
```

### Authentication

```bash
# Basic auth
claude "Scrape protected.example.com with username:password authentication"

# Cookie-based auth
claude "Scrape member-only content using provided session cookie"

# Form login
claude "Login to site.com with credentials then scrape dashboard"
```

### Custom Extraction Rules

```javascript
// Define extraction schema
const schema = {
  title: "h1",
  price: ".price-tag",
  description: ".product-description",
  images: {
    selector: "img.product-image",
    attribute: "src"
  },
  metadata: {
    brand: "meta[property='og:brand']",
    category: ".breadcrumb li:last-child"
  }
};
```

## 🛠️ Scraping Patterns

### E-commerce Pattern

```javascript
{
  "url": "https://shop.example.com/products",
  "extract": {
    "products": {
      "listSelector": ".product-item",
      "fields": {
        "name": ".product-title",
        "price": ".price",
        "image": {
          "selector": ".product-image",
          "attribute": "src"
        },
        "link": {
          "selector": "a.product-link",
          "attribute": "href"
        },
        "inStock": {
          "selector": ".availability",
          "transform": "text === 'In Stock'"
        }
      }
    }
  }
}
```

### Blog Pattern

```javascript
{
  "url": "https://blog.example.com",
  "extract": {
    "posts": {
      "listSelector": "article.post",
      "fields": {
        "title": "h2.post-title",
        "author": ".author-name",
        "date": {
          "selector": "time",
          "attribute": "datetime"
        },
        "excerpt": ".post-excerpt",
        "tags": {
          "selector": ".tag",
          "multiple": true
        },
        "readTime": ".read-time"
      }
    },
    "pagination": {
      "nextPage": "a.next-page[href]"
    }
  }
}
```

### Documentation Pattern

```javascript
{
  "url": "https://docs.example.com",
  "crawl": {
    "includePatterns": ["/api/*", "/guides/*"],
    "excludePatterns": ["/api/deprecated/*"],
    "maxDepth": 3
  },
  "extract": {
    "title": "h1",
    "content": ".documentation-content",
    "codeBlocks": {
      "selector": "pre code",
      "multiple": true,
      "includeLanguage": true
    },
    "navigation": {
      "selector": ".sidebar a",
      "fields": {
        "text": "text",
        "url": "href"
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**1. "Rate limit exceeded"**

```bash
# Check rate limit status
claude "Show my Firecrawl API usage and limits"

# Implement delays
claude "Crawl site with 2 second delay between requests"

# Reduce concurrent requests
{
  "env": {
    "CONCURRENT_REQUESTS": "1",
    "RATE_LIMIT": "2"
  }
}
```

**2. "Content not found"**

```bash
# Debug selectors
claude "List all CSS selectors on the page"

# Try different strategies
claude "Extract content using readability mode"

# Check if content is dynamic
claude "Take screenshot to see what's actually rendered"
```

**3. "Timeout errors"**

```bash
# Increase timeout
{
  "env": {
    "FIRECRAWL_TIMEOUT": "120000"
  }
}

# Scrape in smaller batches
claude "Crawl site in batches of 10 pages"
```

**4. "Authentication failed"**

```bash
# Check cookies
claude "Show all cookies for the domain"

# Try different auth method
claude "Use bearer token instead of cookies"

# Debug headers
claude "Show all request headers being sent"
```

## ⚡ Performance Optimization

### 1. Efficient Crawling

```javascript
// Only crawl what you need
{
  "crawl": {
    "includePatterns": ["/products/*"],
    "excludePatterns": [
      "*.pdf",
      "*.zip",
      "/admin/*",
      "/api/*"
    ],
    "respectRobotsTxt": true
  }
}
```

### 2. Caching Strategy

```javascript
// Cache frequently accessed content
{
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "storage": "memory",
    "maxSize": "100MB"
  }
}
```

### 3. Parallel Processing

```bash
# Process multiple URLs concurrently
claude "Scrape these 10 URLs in parallel with max 3 concurrent"

# Batch operations
claude "Process URLs in batches to avoid memory issues"
```

### 4. Response Optimization

```javascript
// Only extract needed fields
{
  "extract": {
    "minimal": true,
    "fields": ["title", "price"],
    "excludeFields": ["comments", "related"]
  }
}
```

## 🔒 Ethical Scraping

### Best Practices

1. **Respect robots.txt**
   ```bash
   claude "Check robots.txt before scraping example.com"
   ```

2. **Rate limiting**
   ```javascript
   {
     "rateLimit": {
       "requests": 10,
       "period": "1m"
     }
   }
   ```

3. **User agent identification**
   ```javascript
   {
     "headers": {
       "User-Agent": "YourBot/1.0 (+https://yoursite.com/bot)"
     }
   }
   ```

4. **Terms of service**
   ```bash
   claude "Check if scraping is allowed in terms of service"
   ```

## 🎨 Integration Examples

### Data Pipeline

```bash
claude "Create data pipeline:
1. Crawl all product pages from shop.example.com
2. Extract name, price, description, images
3. Clean and normalize the data
4. Export to CSV format
5. Upload to Google Sheets"
```

### Content Monitoring

```bash
claude "Set up monitoring:
1. Scrape competitor pricing daily
2. Compare with our prices
3. Alert if competitor is lower
4. Generate price adjustment recommendations
5. Create daily report"
```

### Research Assistant

```bash
claude "Research workflow:
1. Crawl academic papers on 'machine learning'
2. Extract titles, abstracts, and citations
3. Identify most cited papers
4. Create bibliography in APA format
5. Summarize key findings"
```

## 📊 Output Formats

### JSON Output

```json
{
  "url": "https://example.com/page",
  "timestamp": "2024-01-15T10:30:00Z",
  "title": "Page Title",
  "content": {
    "text": "Clean extracted text...",
    "html": "<div>Original HTML...</div>",
    "markdown": "# Formatted content..."
  },
  "metadata": {
    "author": "John Doe",
    "publishDate": "2024-01-15",
    "tags": ["tech", "news"]
  },
  "images": [
    {
      "src": "https://example.com/image.jpg",
      "alt": "Description"
    }
  ]
}
```

### CSV Export

```csv
url,title,price,description,in_stock
https://example.com/product1,"Product 1","$29.99","Description here",true
https://example.com/product2,"Product 2","$39.99","Another description",false
```

### Markdown Report

```markdown
# Scraping Report

## Summary
- Pages crawled: 50
- Data extracted: 500 items
- Duration: 2 minutes
- Errors: 0

## Extracted Data

### Products
1. **Product Name** - $29.99
   - Description: Lorem ipsum...
   - In Stock: Yes
```

## 🚀 Advanced Features

### JavaScript Execution

```bash
# Execute custom JavaScript
claude "Run JS on page: document.querySelectorAll('.price').forEach(el => el.innerText = el.innerText.replace('$', ''))"
```

### Screenshot Capture

```bash
# Capture screenshots during crawl
claude "Crawl site and take screenshot of each page"
```

### PDF Generation

```bash
# Convert scraped content to PDF
claude "Scrape article and save as PDF"
```

### API Integration

```bash
# Send scraped data to API
claude "Scrape products and POST to our inventory API"
```

## 📚 Resources

- [Firecrawl Documentation](https://docs.firecrawl.dev)
- [Web Scraping Best Practices](https://www.scrapehero.com/how-to-prevent-getting-blacklisted-while-scraping/)
- [CSS Selectors Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [FAQ](../../../resources/faq.md)