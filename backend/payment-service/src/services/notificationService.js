const axios = require('axios');
const logger = require('../utils/logger');

class NotificationService {
  static async sendPaymentSuccessNotification(order, payment) {
    try {
      // In a real implementation, this would send an email or push notification
      logger.info(`Payment successful for order ${order.orderNumber}. Transaction ID: ${payment.transactionId}`);
      
      // Example: Call notification service
      await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notifications`, {
        type: 'payment_success',
        userId: order.customerInfo.email, // or customer ID
        data: {
          orderNumber: order.orderNumber,
          amount: payment.amount,
          transactionId: payment.transactionId
        }
      });
    } catch (error) {
      logger.error('Failed to send payment success notification', error);
    }
  }

  static async sendPaymentFailedNotification(order, payment) {
    try {
      logger.info(`Payment failed for order ${order.orderNumber}. Reason: ${payment.failureReason}`);
      
      await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notifications`, {
        type: 'payment_failed',
        userId: order.customerInfo.email,
        data: {
          orderNumber: order.orderNumber,
          amount: payment.amount,
          reason: payment.failureReason
        }
      });
    } catch (error) {
      logger.error('Failed to send payment failed notification', error);
    }
  }

  static async sendRefundNotification(order, payment, amount) {
    try {
      logger.info(`Refund processed for order ${order.orderNumber}. Amount: ${amount}`);
      
      await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notifications`, {
        type: 'refund_processed',
        userId: order.customerInfo.email,
        data: {
          orderNumber: order.orderNumber,
          refundAmount: amount,
          transactionId: payment.transactionId
        }
      });
    } catch (error) {
      logger.error('Failed to send refund notification', error);
    }
  }
}

module.exports = NotificationService;