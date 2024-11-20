# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app . 
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
