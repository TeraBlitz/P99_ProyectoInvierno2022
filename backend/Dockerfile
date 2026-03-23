FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port (as configured in fly.toml)
EXPOSE 8080

# Run the app
CMD ["node", "index.js"]
