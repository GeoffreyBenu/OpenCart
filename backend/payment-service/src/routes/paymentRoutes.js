const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const validate = require('../middlewares/validation');

// Process new payment
router.post(
  '/',
  validate.payment,
  validate.validate,
  paymentController.processPayment
);

// Get payment details
router.get('/:id', paymentController.getPayment);

// Get all payments for an order
router.get('/order/:orderId', paymentController.getOrderPayments);

// Process refund
router.post(
  '/:id/refund',
  validate.refund,
  validate.validate,
  paymentController.processRefund
);

module.exports = router;