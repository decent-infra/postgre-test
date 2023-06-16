# Use the Node.js Alpine base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 80 (assuming your Node.js application listens on port 80)
EXPOSE 8000

# Start the Node.js application
CMD ["node", "./src/index.js"]
