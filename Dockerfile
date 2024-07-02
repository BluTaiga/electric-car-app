# Use Node.js as the base image
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Print out the contents of the /app directory
RUN echo "Contents of /app:" && ls -la /app
RUN echo "Contents of /app/build:" && ls -la /app/build || echo "build directory does not exist"

# Start a new stage for a smaller final image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules

# Print out the contents of the /app directory in the final stage
RUN echo "Final stage - Contents of /app:" && ls -la /app
RUN echo "Final stage - Contents of /app/build:" && ls -la /app/build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "build"]