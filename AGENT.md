ROLE: Expert Full Stack Developer

GOAL: Initialize monorepo structure with workspaces and shared TypeScript config

CONTEXT: Set up root package.json with workspaces for frontend and backend, configure TypeScript shared config

FILES TO CREATE:
- package.json
- tsconfig.json

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create root package.json with workspaces: ['packages/*', 'frontend', 'backend']
2. Set up shared tsconfig.json with base TypeScript configuration
3. Configure workspaces for proper monorepo package resolution

VALIDATION:
npm install && echo 'Dependencies installed successfully'

---

ROLE: React Frontend Specialist

GOAL: Create frontend package with Vite, React, and TypeScript

CONTEXT: Create frontend directory with Vite config, React entry point, and base App component

FILES TO CREATE:
- frontend/package.json
- frontend/vite.config.ts
- frontend/tsconfig.json
- frontend/index.html
- frontend/src/main.tsx
- frontend/src/App.tsx
- frontend/src/vite-env.d.ts

FILES TO MODIFY:
- package.json

DETAILED STEPS:
1. Create frontend/package.json with Vite, React, and TypeScript dependencies
2. Create vite.config.ts with React plugin configuration
3. Create frontend/tsconfig.json that extends root tsconfig.json
4. Create index.html with root div mounting point
5. Create src/main.tsx as React entry point with strict mode
6. Create src/App.tsx as base React component

VALIDATION:
cd frontend && npm run dev

---

ROLE: Frontend Styling Specialist

GOAL: Integrate Tailwind CSS into the Vite frontend

CONTEXT: Install Tailwind CSS, create tailwind.config.js, add base styles to CSS entry point

FILES TO CREATE:
- frontend/tailwind.config.js
- frontend/postcss.config.js
- frontend/src/index.css

FILES TO MODIFY:
- frontend/package.json
- frontend/src/main.tsx

DETAILED STEPS:
1. Install tailwindcss, postcss, autoprefixer as dev dependencies
2. Create tailwind.config.js with content paths for src files
3. Create postcss.config.js with tailwind and autoprefixer plugins
4. Create src/index.css with @tailwind directives for base, components, utilities
5. Import index.css in main.tsx

VALIDATION:
cd frontend && npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create Express backend with TypeScript and basic middleware

CONTEXT: Create backend directory with Express server, TypeScript config, and basic middleware

FILES TO CREATE:
- backend/package.json
- backend/tsconfig.json
- backend/src/server.ts
- backend/src/index.ts
- backend/src/routes/health.ts
- backend/src/middleware/cors.ts

FILES TO MODIFY:
- package.json

DETAILED STEPS:
1. Create backend/package.json with express, typescript, @types packages
2. Create tsconfig.json for backend TypeScript compilation
3. Create src/server.ts with Express app setup
4. Create src/index.ts as entry point that starts server
5. Create src/routes/health.ts with GET /health endpoint returning { status: 'ok' }
6. Create src/middleware/cors.ts with CORS configuration

VALIDATION:
cd backend && npm run dev

---

ROLE: Database Engineer

GOAL: Set up PostgreSQL connection pool with pg library

CONTEXT: Set up pg library with connection pool configuration, environment variable support

FILES TO CREATE:
- backend/src/db/pool.ts
- backend/src/db/index.ts
- backend/.env.example

FILES TO MODIFY:
- backend/package.json

DETAILED STEPS:
1. Install pg package as dependency
2. Create src/db/pool.ts with Pool configuration from DATABASE_URL
3. Set max connections to 20
4. Implement graceful shutdown that closes pool on SIGTERM
5. Create .env.example with DATABASE_URL variable

VALIDATION:
cd backend && npm run build

---

ROLE: Database Engineer

GOAL: Implement SQL migration runner for database schema changes

CONTEXT: Set up SQL migration runner with up/down migration files for artifacts table

FILES TO CREATE:
- backend/src/db/migrations/001_create_artifacts_table.up.sql
- backend/src/db/migrations/001_create_artifacts_table.down.sql
- backend/src/db/migrations/migration-tracker.sql
- backend/src/db/migrations/migrate.ts

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create migrations directory structure
2. Create migration-tracker.sql for migration history table
3. Create 001_create_artifacts_table.up.sql with artifacts table schema (id UUID PK, session_id, artifact_type, title, content, metadata, created_at, updated_at)
4. Create 001_create_artifacts_table.down.sql to drop artifacts table
5. Create migrate.ts with migrate() function that executes SQL files in order
6. Track migration execution in migration history table

VALIDATION:
cd backend && npm run build

---

ROLE: DevOps Engineer

GOAL: Configure environment variable loading and validation

CONTEXT: Create .env.example, install dotenv, load env vars in backend, validate required vars

FILES TO CREATE:
- backend/.env.example
- backend/src/config/env.ts

FILES TO MODIFY:
- backend/package.json
- backend/src/index.ts

DETAILED STEPS:
1. Install dotenv package
2. Create .env.example with DATABASE_URL, PORT, CORS_ORIGIN variables
3. Create src/config/env.ts that loads and validates environment variables
4. Fail fast with clear error if required vars missing
5. Import and call env config in index.ts before server start

VALIDATION:
cd backend && npm run build

---

ROLE: Rust/WASM Engineer

GOAL: Initialize Rust WASM project with wasm-pack configuration

CONTEXT: Create wasm/ directory with Cargo.toml configured for wasm32-unknown-unknown target

FILES TO CREATE:
- wasm/Cargo.toml
- wasm/src/lib.rs

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create wasm/ directory
2. Create Cargo.toml with crate-type = ['cdylib', 'rlib']
3. Add dependencies: wasm-bindgen, wasm-bindgen-futures
4. Create src/lib.rs with empty module structure

VALIDATION:
cd wasm && wasm-pack build --target web --dev

---

ROLE: Rust/WASM Engineer

GOAL: Export WASM functions with wasm-bindgen for JavaScript interop

CONTEXT: Create JavaScript-accessible functions: initialize(), executeDemo(input), cleanup()

FILES TO CREATE:
_None_

FILES TO MODIFY:
- wasm/src/lib.rs

DETAILED STEPS:
1. Add #[wasm_bindgen] module declaration
2. Create initialize() function that returns Result<(), JsValue>
3. Create executeDemo(input: &str) function that returns Result<JsValue, JsValue>
4. Create cleanup() function that returns Result<(), JsValue>
5. Ensure all functions are properly exported

VALIDATION:
cd wasm && wasm-pack build --target web --dev

---

ROLE: Rust/WASM Engineer

GOAL: Implement demo engine core logic in Rust with error handling

CONTEXT: Create core demo execution logic with input validation and result generation

FILES TO CREATE:
_None_

FILES TO MODIFY:
- wasm/src/lib.rs

DETAILED STEPS:
1. Implement input validation in executeDemo function
2. Create structured output as JSON string
3. Return meaningful error messages for invalid input
4. Ensure module size stays under 2MB by avoiding heavy dependencies

VALIDATION:
cd wasm && wasm-pack build --target web && ls -lh pkg/*.wasm

---

ROLE: React Frontend Specialist

GOAL: Create custom React hook for WASM module loading and execution

CONTEXT: Build useWasm hook that loads module, initializes it, and exposes executeDemo function

FILES TO CREATE:
- frontend/src/hooks/useWasm.ts
- frontend/src/types/wasm.ts

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create types/wasm.ts with TypeScript interfaces for WASM functions
2. Create useWasm hook that returns { isLoading, error, executeDemo, cleanup }
3. Implement lazy loading of WASM module on first use
4. Handle initialization errors gracefully
5. Implement cleanup on unmount

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend Build Specialist

GOAL: Configure Vite for WASM file bundling with proper headers

CONTEXT: Configure Vite to handle .wasm imports, set up proper headers for WASM loading

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/vite.config.ts

DETAILED STEPS:
1. Update vite.config.ts to handle .wasm imports
2. Configure proper Content-Type headers for WASM files
3. Set up asset handling for WASM module

VALIDATION:
cd frontend && npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create POST endpoint for artifact creation with validation

CONTEXT: Create endpoint handler for saving artifacts with validation and database insert

FILES TO CREATE:
- backend/src/routes/artifacts.ts
- backend/src/validators/artifacts.ts
- backend/src/types/artifacts.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create types/artifacts.ts with ArtifactCreate type
2. Create validators/artifacts.ts with validation schema (artifact_type: PRD|ARD|TASK_LIST, content max 1MB)
3. Create POST /api/artifacts endpoint that accepts { session_id, artifact_type, title, content, metadata }
4. Insert into database with generated UUID and timestamps
5. Return 201 with { id, created_at, updated_at }
6. Return 400 for invalid artifact_type, 422 for validation failures

VALIDATION:
cd backend && npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create GET endpoint for retrieving single artifact by ID

CONTEXT: Create endpoint handler for loading single artifact by UUID

FILES TO CREATE:
_None_

FILES TO MODIFY:
- backend/src/routes/artifacts.ts

DETAILED STEPS:
1. Create GET /api/artifacts/:id endpoint
2. Validate UUID format
3. Query database for artifact
4. Return 200 with full artifact object
5. Return 404 for non-existent artifact

VALIDATION:
cd backend && npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create GET list endpoint with filtering and pagination

CONTEXT: Create endpoint handler with query params for session_id, artifact_type, limit, offset

FILES TO CREATE:
_None_

FILES TO MODIFY:
- backend/src/routes/artifacts.ts
- backend/src/validators/artifacts.ts

DETAILED STEPS:
1. Create GET /api/artifacts endpoint
2. Accept query params: session_id, artifact_type, limit, offset
3. Filter by session_id and artifact_type
4. Implement pagination with limit/offset
5. Return { artifacts: [], total: count }
6. Return 400 for invalid params

VALIDATION:
cd backend && npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create DELETE endpoint for artifact removal

CONTEXT: Create endpoint handler for artifact deletion

FILES TO CREATE:
_None_

FILES TO MODIFY:
- backend/src/routes/artifacts.ts

DETAILED STEPS:
1. Create DELETE /api/artifacts/:id endpoint
2. Validate UUID format
3. Delete from database
4. Return 200 with { deleted: true } on success
5. Return 404 for non-existent artifact

VALIDATION:
cd backend && npm run build

---

ROLE: Backend Security Engineer

GOAL: Create middleware for request validation

CONTEXT: Create validation schemas for all request bodies using a validation library

FILES TO CREATE:
- backend/src/middleware/validation.ts

FILES TO MODIFY:
- backend/src/validators/artifacts.ts
- backend/package.json

DETAILED STEPS:
1. Install OPTIONAL: zod or validation library for schema validation
2. Create validation middleware that validates against schemas
3. Validate artifact_type is limited to PRD|ARD|TASK_LIST
4. Enforce content size max 1MB
5. Validate required fields before processing

VALIDATION:
cd backend && npm run build

---

ROLE: Backend Security Engineer

GOAL: Add rate limiting middleware to API endpoints

CONTEXT: Add rate limiting on API endpoints using express-rate-limit or similar

FILES TO CREATE:
- backend/src/middleware/rateLimit.ts

FILES TO MODIFY:
- backend/package.json
- backend/src/server.ts

DETAILED STEPS:
1. Install express-rate-limit package
2. Create rate limit middleware with configurable requests per minute
3. Return rate limit headers in response (X-RateLimit-Limit, X-RateLimit-Remaining)
4. Use memory store ready for distributed counter future scaling

VALIDATION:
cd backend && npm run build

---

ROLE: Backend Security Engineer

GOAL: Add security headers middleware for OWASP compliance

CONTEXT: Configure CORS, CSP, and other security headers

FILES TO CREATE:
- backend/src/middleware/security.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create security middleware
2. Configure CORS to restrict to allowed origins from env
3. Set Content-Security-Policy header
4. Add OWASP recommended headers (X-Content-Type-Options, X-Frame-Options, etc.)

VALIDATION:
cd backend && npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create consistent error handling middleware

CONTEXT: Create error handler that returns consistent { error: { code, message, details } } format

FILES TO CREATE:
- backend/src/middleware/errorHandler.ts
- backend/src/utils/errors.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create error types in utils/errors.ts
2. Create error handler middleware that returns { error: { code, message, details } }
3. Log database errors but return generic message to client
4. Return appropriate status codes for each error type

VALIDATION:
cd backend && npm run build

---

ROLE: React Frontend Specialist

GOAL: Set up React Router with base routes

CONTEXT: Configure react-router-dom with routes for home, demo, and artifact management

FILES TO CREATE:
- frontend/src/routes/index.tsx
- frontend/src/pages/Home.tsx
- frontend/src/pages/Demo.tsx
- frontend/src/pages/Artifacts.tsx
- frontend/src/pages/NotFound.tsx

FILES TO MODIFY:
- frontend/package.json
- frontend/src/App.tsx

DETAILED STEPS:
1. Install react-router-dom
2. Create routes configuration with /, /demo, /artifacts routes
3. Create page components: Home, Demo, Artifacts, NotFound
4. Update App.tsx with BrowserRouter and Routes

VALIDATION:
cd frontend && npm run build

---

ROLE: React Frontend Specialist

GOAL: Create React context for global application state

CONTEXT: Build context provider for global state (session ID, artifacts list, loading states)

FILES TO CREATE:
- frontend/src/contexts/AppContext.tsx
- frontend/src/types/app.ts

FILES TO MODIFY:
- frontend/src/App.tsx

DETAILED STEPS:
1. Create types/app.ts with AppState interface
2. Create AppContext with session ID, artifacts list, loading states
3. Create useAppContext hook that exposes state and setters
4. Generate session ID on mount
5. Wrap App with AppContext provider

VALIDATION:
cd frontend && npm run build

---

ROLE: React Frontend Specialist

GOAL: Create DemoEngine component with WASM integration

CONTEXT: Create component that loads WASM and provides UI for demo input/output

FILES TO CREATE:
- frontend/src/components/DemoEngine.tsx

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create DemoEngine component that integrates useWasm hook
2. Add input field for demo parameters
3. Add output display for demo results
4. Handle loading and error states
5. Style with Tailwind CSS

VALIDATION:
cd frontend && npm run build

---

ROLE: React Frontend Specialist

GOAL: Create ArtifactManager component for artifact listing

CONTEXT: Create component for listing, viewing, and deleting saved artifacts

FILES TO CREATE:
- frontend/src/components/ArtifactManager.tsx

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create ArtifactManager component that lists artifacts from API
2. Display title, type, date for each artifact
3. Add delete button per artifact
4. Add load button to view artifact details
5. Style with Tailwind CSS

VALIDATION:
cd frontend && npm run build

---

ROLE: React Frontend Specialist

GOAL: Create ArtifactDetail component for viewing artifact content

CONTEXT: Create component for viewing full artifact content with JSON pretty-print

FILES TO CREATE:
- frontend/src/components/ArtifactDetail.tsx

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create ArtifactDetail component
2. Display artifact title, type, metadata
3. Format content as readable JSON with pretty-print
4. Add back button to return to list
5. Style with Tailwind CSS

VALIDATION:
cd frontend && npm run build

---

ROLE: React Frontend Specialist

GOAL: Create SaveArtifactModal component

CONTEXT: Create modal for saving current demo result as artifact

FILES TO CREATE:
- frontend/src/components/SaveArtifactModal.tsx

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create SaveArtifactModal component
2. Add title input field
3. Add artifact type selector (PRD, ARD, TASK_LIST)
4. Add save and cancel buttons
5. Validate before submit
6. Style with Tailwind CSS

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend Styling Specialist

GOAL: Apply responsive Tailwind classes to all components

CONTEXT: Apply Tailwind classes for responsive design across all components

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/components/DemoEngine.tsx
- frontend/src/components/ArtifactManager.tsx
- frontend/src/components/ArtifactDetail.tsx
- frontend/src/components/SaveArtifactModal.tsx
- frontend/src/App.tsx

DETAILED STEPS:
1. Apply mobile breakpoint (sm:) classes
2. Apply tablet breakpoint (md:) classes
3. Apply desktop breakpoint (lg:) classes
4. Ensure all components are responsive
5. Add dark mode support (optional)

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Create base API client configuration

CONTEXT: Set up fetch wrapper with base URL, default headers, and error handling

FILES TO CREATE:
- frontend/src/api/client.ts
- frontend/src/api/types.ts

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create client.ts with fetch wrapper
2. Configure base URL from environment variable
3. Set default JSON content-type header
4. Implement consistent error parsing

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Create saveArtifact API function

CONTEXT: Create typed function for POST /api/artifacts with TypeScript types

FILES TO CREATE:
- frontend/src/api/artifacts.ts

FILES TO MODIFY:
- frontend/src/api/types.ts

DETAILED STEPS:
1. Create ArtifactCreate type in types.ts
2. Create saveArtifact function that POSTs to /api/artifacts
3. Return Artifact type with id and timestamps
4. Throw structured errors

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Create loadArtifact API function

CONTEXT: Create typed function for GET /api/artifacts/:id

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/api/artifacts.ts

DETAILED STEPS:
1. Create loadArtifact function that GETs /api/artifacts/:id
2. Accept UUID string parameter
3. Return full Artifact object
4. Throw 404 error if not found

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Create listArtifacts API function

CONTEXT: Create typed function for GET /api/artifacts with filter parameters

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/api/types.ts
- frontend/src/api/artifacts.ts

DETAILED STEPS:
1. Create ArtifactListFilters type in types.ts
2. Create listArtifacts function that GETs /api/artifacts
3. Accept filter params type
4. Return { artifacts: Artifact[], total: number }
5. Encode query params correctly

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Create deleteArtifact API function

CONTEXT: Create typed function for DELETE /api/artifacts/:id

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/api/artifacts.ts

DETAILED STEPS:
1. Create deleteArtifact function that DELETEs /api/artifacts/:id
2. Accept UUID string parameter
3. Return { deleted: boolean }
4. Throw 404 error if not found

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Create healthCheck API function

CONTEXT: Create typed function for GET /health

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/api/health.ts
- frontend/src/api/types.ts

DETAILED STEPS:
1. Create HealthResponse type in types.ts
2. Create healthCheck function that GETs /health
3. Return { status: string, version: string, timestamp: string }

VALIDATION:
cd frontend && npm run build

---

ROLE: TypeScript Specialist

GOAL: Create TypeScript types for API contracts

CONTEXT: Create types file with Artifact, ArtifactCreate, ArtifactListFilters, etc.

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/api/types.ts

DETAILED STEPS:
1. Create Artifact type with all fields
2. Create ArtifactCreate type for requests
3. Create ArtifactListFilters type
4. Create ArtifactType enum (PRD, ARD, TASK_LIST)
5. Export all types for component use

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend API Specialist

GOAL: Add request ID tracking to API client

CONTEXT: Generate and attach X-Request-ID header to all API calls

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/api/client.ts

DETAILED STEPS:
1. Generate UUID for each request
2. Attach X-Request-ID header to all fetch calls
3. Make request ID available for error logging

VALIDATION:
cd frontend && npm run build

---

ROLE: Backend Observability Engineer

GOAL: Create structured JSON logging utility

CONTEXT: Create logger utility that outputs JSON with timestamp, level, and context

FILES TO CREATE:
- backend/src/utils/logger.ts
- backend/src/middleware/requestLogger.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create logger utility that outputs JSON with timestamp, level, message fields
2. Create request logging middleware that logs all API calls
3. Apply middleware to server

VALIDATION:
cd backend && npm run build

---

ROLE: Backend Observability Engineer

GOAL: Add request timing middleware

CONTEXT: Track and log response times for all API endpoints

FILES TO CREATE:
- backend/src/middleware/timing.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create timing middleware
2. Track duration for each request
3. Log response time in milliseconds
4. Include endpoint path in logs

VALIDATION:
cd backend && npm run build

---

ROLE: Frontend Observability Engineer

GOAL: Add global error tracking on frontend

CONTEXT: Set up global error handler for client-side exceptions and WASM failures

FILES TO CREATE:
- frontend/src/utils/errorTracking.ts

FILES TO MODIFY:
- frontend/src/main.tsx

DETAILED STEPS:
1. Create error tracking utility
2. Set up window.onerror to catch unhandled errors
3. Track WASM initialization errors
4. Log errors to console with context
5. Initialize in main.tsx

VALIDATION:
cd frontend && npm run build

---

ROLE: Backend Observability Engineer

GOAL: Create metrics collection endpoint

CONTEXT: Create internal endpoints for scraping metrics (response times, operation counts, error rates)

FILES TO CREATE:
- backend/src/routes/metrics.ts
- backend/src/utils/metrics.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create metrics utility for tracking response times, operations, errors
2. Create GET /metrics endpoint
3. Track p50, p95, p99 response times
4. Track error rates by type

VALIDATION:
cd backend && npm run build

---

ROLE: Frontend Specialist

GOAL: Add session tracking with localStorage

CONTEXT: Generate and persist session ID for correlating user actions

FILES TO CREATE:
- frontend/src/utils/session.ts

FILES TO MODIFY:
- frontend/src/contexts/AppContext.tsx
- frontend/src/api/client.ts

DETAILED STEPS:
1. Create session utility that generates session ID on first visit
2. Store session ID in localStorage
3. Include session ID in all API requests
4. Update AppContext to use session utility

VALIDATION:
cd frontend && npm run build

---

ROLE: Backend DevOps Engineer

GOAL: Configure static file serving with cache headers

CONTEXT: Set up Express static middleware with long cache headers for hashed assets

FILES TO CREATE:
- backend/src/middleware/static.ts

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Create static file middleware
2. Assets with hash in filename get 1-year cache
3. index.html gets no-cache header
4. WASM files get appropriate headers

VALIDATION:
cd backend && npm run build

---

ROLE: Backend DevOps Engineer

GOAL: Add SPA fallback middleware

CONTEXT: Configure Express to serve index.html for all non-API, non-static routes

FILES TO CREATE:
_None_

FILES TO MODIFY:
- backend/src/server.ts

DETAILED STEPS:
1. Add fallback middleware that serves index.html for all non-API, non-static routes
2. Ensure API routes are not affected
3. Ensure static assets take priority

VALIDATION:
cd backend && npm run build

---

ROLE: Backend Performance Engineer

GOAL: Add gzip compression middleware

CONTEXT: Add compression middleware for response gzip encoding

FILES TO CREATE:
_None_

FILES TO MODIFY:
- backend/package.json
- backend/src/server.ts

DETAILED STEPS:
1. Install compression package
2. Add compression middleware to server
3. Compressible responses get gzip encoding
4. WASM files compressed
5. Set Vary: Accept-Encoding header

VALIDATION:
cd backend && npm run build

---

ROLE: Frontend Performance Engineer

GOAL: Configure code splitting with React.lazy

CONTEXT: Set up route-based code splitting with lazy loading for React components

FILES TO CREATE:
_None_

FILES TO MODIFY:
- frontend/src/routes/index.tsx
- frontend/vite.config.ts

DETAILED STEPS:
1. Configure Vite for manual chunks
2. Use React.lazy() for route components
3. Add Suspense boundaries for lazy loaded components

VALIDATION:
cd frontend && npm run build

---

ROLE: Frontend Build Engineer

GOAL: Create SRI hash generation for WASM files

CONTEXT: Build script generates integrity hashes for WASM files

FILES TO CREATE:
- scripts/generate-sri.ts
- frontend/sri-hashes.json

FILES TO MODIFY:
- package.json

DETAILED STEPS:
1. Create script to generate SRI hashes during build
2. Generate hash for WASM files
3. Store hashes in sri-hashes.json
4. Include hash in WASM references

VALIDATION:
npm run build

---

ROLE: Frontend Testing Engineer

GOAL: Set up Vitest with React Testing Library

CONTEXT: Configure Vitest with React Testing Library and test environment

FILES TO CREATE:
- frontend/vitest.config.ts
- frontend/src/__tests__/example.test.tsx
- frontend/src/test-utils.tsx

FILES TO MODIFY:
- frontend/package.json

DETAILED STEPS:
1. Install vitest, @testing-library/react, jsdom
2. Create vitest.config.ts with test environment
3. Create test-utils.tsx with render utilities
4. Create example test that passes

VALIDATION:
cd frontend && npm run test

---

ROLE: Frontend Testing Engineer

GOAL: Write unit tests for API client functions

CONTEXT: Test all API client functions with mocked fetch responses

FILES TO CREATE:
- frontend/src/__tests__/api/artifacts.test.ts
- frontend/src/__tests__/api/health.test.ts
- frontend/src/__tests__/api/client.test.ts

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create tests for all API client functions
2. Mock fetch responses
3. Cover success and error cases
4. Validate TypeScript types

VALIDATION:
cd frontend && npm run test

---

ROLE: Frontend Testing Engineer

GOAL: Write unit tests for React components

CONTEXT: Test key components with React Testing Library

FILES TO CREATE:
- frontend/src/__tests__/components/DemoEngine.test.tsx
- frontend/src/__tests__/components/ArtifactManager.test.tsx

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create tests for DemoEngine component
2. Create tests for ArtifactManager component
3. Cover user interactions
4. Mock useWasm and API calls

VALIDATION:
cd frontend && npm run test

---

ROLE: Rust Testing Engineer

GOAL: Write Rust unit tests for WASM module

CONTEXT: Create Rust unit tests for core demo engine logic

FILES TO CREATE:
_None_

FILES TO MODIFY:
- wasm/src/lib.rs

DETAILED STEPS:
1. Add #[cfg(test)] module
2. Write tests for core logic functions
3. Cover edge cases
4. Ensure cargo test passes

VALIDATION:
cd wasm && cargo test

---

ROLE: Backend Testing Engineer

GOAL: Set up API integration tests

CONTEXT: Create test suite that hits API endpoints with test database

FILES TO CREATE:
- backend/src/__tests__/integration/artifacts.test.ts
- backend/src/__tests__/setup.ts

FILES TO MODIFY:
- backend/package.json

DETAILED STEPS:
1. Install testing dependencies (supertest, jest)
2. Create test setup with test database
3. Create integration tests for all endpoints
4. Ensure tests clean up after themselves

VALIDATION:
cd backend && npm run test:integration

---

ROLE: E2E Testing Engineer

GOAL: Set up Playwright with basic configuration

CONTEXT: Configure Playwright with basic smoke test

FILES TO CREATE:
- playwright.config.ts
- e2e/example.spec.ts

FILES TO MODIFY:
- package.json

DETAILED STEPS:
1. Install @playwright/test
2. Create playwright.config.ts
3. Create basic smoke test
4. Configure multiple browsers

VALIDATION:
npm run test:e2e

---

ROLE: E2E Testing Engineer

GOAL: Write E2E tests for artifact flows

CONTEXT: Create Playwright tests for save/load/delete artifact flows

FILES TO CREATE:
- e2e/artifacts.spec.ts

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create test for create and save artifact flow
2. Create test for load and view artifact flow
3. Create test for delete artifact flow

VALIDATION:
npm run test:e2e

---

ROLE: Database Testing Engineer

GOAL: Create database migration tests

CONTEXT: Test migration up/down with test database

FILES TO CREATE:
- backend/src/__tests__/migrations.test.ts

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create migration tests
2. Test migration up creates tables
3. Test migration down removes tables
4. Verify idempotent migrations

VALIDATION:
cd backend && npm run test:migrations

---

ROLE: Technical Writer

GOAL: Create README with setup instructions

CONTEXT: Document all environment variables, deployment steps, and requirements

FILES TO CREATE:
- README.md

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Document all environment variables
2. Include setup instructions
3. List all dependencies

VALIDATION:
npm run build

---

ROLE: DevOps Engineer

GOAL: Create build and deployment scripts

CONTEXT: Write scripts for building frontend, WASM, and preparing backend for deployment

FILES TO CREATE:
- scripts/build.sh
- package.json

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create build.sh script that builds all artifacts
2. Build WASM with wasm-pack
3. Build frontend with Vite
4. Build backend with TypeScript compiler
5. Output production builds to dist/ directory

VALIDATION:
./scripts/build.sh

---

ROLE: DevOps Engineer

GOAL: Create Docker configuration for development

CONTEXT: Write Dockerfile and docker-compose for local development

FILES TO CREATE:
- Dockerfile
- docker-compose.yml
- .dockerignore

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create Dockerfile for production image
2. Create docker-compose.yml with app and database services
3. Create .dockerignore
4. Ensure docker-compose up runs full stack

VALIDATION:
docker-compose build

---

ROLE: Technical Writer

GOAL: Create API documentation

CONTEXT: Create API documentation with examples for all endpoints

FILES TO CREATE:
- docs/api.md

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Document all endpoints
2. Provide request/response examples
3. Document error codes

VALIDATION:
npm run build

---

ROLE: DevOps Engineer

GOAL: Document production migration workflow

CONTEXT: Document and script database migration process for production

FILES TO CREATE:
- docs/migrations.md
- scripts/migrate.sh

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Document migration steps
2. Document rollback process
3. Include backup recommendations
4. Create migration script

VALIDATION:
npm run build
