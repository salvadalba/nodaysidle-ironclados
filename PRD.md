# Ironclad OS

## 🎯 Product Vision
A deterministic, AI-powered software development platform that transforms natural language requirements into production-ready software artifacts—PRDs, architecture diagrams, task lists, and verifiable code—using Rust-based logic engines to eliminate hallucinations and compress the development lifecycle from weeks to hours.

## ❓ Problem Statement
Software teams spend 70% of their time on planning, documentation, and coordination before writing a single line of production code. Existing AI tools hallucinate, produce unstructured outputs, and cannot be verified. Buyers fear adopting AI because outputs cannot be trusted for critical business logic.

## 🎯 Goals
- Transform natural language prompts into structured PRDs, architecture diagrams, and Jira-style task lists
- Provide transparent, verifiable logic through an 'X-Ray Toggle' that reveals underlying Rust structs and state machines
- Achieve sub-second response times with zero perceived latency
- Demonstrate 70% reduction in pre-development planning time
- Enable users to copy-paste executable agent rule definitions
- Run core logic client-side via WASM for privacy and speed
- Achieve 100/100 Lighthouse performance scores

## 🚫 Non-Goals
- Full-code generation of complete applications
- Multi-user collaboration features in v1
- Custom theme customization beyond the brutal aesthetic
- Integration with external project management tools (Jira, Linear, etc.)
- Natural language processing for code editing
- User authentication and account management in v1

## 👥 Target Users
- CTOs and Technical Founders evaluating AI tooling
- Product Managers seeking to accelerate requirement gathering
- Engineering Leads responsible for system architecture
- Startups needing to validate ideas quickly
- Enterprise teams exploring deterministic AI solutions

## 🧩 Core Features
- Two-Sentence Terminal: Natural language input that instantly generates four output quadrants (PRD, ARD, Task List, Agent Rules)
- X-Ray Toggle: Interactive switch that reveals underlying Rust structs and state machines behind polished UI elements
- Day 1 vs Day 30 Slider: Comparative visualization with real-time cost savings calculator based on team size
- Technical Deep Dive Section: Rust architecture showcase with live, copyable code snippets
- WASM Demo Engine: Client-side logic execution for privacy and instant response
- WebGL Background: Subtle digital grain/blueprint grid that reacts to mouse movement

## ⚙️ Non-Functional Requirements
- 100/100 Lighthouse performance score
- Sub-second response time for all interactions
- No loading spinners or smooth fade animations
- All core logic runs client-side via WASM
- Zero data sent to external servers during demo
- Support for modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for desktop and tablet (minimum 1024px width recommended)

## 📊 Success Metrics
- Average time from prompt to complete output: < 2 seconds
- Lighthouse performance score: 100/100
- X-Ray Toggle engagement rate: > 60% of users
- Demo completion rate: > 40% of visitors
- WASM module load time: < 500ms
- Bounce rate: < 50%

## 📌 Assumptions
- Users have modern browsers supporting WASM and WebGL
- Primary access is via desktop/tablet, not mobile
- Users are familiar with software development terminology
- The 'Two-Sentence Terminal' demo will use preset prompts for most users
- WASM file size will be kept under 2MB for fast loading
- No user authentication is required for v1

## ❓ Open Questions
- Should the WASM engine actually generate real outputs or use curated demonstrations?
- What is the maximum complexity of prompts the demo engine should support?
- Should the cost savings calculator be configurable beyond team size?
- Should we include a 'Download Artifacts' feature for generated outputs?
- What telemetry (if any) should be collected for product improvement?
