# Stage 1: Build the app
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Run the app
FROM node:22-slim

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port (default Next.js port)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
