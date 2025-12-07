# client/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy everything
COPY . .

# Build Next.js app
RUN npm run build

EXPOSE 3000

# Start Next in production mode
CMD ["npm", "start"]
