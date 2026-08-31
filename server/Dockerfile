# Use official Node 22 Alpine base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies cleanly using lockfile
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose default application port
EXPOSE 5000

# Start Express server
CMD ["npm", "start"]
