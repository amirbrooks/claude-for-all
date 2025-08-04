# 🎭 Playwright MCP Server

> Browser automation and web scraping capabilities for Claude Code using Microsoft Playwright

## 📖 Overview

The Playwright MCP server enables Claude Code to control web browsers, automate interactions, and extract data from websites:

- 🌐 **Browser Control**: Automate Chrome, Firefox, Safari, and Edge
- 📸 **Screenshots**: Capture full-page or element screenshots
- 🎬 **Video Recording**: Record browser interactions in HD quality
- 🤖 **Form Automation**: Fill forms, click buttons, navigate pages
- 📊 **Data Extraction**: Scrape content, tables, and structured data
- 🧪 **Testing**: Automated E2E testing capabilities
- 📱 **Mobile Emulation**: Test responsive designs
- 🔍 **Debug Tools**: Trace viewer and comprehensive logging

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- **FFmpeg** installed for video recording (automatically handled)
- Sufficient disk space for browser binaries (~500MB) + video storage
- Memory: 2GB minimum, 4GB recommended for video recording

### 2. Configure Environment

Update `.claude/settings.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "auto",
        "HEADLESS": "true",
        "VIDEO_ENABLED": "true",
        "VIDEO_QUALITY": "high",
        "FFMPEG_PATH": "auto",
        "VIEWPORT_WIDTH": "1280",
        "VIEWPORT_HEIGHT": "720",
        "DEFAULT_BROWSER": "chromium"
      }
    }
  }
}
```

**Video Recording Configuration:**
- `VIDEO_ENABLED`: Enable/disable video recording (`true`/`false`)
- `VIDEO_QUALITY`: Video quality setting (`high`/`medium`/`low`)
- `FFMPEG_PATH`: Path to FFmpeg binary (`auto` for automatic detection)
- `VIEWPORT_*`: Default browser viewport dimensions for consistent video size

### 3. Install Browsers

```bash
# First run will download browsers automatically
# Or manually install:
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### 4. Test the Server

```bash
# Test browser automation
claude "Navigate to example.com and take a screenshot"

# Test data extraction
claude "Go to news.ycombinator.com and extract the top 5 stories"
```

## 📋 Configuration Options

### Basic Configuration

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

### Advanced Configuration

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "/custom/browser/path",
        "PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD": "false",
        "DEFAULT_BROWSER": "chromium",
        "HEADLESS": "true",
        "TIMEOUT": "30000",
        "VIEWPORT_WIDTH": "1920",
        "VIEWPORT_HEIGHT": "1080"
      }
    }
  }
}
```

### Browser Options

- **chromium**: Default, best compatibility
- **firefox**: Good for specific Firefox features
- **webkit**: Safari engine for macOS/iOS testing

## 🎯 Common Use Cases

### 1. Web Scraping

```bash
# Extract structured data
claude "Go to producthunt.com and extract today's top 10 products with names, descriptions, and vote counts"

# Scrape multiple pages
claude "Navigate through the first 5 pages of Hacker News and collect all article titles and links"

# Dynamic content
claude "Go to a React SPA at example.com, wait for content to load, then extract the pricing table"
```

### 2. Screenshot Capture

```bash
# Full page screenshot
claude "Take a full-page screenshot of stripe.com homepage"

# Specific element
claude "Go to github.com/facebook/react and screenshot just the README section"

# Mobile view
claude "Capture tesla.com in iPhone 14 Pro viewport"

# Multiple viewports
claude "Screenshot our landing page in desktop, tablet, and mobile views"
```

### 3. Video Recording 🎬

```bash
# Basic video recording
claude "Record a video of navigating through our website's user flow from homepage to checkout"

# Form interaction video
claude "Record a video of filling out the contact form at example.com/contact with test data"

# Mobile interaction video
claude "Record a video in mobile view of browsing our product catalog and adding items to cart"

# Performance testing video
claude "Record a video showing page load times across our top 5 pages"

# Bug reproduction video
claude "Record a video reproducing the login issue: go to /login, enter invalid credentials, show error behavior"

# Tutorial creation video
claude "Record a step-by-step video tutorial of how to create a new user account on our platform"

# Responsive design video
claude "Record a video showing how our homepage responds when resizing from desktop to mobile viewport"

# API interaction video
claude "Record a video of testing our dashboard's real-time data updates and chart animations"
```

**Video Recording Features:**
- **Automatic Recording**: Videos are automatically saved for all browser interactions
- **HD Quality**: Records in 1280x720 resolution by default (configurable)
- **WebM Format**: Uses VP8 codec for optimal compression and quality
- **Custom Durations**: Records full interaction sequences from start to finish
- **Multiple Browsers**: Supports recording in Chromium, Firefox, and WebKit
- **Mobile Recording**: Captures mobile viewport interactions
- **Failed Test Recording**: Automatically records videos when tests fail for debugging

### 3. Form Automation

```bash
# Fill and submit forms
claude "Go to our contact form at example.com/contact, fill it with test data, and submit"

# Multi-step forms
claude "Complete the multi-step wizard at example.com/signup with test information"

# File uploads
claude "Go to the upload page and upload test.pdf from the workspace folder"
```

### 4. Testing Workflows

```bash
# User journey testing
claude "Test the complete checkout flow: add item to cart, proceed to checkout, fill shipping, complete payment"

# Link validation
claude "Check all links on our documentation site and report any 404s"

# Performance testing
claude "Measure page load time for our top 10 pages and create a performance report"
```

### 5. Data Monitoring

```bash
# Price monitoring
claude "Check competitor pricing at competitorsite.com and compare with our prices"

# Availability checking
claude "Monitor if the PS5 is in stock at major retailers"

# Content changes
claude "Check if there are any new blog posts on techcrunch.com since yesterday"
```

## 🔧 Advanced Usage

### Page Navigation

```bash
# Complex navigation
claude "Go to amazon.com, search for 'mechanical keyboards', filter by 4+ stars and Prime delivery, then extract the top 5 results"

# Authentication
claude "Log into our staging site with test credentials and verify the dashboard loads"

# Multi-tab handling
claude "Open GitHub in one tab and our repo in another, then compare README files"
```

### Wait Strategies

```bash
# Wait for specific elements
claude "Go to the SPA, wait for the '.content-loaded' selector, then extract data"

# Wait for network idle
claude "Navigate to the dashboard and wait for all API calls to complete before screenshotting"

# Custom wait conditions
claude "Wait until the price element contains a number before extracting"
```

### JavaScript Execution

```bash
# Execute custom scripts
claude "Go to the page and execute JavaScript to scroll to the bottom smoothly"

# Extract computed styles
claude "Get the computed CSS values for all buttons on the page"

# Interact with browser APIs
claude "Check localStorage values on our web app"
```

## 🛠️ Example Scripts

### E-commerce Price Tracker

```javascript
// price-tracker.js
const trackPrices = async (page, products) => {
  const results = [];
  
  for (const product of products) {
    await page.goto(product.url);
    await page.waitForSelector(product.priceSelector);
    
    const price = await page.$eval(
      product.priceSelector, 
      el => el.textContent
    );
    
    results.push({
      name: product.name,
      price: price,
      timestamp: new Date()
    });
  }
  
  return results;
};
```

### SEO Analyzer

```javascript
// seo-check.js
const analyzeSEO = async (page, url) => {
  await page.goto(url);
  
  const seo = await page.evaluate(() => {
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent),
      images: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        loading: img.loading
      }))
    };
  });
  
  return seo;
};
```

### Form Testing Suite

```javascript
// form-tester.js
const testForm = async (page, formUrl, testData) => {
  await page.goto(formUrl);
  
  // Fill form fields
  for (const [field, value] of Object.entries(testData)) {
    await page.fill(`[name="${field}"]`, value);
  }
  
  // Submit and wait for response
  await Promise.all([
    page.waitForNavigation(),
    page.click('[type="submit"]')
  ]);
  
  // Check success
  return await page.isVisible('.success-message');
};
```

## 🐛 Troubleshooting

### Common Issues

**1. Browser Download Failed**

```bash
# Manual browser installation
npx playwright install

# Install specific browser
npx playwright install chromium

# Use system browsers
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
```

**2. Timeout Errors**

```bash
# Increase timeout
claude "Navigate to slow-site.com with 60 second timeout and extract content"

# Debug navigation
claude "Go to example.com with verbose logging and show all network requests"
```

**3. Selector Not Found**

```bash
# Use more robust selectors
claude "Find elements by text content 'Submit' instead of specific classes"

# Wait for dynamic content
claude "Wait for the loading spinner to disappear before extracting data"
```

**4. Memory Issues**

```bash
# Close pages after use
claude "Process 100 URLs in batches of 10, closing pages between batches"

# Use single browser context
claude "Reuse the same browser instance for all operations"
```

**5. Video Recording Issues**

```bash
# Check FFmpeg installation
ffmpeg -version

# Test video recording manually
npx playwright test --project=chromium --headed

# Check video output directory
ls -la test-results/videos/

# Verify video file format
ffprobe video-file.webm

# Debug video encoding
export DEBUG=pw:browser* && npx playwright test
```

**Common Video Issues:**
- **No video files**: Check FFmpeg installation and PATH
- **Corrupted videos**: Verify sufficient disk space
- **Large video files**: Adjust video quality settings
- **Missing videos**: Ensure `video` option is enabled in config

### Debug Mode

Enable detailed logging:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server", "--debug"],
      "env": {
        "DEBUG": "pw:*",
        "HEADLESS": "false",
        "SLOW_MO": "100"
      }
    }
  }
}
```

## ⚡ Performance Optimization

### 1. Browser Reuse

```javascript
// Reuse browser context
const context = await browser.newContext();
// Use context for multiple pages
```

### 2. Parallel Processing

```bash
# Process multiple URLs concurrently
claude "Scrape these 10 URLs in parallel with a maximum of 3 concurrent browsers"
```

### 3. Selective Loading

```javascript
// Block unnecessary resources
await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => route.abort());
```

### 4. Caching Strategies

```javascript
// Cache scraped data
const cache = new Map();
if (cache.has(url)) return cache.get(url);
```

## 🔒 Security Considerations

### 1. Credential Management

```bash
# Never hardcode credentials
claude "Use environment variables for login: USERNAME=$WEB_USER, PASSWORD=$WEB_PASS"

# Secure storage
claude "Store scraped sensitive data in encrypted format"
```

### 2. Rate Limiting

```javascript
// Implement delays between requests
await page.waitForTimeout(1000); // 1 second delay
```

### 3. Robot Detection

```bash
# Avoid detection
claude "Use random user agents and add human-like delays between actions"

# Respect robots.txt
claude "Check robots.txt before scraping any website"
```

## 🎨 Example Workflows

### Visual Regression Testing

```bash
claude "Create visual regression test:
1. Screenshot our homepage
2. Save as baseline
3. After deploy, screenshot again
4. Compare images and highlight differences
5. Generate visual diff report"
```

### Competitive Analysis

```bash
claude "Analyze competitor websites:
1. Screenshot their landing pages
2. Extract their pricing information
3. List their main features
4. Capture their value propositions
5. Create comparison matrix"
```

### Automated Reporting

```bash
claude "Generate weekly web metrics report:
1. Check our site's page load speed
2. Verify all critical pages are accessible
3. Test main user flows
4. Screenshot key pages
5. Compile into PDF report"
```

## 📊 Monitoring & Logging

### Performance Metrics

```javascript
// Track automation performance
const metrics = {
  pageLoadTime: performance.now() - startTime,
  elementsFound: await page.$$eval('*', els => els.length),
  networkRequests: networkLogs.length,
  errors: errorCount
};
```

### Error Tracking

```javascript
// Comprehensive error handling
page.on('error', err => {
  console.error('Page error:', err);
  errorLog.push({
    timestamp: new Date(),
    error: err.message,
    url: page.url()
  });
});
```

## 🚀 Best Practices

1. **Selector Strategy**
   - Use data attributes over classes
   - Prefer text content for buttons
   - Use multiple fallback selectors

2. **Performance**
   - Disable images for text scraping
   - Use headless mode in production
   - Implement request interception

3. **Reliability**
   - Add retry logic for flaky operations
   - Use explicit waits over sleep
   - Handle popups and modals

4. **Ethics**
   - Respect robots.txt
   - Don't overload servers
   - Follow website ToS

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Web Scraping Best Practices](https://www.scrapehero.com/web-scraping-best-practices/)
- [MCP Protocol Docs](https://modelcontextprotocol.io/)
- [Browser Automation Patterns](https://github.com/checkly/playwright-examples)

---

Need help? Join our [Discord](https://discord.gg/claude-code) or check the [FAQ](../../../resources/faq.md)