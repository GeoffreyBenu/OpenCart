const Payment = require('../models/Payment');

// Process new payment
const processPayment = async (req, res, next) => {
  try {
    const { order, amount, paymentMethod, paymentDetails } = req.body;
    
    // Basic validation
    if (!order || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const payment = await Payment.create({
      order,
      amount,
      paymentMethod,
      paymentDetails,
      status: 'completed'
    });

    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment processing failed'
    });
  }
};

// Get payment by ID
const getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get payments by order ID
const getOrderPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ order: req.params.orderId });
    
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Get order payments error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Process refund
const processRefund = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    payment.status = 'refunded';
    await payment.save();

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Refund processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Refund processing failed'
    });
  }
};

module.exports = {
  processPayment,
  getPayment,
  getOrderPayments,
  processRefund
};