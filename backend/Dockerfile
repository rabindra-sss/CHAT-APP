# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and rebuild Bcrypt from source if needed
RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apt-get remove --purge -y build-essential python3 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3030

# Command to run the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
