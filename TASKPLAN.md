# Tasks Plan — Ironclad OS

## 📌 Global Assumptions
- Solo developer working on the project
- PostgreSQL database externally hosted or managed
- Deployment target is standard Node.js hosting
- Browser supports WASM (Chrome 57+, Firefox 52+, Safari 11+)
- Development environment has Node.js 18+, Rust toolchain, and PostgreSQL client

## ⚠️ Risks
- WASM module size may exceed 2MB limit as features grow
- Browser compatibility issues with WASM on older devices
- PostgreSQL connection pool exhaustion under high load
- CORS issues if frontend and backend deployed on different origins
- WASM compilation time increases build duration

## 🧩 Epics
## Project Setup & Infrastructure
**Goal:** Initialize project structure with build tooling and development environment

### ✅ Initialize monorepo with package.json and workspaces (0.5)

Set up root package.json with workspaces for frontend and backend, configure TypeScript shared config

**Acceptance Criteria**
- Root package.json exists with workspaces configured
- Shared tsconfig.json exists
- npm install runs without errors

**Dependencies**
_None_
### ✅ Set up Vite + React + TypeScript frontend (0.5)

Create frontend directory with Vite config, React entry point, and base App component

**Acceptance Criteria**
- npm run dev starts development server on localhost
- React renders without console errors
- HMR works for file changes

**Dependencies**
_None_
### ✅ Configure Tailwind CSS in Vite (0.25)

Install Tailwind CSS, create tailwind.config.js, add base styles to CSS entry point

**Acceptance Criteria**
- Tailwind classes are processed correctly
- PostCSS config exists
- Base styles include @tailwind directives

**Dependencies**
- Set up Vite + React + TypeScript frontend
### ✅ Set up Node.js backend with Express (0.5)

Create backend directory with Express server, TypeScript config, and basic middleware

**Acceptance Criteria**
- Server starts with npm run dev
- GET /health returns { status: 'ok' }
- CORS middleware configured

**Dependencies**
_None_
### ✅ Configure PostgreSQL connection pooling (0.5)

Set up pg library with connection pool configuration, environment variable support

**Acceptance Criteria**
- Database connection succeeds with valid DATABASE_URL
- Connection pool limits max 20 connections
- Graceful shutdown closes connections

**Dependencies**
- Set up Node.js backend with Express
### ✅ Create database migration system (0.5)

Set up SQL migration runner with up/down migration files for artifacts table

**Acceptance Criteria**
- migrate() function executes SQL files in order
- Artifacts table created with correct schema
- Migration history tracked

**Dependencies**
- Configure PostgreSQL connection pooling
### ✅ Set up environment variable configuration (0.25)

Create .env.example, install dotenv, load env vars in backend, validate required vars

**Acceptance Criteria**
- .env.example documents all required variables
- Server fails fast with missing required env vars
- DATABASE_URL, PORT, CORS_ORIGIN configurable

**Dependencies**
- Set up Node.js backend with Express

## WASM Module Integration
**Goal:** Build and integrate Rust WASM module for demo engine logic

### ✅ Initialize Rust project with wasm-pack (0.5)

Create wasm/ directory with Cargo.toml configured for wasm32-unknown-unknown target

**Acceptance Criteria**
- Cargo.toml has crate-type = ['cdylib']
- wasm-pack build outputs .wasm file
- Basic lib.rs exists with empty module

**Dependencies**
_None_
### ✅ Implement wasm-bindgen exports for demo engine (1)

Create JavaScript-accessible functions: initialize(), executeDemo(input), cleanup()

**Acceptance Criteria**
- Functions exported with #[wasm_bindgen]
- wasm-pack build generates JS bindings
- TypeScript definitions generated (.d.ts)

**Dependencies**
- Initialize Rust project with wasm-pack
### ✅ Implement basic demo engine logic in Rust (1)

Create core demo execution logic with input validation and result generation

**Acceptance Criteria**
- executeDemo accepts string input and returns structured output
- Error handling returns meaningful error messages
- Module size under 2MB after build

**Dependencies**
- Implement wasm-bindgen exports for demo engine
### ✅ Create React WASM runtime hook (0.5)

Build useWasm hook that loads module, initializes it, and exposes executeDemo function

**Acceptance Criteria**
- useWasm returns { isLoading, error, executeDemo }
- WASM loads on first use (lazy loading)
- Cleanup on unmount

**Dependencies**
- Implement basic demo engine logic in Rust
### ✅ Integrate WASM bundling in Vite (0.5)

Configure Vite to handle .wasm imports, set up proper headers for WASM loading

**Acceptance Criteria**
- WASM file imports work in React code
- Correct Content-Type headers set
- SRI hashes generated for integrity check

**Dependencies**
- Implement wasm-bindgen exports for demo engine

## Backend REST API
**Goal:** Implement all artifact persistence endpoints with validation

### ✅ Implement POST /api/artifacts endpoint (1)

Create endpoint handler for saving artifacts with validation and database insert

**Acceptance Criteria**
- Accepts { session_id, artifact_type, title, content, metadata }
- Returns 201 with { id, created_at, updated_at }
- Returns 400 for invalid artifact_type
- Returns 422 for validation failures

**Dependencies**
- Create database migration system
### ✅ Implement GET /api/artifacts/:id endpoint (0.5)

Create endpoint handler for loading single artifact by UUID

**Acceptance Criteria**
- Returns 200 with full artifact object
- Returns 404 for non-existent artifact
- Validates UUID format

**Dependencies**
- Implement POST /api/artifacts endpoint
### ✅ Implement GET /api/artifacts list endpoint (0.5)

Create endpoint handler with query params for session_id, artifact_type, limit, offset

**Acceptance Criteria**
- Filters by session_id and artifact_type correctly
- Pagination works with limit/offset
- Returns { artifacts: [], total: count }
- Returns 400 for invalid params

**Dependencies**
- Implement GET /api/artifacts/:id endpoint
### ✅ Implement DELETE /api/artifacts/:id endpoint (0.5)

Create endpoint handler for artifact deletion

**Acceptance Criteria**
- Returns 200 with { deleted: true } on success
- Returns 404 for non-existent artifact
- Actually deletes from database

**Dependencies**
- Implement GET /api/artifacts list endpoint
### ✅ Add input validation middleware (0.5)

Create validation schemas for all request bodies using a validation library

**Acceptance Criteria**
- Artifact type limited to PRD|ARD|TASK_LIST
- Content size max 1MB enforced
- Required fields validated before processing

**Dependencies**
- Implement POST /api/artifacts endpoint
### ✅ Implement rate limiting middleware (0.5)

Add rate limiting on API endpoints using express-rate-limit or similar

**Acceptance Criteria**
- Configurable requests per minute
- Rate limit headers returned in response
- Distributed counter ready for future scaling

**Dependencies**
- Add input validation middleware
### ✅ Add security headers middleware (0.5)

Configure CORS, CSP, and other security headers

**Acceptance Criteria**
- CORS restricts to allowed origins
- Content-Security-Policy header set
- Other OWASP recommended headers present

**Dependencies**
- Implement rate limiting middleware
### ✅ Implement structured error handling (0.5)

Create error handler that returns consistent { error: { code, message, details } } format

**Acceptance Criteria**
- All errors return JSON format
- Database errors logged, generic message to client
- Appropriate status codes for each error type

**Dependencies**
- Add security headers middleware

## Frontend UI Components
**Goal:** Build React components for demo engine and artifact management

### ✅ Set up React Router (0.5)

Configure react-router-dom with routes for home, demo, and artifact management

**Acceptance Criteria**
- Base routes defined (/ /demo /artifacts)
- Navigation works without page reload
- 404 route implemented

**Dependencies**
- Set up Vite + React + TypeScript frontend
### ✅ Create AppContext for state management (0.5)

Build context provider for global state (session ID, artifacts list, loading states)

**Acceptance Criteria**
- useAppContext hook exposes state and setters
- Session ID generated on mount
- Artifacts list cacheable

**Dependencies**
- Set up React Router
### ✅ Build DemoEngine component (1)

Create component that loads WASM and provides UI for demo input/output

**Acceptance Criteria**
- Integrates useWasm hook
- Input field for demo parameters
- Output display for demo results
- Loading and error states handled

**Dependencies**
- Create React WASM runtime hook
### ✅ Build ArtifactManager component (1)

Create component for listing, viewing, and deleting saved artifacts

**Acceptance Criteria**
- Lists artifacts from API
- Each item shows title, type, date
- Delete button per artifact
- Load button to view artifact details

**Dependencies**
- Create AppContext for state management
### ✅ Build ArtifactDetail component (0.5)

Create component for viewing full artifact content with JSON pretty-print

**Acceptance Criteria**
- Displays artifact title, type, metadata
- Content formatted as readable JSON
- Back button to return to list

**Dependencies**
- Build ArtifactManager component
### ✅ Build SaveArtifactModal component (0.5)

Create modal for saving current demo result as artifact

**Acceptance Criteria**
- Title input field
- Artifact type selector
- Save and cancel buttons
- Validation before submit

**Dependencies**
- Build DemoEngine component
### ✅ Implement responsive layout with Tailwind (0.5)

Apply Tailwind classes for responsive design across all components

**Acceptance Criteria**
- Mobile breakpoint works
- Tablet breakpoint works
- Desktop breakpoint works
- Dark mode support (optional)

**Dependencies**
- Build ArtifactDetail component

## Frontend API Client
**Goal:** Build TypeScript client for backend API communication

### ✅ Create API client base configuration (0.5)

Set up fetch wrapper with base URL, default headers, and error handling

**Acceptance Criteria**
- BaseURL configurable via env var
- JSON content-type header by default
- Consistent error parsing

**Dependencies**
_None_
### ✅ Implement saveArtifact function (0.5)

Create typed function for POST /api/artifacts with TypeScript types

**Acceptance Criteria**
- Accepts ArtifactCreate type parameter
- Returns Artifact type with id and timestamps
- Throws structured errors

**Dependencies**
- Create API client base configuration
### ✅ Implement loadArtifact function (0.25)

Create typed function for GET /api/artifacts/:id

**Acceptance Criteria**
- Accepts UUID string parameter
- Returns full Artifact object
- Throws 404 error if not found

**Dependencies**
- Implement saveArtifact function
### ✅ Implement listArtifacts function (0.5)

Create typed function for GET /api/artifacts with filter parameters

**Acceptance Criteria**
- Accepts filter params type
- Returns { artifacts: Artifact[], total: number }
- Query params correctly encoded

**Dependencies**
- Implement loadArtifact function
### ✅ Implement deleteArtifact function (0.25)

Create typed function for DELETE /api/artifacts/:id

**Acceptance Criteria**
- Accepts UUID string parameter
- Returns { deleted: boolean }
- Throws 404 error if not found

**Dependencies**
- Implement listArtifacts function
### ✅ Implement healthCheck function (0.25)

Create typed function for GET /health

**Acceptance Criteria**
- Returns { status: string, version: string, timestamp: string }
- Used for connection testing

**Dependencies**
- Implement deleteArtifact function
### ✅ Add TypeScript types for all API contracts (0.5)

Create types file with Artifact, ArtifactCreate, ArtifactListFilters, etc.

**Acceptance Criteria**
- All API request/response shapes typed
- ArtifactType enum (PRD, ARD, TASK_LIST)
- Exported types used by components

**Dependencies**
- Create API client base configuration
### ✅ Add request ID tracking (0.25)

Generate and attach X-Request-ID header to all API calls

**Acceptance Criteria**
- UUID generated for each request
- Header attached to all fetch calls
- Available for error logging

**Dependencies**
- Implement healthCheck function

## Observability & Monitoring
**Goal:** Add logging, metrics, and health monitoring

### ✅ Implement structured JSON logging on backend (0.5)

Create logger utility that outputs JSON with timestamp, level, and context

**Acceptance Criteria**
- Logs formatted as JSON
- Timestamp, level, message fields present
- Request logging middleware logs all API calls

**Dependencies**
- Implement structured error handling
### ✅ Add request timing middleware (0.5)

Track and log response times for all API endpoints

**Acceptance Criteria**
- Duration logged for each request
- Response time logged in milliseconds
- Logs include endpoint path

**Dependencies**
- Implement structured JSON logging on backend
### ✅ Implement frontend error tracking (0.5)

Set up global error handler for client-side exceptions and WASM failures

**Acceptance Criteria**
- window.onerror catches unhandled errors
- WASM initialization errors tracked
- Errors logged to console with context

**Dependencies**
- Create React WASM runtime hook
### ✅ Add metrics collection endpoints (0.5)

Create internal endpoints for scraping metrics (response times, operation counts, error rates)

**Acceptance Criteria**
- GET /metrics returns basic metrics
- Tracks p50, p95, p99 response times
- Tracks error rates by type

**Dependencies**
- Add request timing middleware
### ✅ Implement session tracking on frontend (0.5)

Generate and persist session ID for correlating user actions

**Acceptance Criteria**
- Session ID generated on first visit
- Stored in localStorage
- Included in all API requests

**Dependencies**
- Create AppContext for state management

## Static Asset Serving & Performance
**Goal:** Configure production asset serving with caching and optimization

### ✅ Configure static file serving with cache headers (0.5)

Set up Express static middleware with long cache headers for hashed assets

**Acceptance Criteria**
- Assets with hash in filename get 1-year cache
- index.html gets no-cache header
- WASM files get appropriate headers

**Dependencies**
- Set up Node.js backend with Express
### ✅ Implement SPA routing fallback (0.25)

Configure Express to serve index.html for all non-API, non-static routes

**Acceptance Criteria**
- Direct URL loads work
- API routes not affected
- Static assets take priority

**Dependencies**
- Configure static file serving with cache headers
### ✅ Enable gzip compression (0.25)

Add compression middleware for response gzip encoding

**Acceptance Criteria**
- Compressible responses get gzip encoding
- WASM files compressed
- Vary: Accept-Encoding header set

**Dependencies**
- Implement SPA routing fallback
### ✅ Configure Vite code splitting (0.5)

Set up route-based code splitting with lazy loading for React components

**Acceptance Criteria**
- Each route generates separate chunk
- Components use React.lazy()
- Chunk sizes reasonable

**Dependencies**
- Set up React Router
### ✅ Generate SRI hashes for WASM (0.5)

Build script generates integrity hashes for WASM files

**Acceptance Criteria**
- SRI hash generated during build
- Hash included in HTML/CSS references
- WASM validated on load

**Dependencies**
- Integrate WASM bundling in Vite

## Testing
**Goal:** Implement unit, integration, and E2E tests

### ✅ Set up Vitest for frontend unit tests (0.5)

Configure Vitest with React Testing Library and test environment

**Acceptance Criteria**
- npm run test runs Vitest
- Test environment configured
- Example test passes

**Dependencies**
- Set up Vite + React + TypeScript frontend
### ✅ Write unit tests for API client (1)

Test all API client functions with mocked fetch responses

**Acceptance Criteria**
- All functions have tests
- Success and error cases covered
- TypeScript types validated

**Dependencies**
- Add TypeScript types for all API contracts
### ✅ Write unit tests for React components (1)

Test key components with React Testing Library

**Acceptance Criteria**
- DemoEngine component tested
- ArtifactManager component tested
- User interactions covered

**Dependencies**
- Build ArtifactDetail component
### ✅ Write WASM unit tests in Rust (1)

Create Rust unit tests for core demo engine logic

**Acceptance Criteria**
- cargo test passes
- Core logic functions tested
- Edge cases covered

**Dependencies**
- Implement basic demo engine logic in Rust
### ✅ Set up integration tests for API endpoints (1)

Create test suite that hits API endpoints with test database

**Acceptance Criteria**
- All endpoints tested
- Test database isolated
- Tests clean up after themselves

**Dependencies**
- Implement DELETE /api/artifacts/:id endpoint
### ✅ Set up Playwright for E2E tests (0.5)

Configure Playwright with basic smoke test

**Acceptance Criteria**
- npm run test:e2e runs Playwright
- Basic flow test passes
- Multiple browsers configured

**Dependencies**
- Build SaveArtifactModal component
### ✅ Write E2E tests for core user flows (1)

Create Playwright tests for save/load/delete artifact flows

**Acceptance Criteria**
- Create and save artifact flow tested
- Load and view artifact flow tested
- Delete artifact flow tested

**Dependencies**
- Set up Playwright for E2E tests
### ✅ Set up database migration tests (0.5)

Test migration up/down with test database

**Acceptance Criteria**
- Migration up creates tables
- Migration down removes tables
- Idempotent migrations verified

**Dependencies**
- Create database migration system

## Documentation & Deployment
**Goal:** Create deployment documentation and automation

### ✅ Create environment documentation (0.5)

Document all environment variables, deployment steps, and requirements

**Acceptance Criteria**
- README with setup instructions
- All env vars documented
- Dependencies listed

**Dependencies**
- Set up environment variable configuration
### ✅ Create build and deployment scripts (0.5)

Write scripts for building frontend, WASM, and preparing backend for deployment

**Acceptance Criteria**
- build.sh builds all artifacts
- Production build optimized
- Build artifacts in dist/ directory

**Dependencies**
- Generate SRI hashes for WASM
### ✅ Create Docker configuration (0.5)

Write Dockerfile and docker-compose for local development

**Acceptance Criteria**
- Dockerfile builds production image
- docker-compose includes app and database
- docker-compose up runs full stack

**Dependencies**
- Create build and deployment scripts
### ✅ Document API endpoints (0.5)

Create API documentation with examples for all endpoints

**Acceptance Criteria**
- All endpoints documented
- Request/response examples provided
- Error codes documented

**Dependencies**
- Implement DELETE /api/artifacts/:id endpoint
### ✅ Set up production database migration workflow (0.5)

Document and script database migration process for production

**Acceptance Criteria**
- Migration steps documented
- Rollback process documented
- Backup recommendations included

**Dependencies**
- Create environment documentation

## ❓ Open Questions
_None_
