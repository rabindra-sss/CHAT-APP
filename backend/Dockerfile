# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./


# This will install all the prerequisites needed for Bcrypt, then install node_modules and then compile Bcrypt. 
# Afterwards it will remove the prerequisites to keep the docker image small as possible.
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
CMD ["npm", "run", "start:prod"]