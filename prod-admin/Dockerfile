FROM node:20.17.0

WORKDIR /app

# Accept build argument for VITE_SERVER
ARG VITE_SERVER=https://api.4biddencoder.tech

# Set as environment variable for the build process
ENV VITE_SERVER=$VITE_SERVER

COPY package*.json ./

RUN npm install

COPY . .

# Build the app with the hardcoded VITE_SERVER
RUN npm run build

# Expose port 4174 to match your container port
EXPOSE 4174

# Run preview with correct port and host
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4174"]