# Stage 1: Build
FROM node:18-alpine AS builder

# Set Working dir for build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of app code
COPY . .

# Stage-2: Runtime

FROM node:18-alpine

# Set Working dir for Runtime
WORKDIR /app

# Copy App from builder
COPY --from=builder /app /app

# Expose application
EXPOSE 8080

# Environment variable for MongoDB URL (can be overridden at runtime)
ENV MONGO_URI mongodb://mongodb:27017/studetail

# Start Node app
CMD ["node","index.js"]

