# Use Node.js LTS version
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copying package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

# Expose the port from your .env or default to 3000
EXPOSE 3000

# Run the application
CMD [ "node", "index.js" ]