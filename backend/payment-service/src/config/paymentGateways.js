const logger = require('../utils/logger');

// Simulated payment processing
async function processPayment(paymentData) {
  logger.info(`Processing payment for order ${paymentData.orderId}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Payment processor unavailable');
  }
  
  // Simulate card declines (20% chance for cards)
  if (paymentData.paymentMethod.includes('card') && Math.random() < 0.2) {
    return {
      success: false,
      failureReason: 'Card declined'
    };
  }
  
  // Successful payment
  const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    success: true,
    transactionId
  };
}

async function processRefund(refundData) {
  logger.info(`Processing refund for transaction ${refundData.originalTransactionId}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random failures (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Refund processor unavailable');
  }
  
  return { success: true };
}

module.exports = {
  processPayment,
  processRefund
};