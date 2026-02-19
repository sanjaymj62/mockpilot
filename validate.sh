#!/bin/bash
# Validation script for MockPilot monorepo setup

set -e

echo "🔍 Validating MockPilot Monorepo Setup..."
echo ""

# Check pnpm
echo "✓ Checking pnpm..."
pnpm --version > /dev/null || { echo "❌ pnpm not found"; exit 1; }

# Check workspace
echo "✓ Checking workspace configuration..."
[ -f "pnpm-workspace.yaml" ] || { echo "❌ pnpm-workspace.yaml not found"; exit 1; }

# Check packages
echo "✓ Checking packages..."
[ -d "apps/web" ] || { echo "❌ apps/web not found"; exit 1; }
[ -d "apps/backend" ] || { echo "❌ apps/backend not found"; exit 1; }
[ -d "apps/cli" ] || { echo "❌ apps/cli not found"; exit 1; }
[ -d "packages/core" ] || { echo "❌ packages/core not found"; exit 1; }

# Check package.json files
echo "✓ Checking package.json files..."
[ -f "apps/web/package.json" ] || { echo "❌ apps/web/package.json not found"; exit 1; }
[ -f "apps/backend/package.json" ] || { echo "❌ apps/backend/package.json not found"; exit 1; }
[ -f "apps/cli/package.json" ] || { echo "❌ apps/cli/package.json not found"; exit 1; }
[ -f "packages/core/package.json" ] || { echo "❌ packages/core/package.json not found"; exit 1; }

# Check core build
echo "✓ Checking core package build..."
[ -d "packages/core/dist" ] || { echo "❌ packages/core/dist not found - run 'pnpm build:core'"; exit 1; }

# Check node_modules
echo "✓ Checking dependencies..."
[ -d "node_modules" ] || { echo "❌ node_modules not found - run 'pnpm install'"; exit 1; }

echo ""
echo "✅ All checks passed!"
echo ""
echo "Next steps:"
echo "  1. Run 'pnpm dev' to start both web and backend"
echo "  2. Open http://localhost:3000 in your browser"
echo "  3. Backend will be running on http://localhost:3001"
echo ""
