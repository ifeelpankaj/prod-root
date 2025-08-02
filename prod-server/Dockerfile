# Use a specific Node.js version
FROM node:20.17.0

# Set working directory
WORKDIR /app

# Add node_modules/.bin to PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# Copy package files
COPY package*.json ./

# Install dependencies
# Use clean install for reproducible builds
# Use ci instead of install for better performance and reliability
RUN npm install

# Copy application code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:4000/api/v1/system/health || exit 1

# Start the application
CMD [ "npm", "run", "dev" ]