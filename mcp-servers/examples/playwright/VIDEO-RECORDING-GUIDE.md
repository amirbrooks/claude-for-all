# 🎬 Playwright Video Recording Setup Guide

> Complete guide to setting up video recording with Playwright MCP Server and FFmpeg

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [FFmpeg Installation](#ffmpeg-installation)
3. [Playwright Configuration](#playwright-configuration)
4. [Video Recording Options](#video-recording-options)
5. [Testing & Validation](#testing--validation)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## 🔧 Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher (LTS recommended)
- **Claude Code**: Latest version installed
- **FFmpeg**: Required for video encoding (we'll install this)
- **Memory**: 4GB RAM recommended for smooth video recording
- **Storage**: At least 2GB free space for browser binaries + video files

### Check Prerequisites
```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Check Claude Code installation
claude --version

# Check available disk space
df -h  # Linux/macOS
dir   # Windows
```

## 🎥 FFmpeg Installation

### Windows Installation

#### Method 1: Using Windows Package Manager (Recommended)
```bash
# Install using winget
winget install "FFmpeg (Essentials Build)"

# Or download precompiled binary
curl -L "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -o ffmpeg-windows.zip
```

#### Method 2: Manual Installation
1. Download from https://ffmpeg.org/download.html
2. Extract to `C:\ffmpeg\`
3. Add `C:\ffmpeg\bin` to system PATH
4. Restart terminal/command prompt

### macOS Installation

```bash
# Using Homebrew (recommended)
brew install ffmpeg

# Verify installation
ffmpeg -version
```

### Linux Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Arch Linux
sudo pacman -S ffmpeg

# Verify installation
ffmpeg -version
```

## ⚙️ Playwright Configuration

### 1. Update Claude Settings

Edit `.claude/settings.json`:

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

### 2. Install Playwright Browsers

```bash
# Install browsers with video dependencies
npx playwright install chromium firefox webkit --with-deps

# Install additional system dependencies
npx playwright install-deps
```

### 3. Create Playwright Config (Optional)

Create `playwright.config.js`:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  
  use: {
    // Video recording configuration
    video: {
      mode: 'on-first-retry', // Options: 'on', 'off', 'on-first-retry', 'retain-on-failure'
      size: { width: 1280, height: 720 }
    },
    
    // Screenshot configuration
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },
    
    // Trace recording for debugging
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        video: {
          mode: 'on',
          size: { width: 1280, height: 720 }
        }
      },
    },
  ],
});
```

## 🎮 Video Recording Options

### Recording Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `'on'` | Record every test/interaction | Full documentation, tutorials |
| `'off'` | Disable video recording | Performance testing, no videos needed |
| `'on-first-retry'` | Record only when tests fail and retry | Debugging failed tests |
| `'retain-on-failure'` | Keep videos only for failed tests | Space-efficient debugging |

### Video Quality Settings

```javascript
// High quality (larger files)
video: {
  mode: 'on',
  size: { width: 1920, height: 1080 }
}

// Standard quality (balanced)
video: {
  mode: 'on',
  size: { width: 1280, height: 720 }
}

// Low quality (smaller files)
video: {
  mode: 'on',
  size: { width: 854, height: 480 }
}
```

### Custom Video Configuration

```javascript
// Browser context with custom video settings
const context = await browser.newContext({
  recordVideo: {
    dir: 'videos/',
    size: { width: 1920, height: 1080 }
  }
});
```

## 🧪 Testing & Validation

### 1. Basic Video Test

Create `test-video.js`:

```javascript
import { test, expect } from '@playwright/test';

test('Video recording test', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://example.com');
  
  // Perform some interactions
  await page.waitForTimeout(2000);
  
  // Get video path (available after test)
  const videoPath = await page.video()?.path();
  console.log('Video saved to:', videoPath);
});
```

### 2. Run Video Test

```bash
# Run with video recording
npx playwright test test-video.js --project=chromium

# Run in headed mode (see browser)
npx playwright test test-video.js --headed

# Run with specific output directory
npx playwright test test-video.js --output-dir=custom-results
```

### 3. Verify Video Files

```bash
# Check video output
ls -la test-results/videos/

# Verify video format and properties
ffprobe -v quiet -print_format json -show_format video.webm

# Play video (if video player available)
vlc video.webm  # macOS/Linux
start video.webm  # Windows
```

## 🔍 Troubleshooting

### Common Issues

**1. FFmpeg Not Found**
```bash
# Check if FFmpeg is in PATH
ffmpeg -version

# Windows: Add to PATH
set PATH=%PATH%;C:\ffmpeg\bin

# Linux/macOS: Add to shell profile
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc
```

**2. No Video Files Generated**
```bash
# Check Playwright video configuration
npx playwright show-report

# Verify browser installation
npx playwright install --dry-run

# Test with debug mode
DEBUG=pw:browser* npx playwright test
```

**3. Video Quality Issues**
```javascript
// Adjust video settings in config
use: {
  video: {
    mode: 'on',
    size: { width: 1280, height: 720 },
    // Add custom options if supported
  }
}
```

**4. Large Video Files**
```bash
# Check video file sizes
du -sh test-results/videos/*

# Optimize settings for smaller files
# Use lower resolution: 854x480
# Use 'on-first-retry' instead of 'on'
# Clean up old videos regularly
```

### Debug Commands

```bash
# Enable verbose logging
export DEBUG=pw:*
npx playwright test

# Check browser process
ps aux | grep chromium

# Monitor disk usage during recording
watch df -h

# Check FFmpeg processes
ps aux | grep ffmpeg
```

## ✅ Best Practices

### 1. Performance Optimization

```javascript
// Use efficient video settings
export default defineConfig({
  use: {
    video: 'on-first-retry',  // Only record when needed
    screenshot: 'only-on-failure',
  },
  
  // Limit parallel workers when recording
  workers: process.env.CI ? 1 : 2,
});
```

### 2. Storage Management

```bash
# Automatically clean old videos
find test-results/videos -name "*.webm" -mtime +7 -delete

# Compress videos for archival
ffmpeg -i input.webm -crf 30 compressed.webm

# Move videos to external storage
rsync -av test-results/videos/ /backup/videos/
```

### 3. Video Organization

```javascript
// Organize videos by test suite
const context = await browser.newContext({
  recordVideo: {
    dir: `videos/${test.info().titlePath[0]}/`,
    size: { width: 1280, height: 720 }
  }
});
```

### 4. CI/CD Integration

```yaml
# GitHub Actions example
- name: Run Playwright tests with video
  run: npx playwright test --reporter=html
  
- name: Upload video artifacts
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-videos
    path: test-results/videos/
    retention-days: 30
```

### 5. Video Analysis

```bash
# Extract frames from video for analysis
ffmpeg -i video.webm -vf fps=1 frame_%03d.png

# Create GIF from video
ffmpeg -i video.webm -vf "fps=10,scale=640:-1:flags=lanczos" output.gif

# Get video information
ffprobe -v quiet -print_format json -show_format -show_streams video.webm
```

## 📚 Advanced Usage

### Custom Video Encoding

```javascript
// Advanced video configuration (if supported)
const context = await browser.newContext({
  recordVideo: {
    dir: 'videos/',
    size: { width: 1920, height: 1080 },
    // Custom encoding options may be available in future versions
  }
});
```

### Multiple Browser Recording

```javascript
// Record multiple browsers simultaneously
const browsers = ['chromium', 'firefox', 'webkit'];
for (const browserName of browsers) {
  const browser = await playwright[browserName].launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: `videos/${browserName}/`,
      size: { width: 1280, height: 720 }
    }
  });
  // Run tests...
}
```

### Video Comparison

```bash
# Compare videos for visual regression testing
ffmpeg -i baseline.webm -i current.webm -filter_complex "[0:v][1:v]blend=all_mode=difference" -c:v libx264 -crf 18 -c:a copy diff.webm
```

## 🎯 Use Cases

### 1. Bug Reproduction
Record exact steps that reproduce a bug for developers

### 2. User Journey Documentation
Create videos showing complete user workflows

### 3. Performance Testing
Record page load times and user interactions

### 4. Tutorial Creation
Generate step-by-step video tutorials automatically

### 5. Regression Testing
Compare videos between releases to spot visual changes

### 6. Client Demonstrations
Show automated testing capabilities to stakeholders

---

## 📞 Support

For issues with video recording:

1. Check the [troubleshooting section](#troubleshooting)
2. Verify FFmpeg installation
3. Test with minimal configuration
4. Check Playwright documentation
5. Report issues to the MCP server repository

**Remember**: Video recording requires additional system resources. Monitor disk space and memory usage during extended test runs.