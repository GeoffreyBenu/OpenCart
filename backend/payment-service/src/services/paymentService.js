const Payment = require('../models/Payment');
const OrderService = require('./orderService');
const { processPayment } = require('../config/paymentGateways');
const NotificationService = require('./notificationService');
const { BadRequestError, NotFoundError } = require('../utils/errors');

class PaymentService {
  static async createPayment(paymentData) {
    const { order: orderId, paymentMethod, amount } = paymentData;
    
    // Validate order
    const order = await OrderService.getOrderById(orderId);
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    
    if (order.paymentStatus === 'paid') {
      throw new BadRequestError('Order already paid');
    }
    
    if (Math.abs(amount - order.total) > 0.01) {
      throw new BadRequestError('Payment amount does not match order total');
    }
    
    // Create payment record
    const payment = new Payment({
      order: orderId,
      paymentMethod,
      amount: order.total,
      currency: 'USD',
      status: 'pending',
      paymentDetails: paymentData.paymentDetails
    });
    
    await payment.save();
    
    // Process payment (simulated)
    try {
      const paymentResult = await processPayment({
        paymentMethod,
        amount: order.total,
        currency: 'USD',
        paymentDetails: paymentData.paymentDetails,
        orderId: order.orderNumber
      });
      
      // Update payment status
      payment.status = paymentResult.success ? 'completed' : 'failed';
      payment.transactionId = paymentResult.transactionId;
      payment.failureReason = paymentResult.failureReason;
      await payment.save();
      
      // Update order payment status
      await OrderService.updateOrderPaymentStatus(
        orderId, 
        paymentResult.success ? 'paid' : 'failed'
      );
      
      // Send notification
      if (paymentResult.success) {
        await NotificationService.sendPaymentSuccessNotification(order, payment);
      } else {
        await NotificationService.sendPaymentFailedNotification(order, payment);
      }
      
      return payment.populate('order');
    } catch (error) {
      payment.status = 'failed';
      payment.failureReason = error.message;
      await payment.save();
      
      await OrderService.updateOrderPaymentStatus(orderId, 'failed');
      await NotificationService.sendPaymentFailedNotification(order, payment);
      
      throw error;
    }
  }

  static async getPaymentById(id) {
    const payment = await Payment.findById(id).populate('order');
    
    if (!payment) {
      throw new NotFoundError('Payment not found');
    }
    
    return payment;
  }

  static async getPaymentsByOrder(orderId) {
    return await Payment.find({ order: orderId })
      .populate('order')
      .sort({ createdAt: -1 });
  }

  static async refundPayment(paymentId, amount) {
    const payment = await Payment.findById(paymentId).populate('order');
    
    if (!payment) {
      throw new NotFoundError('Payment not found');
    }
    
    if (payment.status !== 'completed') {
      throw new BadRequestError('Only completed payments can be refunded');
    }
    
    if (amount > payment.amount) {
      throw new BadRequestError('Refund amount cannot exceed original payment');
    }
    
    // Process refund (simulated)
    try {
      const refundResult = await processRefund({
        originalTransactionId: payment.transactionId,
        amount,
        currency: payment.currency
      });
      
      // Update payment status
      payment.status = amount === payment.amount ? 'refunded' : 'partially_refunded';
      await payment.save();
      
      // Update order status if full refund
      if (amount === payment.amount) {
        await OrderService.updateOrderStatus(payment.order._id, 'refunded');
      }
      
      // Send notification
      await NotificationService.sendRefundNotification(payment.order, payment, amount);
      
      return payment;
    } catch (error) {
      throw new Error(`Refund failed: ${error.message}`);
    }
  }
}

module.exports = PaymentService;