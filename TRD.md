# Technical Requirements Document

## 🧭 System Context
Ironclad OS is a single-page web application running core logic client-side via WASM. React frontend with TypeScript, built with Vite. Node.js backend serves static assets and provides optional REST endpoints for artifact persistence. PostgreSQL stores user sessions and generated artifacts. WASM modules compiled from Rust handle demo engine logic locally in the browser with zero external API calls during core functionality.

## 🔌 API Contracts
### Save Artifact
- **Method:** POST
- **Path:** /api/artifacts
- **Auth:** none
- **Request:** { "session_id": "string", "artifact_type": "PRD|ARD|TASK_LIST", "title": "string", "content": "object", "metadata": "object" }
- **Response:** { "id": "uuid", "created_at": "timestamp", "updated_at": "timestamp" }
- **Errors:**
- 400: Invalid artifact_type or malformed content
- 422: Validation failed
- 500: Database error

### Load Artifact
- **Method:** GET
- **Path:** /api/artifacts/:id
- **Auth:** none
- **Request:** 
- **Response:** { "id": "uuid", "session_id": "string", "artifact_type": "PRD|ARD|TASK_LIST", "title": "string", "content": "object", "metadata": "object", "created_at": "timestamp", "updated_at": "timestamp" }
- **Errors:**
- 404: Artifact not found
- 500: Database error

### List Artifacts
- **Method:** GET
- **Path:** /api/artifacts
- **Auth:** none
- **Request:** ?session_id=string&artifact_type=PRD|ARD|TASK_LIST&limit=number&offset=number
- **Response:** { "artifacts": ["array"], "total": "number" }
- **Errors:**
- 400: Invalid query parameters
- 500: Database error

### Delete Artifact
- **Method:** DELETE
- **Path:** /api/artifacts/:id
- **Auth:** none
- **Request:** 
- **Response:** { "deleted": "boolean" }
- **Errors:**
- 404: Artifact not found
- 500: Database error

### Health Check
- **Method:** GET
- **Path:** /health
- **Auth:** none
- **Request:** 
- **Response:** { "status": "ok", "version": "string", "timestamp": "timestamp" }
- **Errors:**
_None_

## 🧱 Modules
### Frontend - React App
- **Responsibilities:**
- Render UI components for demo sections
- Manage client-side state via Context/Zustand
- Handle client-side routing with React Router
- Load and initialize WASM modules
- Communicate with WASM for demo logic execution
- **Interfaces:**
- Component: App
- Component: DemoEngine
- Component: ArtifactManager
- Context: AppContext
- Hook: useWasm
- **Depends on:**
- WASM Runtime Module
- REST API Client

### Frontend - REST API Client
- **Responsibilities:**
- Make HTTP requests to backend endpoints
- Handle request/response serialization
- Manage error states and retries
- **Interfaces:**
- saveArtifact(data)
- loadArtifact(id)
- listArtifacts(filters)
- deleteArtifact(id)
- healthCheck()
- **Depends on:**
_None_

### Frontend - WASM Runtime Module
- **Responsibilities:**
- Load WASM modules from compiled Rust
- Expose JavaScript bindings for WASM functions
- Handle WASM initialization and memory management
- Execute demo engine logic client-side
- **Interfaces:**
- initialize()
- executeDemo(input)
- cleanup()
- **Depends on:**
_None_

### Backend - Static Asset Server
- **Responsibilities:**
- Serve React app bundle
- Serve WASM module files
- Handle SPA routing fallback
- Set appropriate cache headers
- **Interfaces:**
- GET /* → serve index.html for SPA routes
- GET /assets/* → serve static files
- **Depends on:**
_None_

### Backend - Artifact API Service
- **Responsibilities:**
- Handle POST /api/artifacts requests
- Handle GET /api/artifacts requests
- Handle GET /api/artifacts/:id requests
- Handle DELETE /api/artifacts/:id requests
- Validate request payloads
- Serialize/deserialize data to/from database
- **Interfaces:**
- createArtifact(data)
- getArtifact(id)
- listArtifacts(filters)
- deleteArtifact(id)
- **Depends on:**
- PostgreSQL Data Layer

### Backend - PostgreSQL Data Layer
- **Responsibilities:**
- Manage database connections
- Execute SQL queries
- Handle migrations
- Provide data access interface
- **Interfaces:**
- connect()
- query(sql, params)
- disconnect()
- migrate()
- **Depends on:**
_None_

## 🗃 Data Model Notes
- [object Object]
- [object Object]

## 🔐 Validation & Security
- Input validation on all API endpoints (payload size limits, type checking)
- SQL injection prevention via parameterized queries
- CORS headers configured for allowed origins only
- Rate limiting on API endpoints to prevent abuse
- Content-Security-Policy headers for XSS prevention
- WASM module integrity validation via SRI hashes
- Artifact content size limits (e.g., 1MB max per artifact)

## 🧯 Error Handling Strategy
Frontend uses try-catch around WASM calls with user-friendly error messages. API errors returned as JSON with consistent format: { error: { code, message, details } }. Database errors logged server-side, generic error returned to client. WASM initialization failures show fallback UI with browser compatibility check.

## 🔭 Observability
- **Logging:** Structured JSON logging on backend for API requests, errors, and database operations. Frontend error tracking for WASM failures and client-side exceptions.
- **Tracing:** Request ID header for all API calls to enable request tracing through logs. Client-side session ID for correlating user actions.
- **Metrics:**
- API endpoint response times (p50, p95, p99)
- WASM module load time
- Artifact save/load operation counts
- Error rates by type

## ⚡ Performance Notes
- WASM module kept under 2MB with gzip compression
- Static assets served with long cache headers (1 year for hashed filenames)
- API response times under 200ms via database query optimization
- React code splitting for route-based chunks
- Lazy loading of WASM module on first demo interaction
- PostgreSQL connection pooling (max 20 connections)

## 🧪 Testing Strategy
### Unit
- WASM function unit tests (Rust side)
- React component tests with Vitest/React Testing Library
- API client function tests
- Data layer query tests with test database
### Integration
- API endpoint tests with mocked database
- WASM-React integration tests
- Database migration tests
### E2E
- Playwright tests for full user flows (create, save, load artifact)
- Lighthouse CI for performance regression testing
- Cross-browser smoke tests (Chrome, Firefox, Safari)

## 🚀 Rollout Plan
- Phase 1: Deploy backend with static hosting, verify health endpoint
- Phase 2: Deploy database schema and run migrations
- Phase 3: Deploy frontend bundle, verify WASM loads successfully
- Phase 4: Enable artifact persistence endpoints, test save/load flows
- Phase 5: Enable production CDN caching, run performance validation

## ❓ Open Questions
_None_
