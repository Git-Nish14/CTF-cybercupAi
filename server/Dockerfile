# server/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

# The server listens on 5000
EXPOSE 5000

CMD ["node", "src/server.js"]
