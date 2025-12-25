# Multi-stage build for Ironclad OS

# Stage 1: Build WASM module
FROM rust:1.75-slim as wasm-builder

WORKDIR /app/wasm
COPY wasm/ .

RUN cargo install wasm-pack && \
    wasm-pack build --target web --release

# Stage 2: Build frontend
FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
COPY --from=wasm-builder /app/wasm/pkg ./wasm/pkg

RUN npm run build

# Stage 3: Build backend
FROM node:18-alpine as backend-builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./

RUN npm run build

# Stage 4: Production image
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy backend build
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package.json ./

# Copy frontend static assets
COPY --from=frontend-builder /app/frontend/dist ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
