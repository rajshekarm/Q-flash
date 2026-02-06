FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy all project files
COPY . .

# Set to production mode for better performance
# ENV NODE_ENV=production
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]