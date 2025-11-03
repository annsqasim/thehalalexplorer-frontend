# ---------- Stage 1: Build the Next.js app ----------
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy all source code
    COPY . .
    
    # Build the Next.js app
    RUN npm run build
    
    # ---------- Stage 2: Run the production server ----------
    FROM node:18-alpine AS runner
    
    WORKDIR /app
    
    # Set NODE_ENV for production
    ENV NODE_ENV=production
    
    # Copy only necessary files from builder stage
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/next.config.ts ./next.config.ts
    
    # Expose Next.js default port
    EXPOSE 3000
    
    # Start Next.js in production mode
    CMD ["npm", "start"]
    