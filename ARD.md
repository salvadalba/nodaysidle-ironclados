# Architecture Requirements Document

## 🧱 System Overview
Ironclad OS is a single-page web application that runs core logic client-side via WASM for privacy and performance. The architecture consists of a React-based frontend with a Node.js backend serving static assets and a PostgreSQL database for persisting user sessions and generated artifacts. The demo engine executes locally in the browser using compiled Rust WASM modules, ensuring zero external API calls during core functionality.

## 🏗 Architecture Style
Client-side SPA with server-side static asset hosting and optional persistence layer

## 🎨 Frontend Architecture
- **Framework:** React with TypeScript
- **State Management:** React Context API or Zustand for local state
- **Routing:** Client-side routing via React Router (minimal routes for demo sections)
- **Build Tooling:** Vite for fast development builds and optimized production bundles

## 🧠 Backend Architecture
- **Approach:** RESTful API serving static assets and optional persistence endpoints
- **API Style:** REST endpoints for saving/loading generated artifacts
- **Services:**
- Static asset service for React app and WASM modules
- Artifact persistence service (optional for v1)
- Analytics/telemetry service (minimal, if implemented)

## 🗄 Data Layer
- **Primary Store:** PostgreSQL for storing user sessions, generated PRDs, ARDs, and task lists
- **Relationships:** One-to-many: users to artifacts; optional for v1 demo
- **Migrations:** Simple schema with users table and artifacts table

## ☁️ Infrastructure
- **Hosting:** Node.js server hosted on Vercel, Netlify, or AWS (static deployment preferred for v1)
- **Scaling Strategy:** Horizontal scaling via CDN for static assets; WASM runs client-side so no server scaling needed for core logic
- **CI/CD:** GitHub Actions for automated testing, WASM compilation, and deployment

## ⚖️ Key Trade-offs
- WASM module size kept under 2MB limits complexity of demo engine
- No user authentication in v1 limits personalization but simplifies architecture
- Client-side execution prioritizes privacy and speed over advanced AI capabilities
- PostgreSQL included in stack but optional for v1 demo functionality
- Single-page design limits content organization but maximizes performance and simplicity

## 📐 Non-Functional Requirements
- 100/100 Lighthouse performance score
- Sub-second response time for all interactions
- WASM module load time under 500ms
- Zero external API calls during core demo functionality
- Responsive design for desktop and tablet (1024px minimum)
- Support for modern browsers with WASM and WebGL support
