# Cleanup Notes

The following directories and files in the root are from the old structure and can be safely removed:

## Old Directories (Now Migrated)

- **`app/`** → Moved to `apps/web/app/`
- **`pages/`** → API routes moved to backend; directory can be deleted
- **`types/`** → Moved to `packages/core/src/`
- **`utils/`** → Moved to `packages/core/src/`
- **`public/`** → Moved to `apps/web/public/`

## Old Config Files

- **`next.config.ts`** (root) → Now in `apps/web/next.config.ts`
- **`tsconfig.json`** (root) → Now in `apps/web/tsconfig.json`
- **`eslint.config.mjs`** (root) → Now in `apps/web/eslint.config.mjs`
- **`next-env.d.ts`** (root) → Now in `apps/web/next-env.d.ts`
- **`README.old.md`** → Backup of original README

## Optional Cleanup Commands

⚠️ **Warning**: Only run these after verifying everything works!

```bash
# Remove old directories
rm -rf app/ pages/ types/ utils/ public/

# Remove old config files
rm -f next.config.ts tsconfig.json eslint.config.mjs next-env.d.ts README.old.md

# Keep IMPLEMENTATION.md if it has useful docs, otherwise remove:
# rm -f IMPLEMENTATION.md
```

## What to Keep

Keep these files in the root:
- `package.json` - Root workspace config
- `pnpm-workspace.yaml` - Workspace definition
- `pnpm-lock.yaml` - Lock file
- `.gitignore` - Git ignore rules
- `.git/` - Git repository
- `node_modules/` - Dependencies
- `apps/` - **New monorepo apps**
- `packages/` - **New shared packages**
- Documentation: `README.md`, `QUICKSTART.md`, `MIGRATION.md`, `SUMMARY.md`
