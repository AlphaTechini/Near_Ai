# Use Node.js 20 base image
FROM node:20-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript code
RUN pnpm build

# Remove devDependencies to reduce image size (optional, can skip if simple)
# RUN pnpm prune --prod

# Expose port (default 3000)
EXPOSE 3000

# Start command
CMD ["node", "dist/index.js"]
