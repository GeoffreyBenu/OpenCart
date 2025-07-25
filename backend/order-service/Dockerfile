# Use Node 18 (LTS) which has current Debian repositories
FROM node:18

WORKDIR /usr/src/app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install
RUN npm install kafkajs

# Copy application files
COPY . .

# The newer Node images include netcat, so we don't need to install it
# If you really need it, use this instead:
# RUN apt-get update && apt-get install -y netcat-openbsd

# Copy wait script
COPY wait-for-kafka.js /wait-for-kafka.js

# Environment variables
ENV KAFKA_BROKER=kafka:9092
ENV PORT=3002
EXPOSE 3002

# Run the application
CMD ["node", "wait-for-kafka.js", "kafka:9092", "node src/server.js"]