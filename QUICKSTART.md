# Quick Start Guide

## Setup (One Time)

```bash
# 1. Install dependencies
pnpm install

# 2. Build the core package
pnpm build:core
```

## Running the Application

### Option 1: Run Everything Together (Recommended for Development)

```bash
pnpm dev
```

This starts both the backend (port 3001) and web app (port 3000) concurrently.

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
pnpm dev:backend
```

**Terminal 2 - Web App:**
```bash
pnpm dev:web
```

Then open http://localhost:3000 in your browser.

## Using the CLI

```bash
# 1. Build the CLI
pnpm build:cli

# 2. Run it
cd apps/cli
node dist/index.js path/to/swagger.yaml output.http

# Example:
node dist/index.js ~/api-spec.yaml requests.http
```

## Project Structure Quick Reference

```
apps/
  web/          - Next.js frontend (localhost:3000)
  backend/      - Express API (localhost:3001)
  cli/          - Command-line tool
packages/
  core/         - Shared types and utilities
```

## Common Tasks

```bash
# Build everything
pnpm build

# Build individual packages
pnpm build:core
pnpm build:backend
pnpm build:web
pnpm build:cli

# Run production builds
pnpm start:backend  # Terminal 1
pnpm start:web      # Terminal 2
```

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (web)
lsof -ti:3000 | xargs kill -9
```

**Core package not found:**
```bash
# Rebuild the core package
pnpm build:core
```

**Clean install:**
```bash
# Remove all node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```
