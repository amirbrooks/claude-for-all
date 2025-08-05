# Claude Code Docker Image
# Production-ready container for running Claude Code

# Use Node.js LTS Alpine for smaller image size
FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    bash \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S claude && \
    adduser -S -u 1001 -G claude claude

# Install Claude Code globally as root
RUN npm install -g @anthropic-ai/claude-code

# Switch to non-root user
USER claude

# Set working directory
WORKDIR /home/claude/workspace

# Create necessary directories
RUN mkdir -p /home/claude/.claude \
    /home/claude/.npm \
    /home/claude/workspace

# Environment variables (to be provided at runtime)
ENV ANTHROPIC_API_KEY="" \
    NODE_ENV="production" \
    CLAUDE_HOME="/home/claude/.claude"

# Add labels for metadata
LABEL maintainer="claude-code-hub" \
      version="1.0.0" \
      description="Claude Code AI Development Assistant"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD claude --version || exit 1

# Default command
ENTRYPOINT ["claude"]

# Default to help if no arguments provided
CMD ["--help"]