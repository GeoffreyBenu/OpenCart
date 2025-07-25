const app = require('./app');
// Replace with proper logger initialization or use console
const logger = console;

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

const producer = kafka.producer();

// Connect producer when starting
producer.connect().then(() => {
  logger.log('Kafka Producer connected');
}).catch(err => {
  logger.error('Failed to connect Kafka Producer:', err);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  logger.log(`Order Service running on port ${PORT}`);
});