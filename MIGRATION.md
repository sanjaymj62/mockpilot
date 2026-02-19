# Migration to Monorepo - Summary

## What Changed

The project has been restructured from a single Next.js application to a monorepo using pnpm workspaces.

### New Structure

```
mockpilot/
├── apps/
│   ├── web/          # Next.js frontend (previously root)
│   ├── backend/      # Express.js API (extracted from pages/api)
│   └── cli/          # CLI tool (new)
├── packages/
│   └── core/         # Shared logic (types + utilities)
└── pnpm-workspace.yaml
```

### Key Changes

1. **Backend Separated**: API route `/pages/api/generate.ts` is now a standalone Express.js server running on port 3001
2. **Shared Core Package**: Types and utilities moved to `@mockpilot/core` package
3. **Web App Updated**: Frontend now calls backend API at `http://localhost:3001/api/generate`
4. **CLI Added**: New command-line tool for generating HTTP files from YAML

### Migration Steps Completed

1. ✅ Created pnpm workspace configuration
2. ✅ Extracted core logic to `packages/core`
3. ✅ Created standalone backend in `apps/backend`
4. ✅ Moved Next.js app to `apps/web`
5. ✅ Created CLI tool in `apps/cli`
6. ✅ Updated dependencies and configurations
7. ✅ Built core package successfully
8. ✅ Built backend successfully

### Old Files (Can be removed)

The following original files can be removed as they've been migrated:
- `/app/` → moved to `/apps/web/app/`
- `/pages/` → API moved to backend, folder no longer needed in root
- `/types/` → moved to `/packages/core/src/`
- `/utils/` → moved to `/packages/core/src/`
- `/public/` → moved to `/apps/web/public/`

## Quick Start

```bash
# Install dependencies
pnpm install

# Build core package
pnpm build:core

# Development (runs web + backend together)
pnpm dev

# Or run separately:
pnpm dev:backend  # Terminal 1
pnpm dev:web      # Terminal 2
```

## Environment Setup

Web app needs backend URL configured in `apps/web/.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

This file has already been created.

## Testing

1. Start backend: `pnpm dev:backend` (runs on port 3001)
2. Start web: `pnpm dev:web` (runs on port 3000)
3. Open http://localhost:3000
4. The app should work exactly as before!

## Benefits

- 🎯 **Separation of Concerns**: Frontend and backend are isolated
- 📦 **Shared Code**: Core logic in reusable package
- 🔧 **CLI Tool**: New command-line interface for automation
- 🚀 **Scalability**: Each app can scale independently
- 🛠️ **Better DX**: Clear boundaries, easier testing
