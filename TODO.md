# TODO - Initial Setup and Debugging

## Problem Analysis

The WASM build is failing because `wasm-pack` is not in the system PATH. The binary is installed at `/Users/archuser/.cargo/bin/wasm-pack` but needs to be run from the `wasm/` directory.

## Current Issues

1. **wasm-pack PATH issue**: wasm-pack is installed but not accessible globally
2. **Need to build WASM module**: Before running the frontend, the WASM module must be compiled
3. **PostgreSQL not running**: Database needs to be started before running migrations

## Immediate Steps to Fix

### 1. Build WASM Module

The wasm-pack command needs to be run from the `wasm/` directory:

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/wasm
/Users/archuser/.cargo/bin/wasm-pack build --target web --dev
```

This will create a `pkg/` directory in `wasm/` with the compiled WASM files.

### 2. Update Frontend WASM Import

The frontend is trying to import WASM from a path that may not exist after build. Need to verify the import path in `frontend/src/hooks/useWasm.ts`:

```typescript
// Current import:
const wasmModule = await import('../../wasm/pkg/ironclad_wasm.js');
```

After `wasm-pack build`, the package name should be `ironclad_wasm` (from Cargo.toml).

### 3. Start PostgreSQL

Option A - Use Docker (recommended):
```bash
docker-compose up -d postgres
```

Option B - Use local PostgreSQL:
```bash
brew services start postgresql
# or
pg_ctl -D /usr/local/var/postgres start
```

### 4. Run Database Migrations

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/backend
npm run db:migrate
```

This requires:
- `DATABASE_URL` in `backend/.env` to point to a running PostgreSQL instance
- The database to exist (may need to create it first)

### 5. Start Backend Server

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/backend
npm run dev
```

This should start on port 5000.

### 6. Start Frontend Server (in new terminal)

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/frontend
npm run dev
```

This should start on port 3000.

## Fix for wasm-pack PATH (Optional)

To avoid typing the full path to wasm-pack, add it to PATH:

```bash
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Then you can just run `wasm-pack build` directly.

## Quick Start Script

Create and run this script to automate setup:

```bash
#!/bin/bash
set -e

echo "🔨 Building WASM module..."
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/wasm
/Users/archuser/.cargo/bin/wasm-pack build --target web --dev

echo "🐳 Starting PostgreSQL..."
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler
docker-compose up -d postgres

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "🗄️ Running database migrations..."
cd backend
npm run db:migrate

echo "✅ Setup complete! Now run:"
echo "   npm run dev"
```

## Expected Issues to Debug

1. **WASM loading in browser**: CORS issues may prevent loading .wasm files
2. **Module resolution**: Vite may need special config for WASM imports
3. **PostgreSQL connection**: Database URL in .env may need adjustment
4. **Missing types**: TypeScript definitions for WASM may need generation
