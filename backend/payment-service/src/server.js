const app = require('./app');
// Replace with proper logger initialization or use console
const logger = console;

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'payment-group' });

// Connect consumer when starting
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-created', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      logger.log(`Processing payment for order: ${order.id}`);
      // Add your payment processing logic here
    },
  });
};

runConsumer().catch(err => {
  logger.error('Failed to start Kafka consumer:', err);
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  logger.log(`Payment Service running on port ${PORT}`);
});