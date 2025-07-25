FROM node:14
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Connect to MongoDB
ENV MONGO_URI=mongodb+srv://beingawuor205:BXtAQc4BAO2bnL44@cluster.1qccgqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
ENV PORT=3001

EXPOSE 3001
CMD ["node", "src/server.js"]