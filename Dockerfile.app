# Base
FROM node:22.11.0-alpine3.20 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

# Build code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD ["npm", "run", "start:dev-db"]