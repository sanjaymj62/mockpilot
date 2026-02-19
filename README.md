# MockPilot Monorepo

A monorepo for generating HTTP request files from OpenAPI/Swagger specifications with realistic mock data.

## Project Structure

```
mockpilot/
├── apps/
│   ├── web/          # Next.js web application
│   ├── backend/      # Express.js API server
│   └── cli/          # Command-line interface
├── packages/
│   └── core/         # Shared core logic and utilities
└── pnpm-workspace.yaml
```

## Prerequisites

- Node.js 18+ 
- pnpm (install with `npm install -g pnpm`)

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Build Core Package

```bash
pnpm build:core
```

### Development

Run both web and backend in development mode:

```bash
pnpm dev
```

Or run them separately:

```bash
# Terminal 1 - Backend API
pnpm dev:backend

# Terminal 2 - Web UI
pnpm dev:web
```

The web app will be available at `http://localhost:3000` and the backend API at `http://localhost:3001`.

### Build

Build all packages:

```bash
pnpm build
```

Build individual packages:

```bash
pnpm build:core
pnpm build:backend
pnpm build:web
pnpm build:cli
```

### Production

```bash
# Start backend
pnpm start:backend

# Start web (in another terminal)
pnpm start:web
```

## Packages

### @mockpilot/core

Shared TypeScript library containing:
- OpenAPI/Swagger type definitions
- Data generation logic using Faker.js
- Schema resolution utilities

### @mockpilot/backend

Express.js REST API that:
- Accepts OpenAPI/Swagger YAML specs
- Generates HTTP request files with mock data
- Provides a `/api/generate` endpoint

### @mockpilot/web

Next.js web application providing:
- YAML editor for OpenAPI specs
- Real-time HTTP request generation
- Syntax highlighting
- Download and copy features

### @mockpilot/cli

Command-line tool for generating HTTP files:

```bash
# Build the CLI first
pnpm build:cli

# Run it
cd apps/cli
node dist/index.js path/to/swagger.yaml output.http
```

## Environment Variables

### Web App (`apps/web/.env.local`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### Backend (`apps/backend/.env`)

```env
PORT=3001
```

## Features

- 🎯 Parses OpenAPI 3.0 and Swagger 2.0 specifications
- 🎲 Generates realistic mock data using Faker.js
- 📝 Creates .http files compatible with VS Code REST Client
- 🔄 **Template Literal Style** with reusable variables for base URLs, path params, and query params
- 🎨 Modern dark-themed UI
- 🚀 Fast development with hot reload
- 📦 Modular monorepo architecture
- 🔧 CLI tool for automation

### HTTP File Generation

MockPilot uses a **Template Literal Style** approach for generating HTTP files:

- **Global variables** for base URLs and commonly used path parameters
- **Template syntax** (`{{variableName}}`) for easy customization
- **Smart parameter extraction** - detects reused variables automatically
- **Query parameter handling** - includes query params with default values

See [HTTP_GENERATION_GUIDE.md](./HTTP_GENERATION_GUIDE.md) for detailed documentation.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Express.js, TypeScript
- **Core**: TypeScript, Faker.js
- **Build**: pnpm workspaces, TypeScript
- **CLI**: Node.js, TypeScript

## License

MIT
