const { body, param, validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors');

exports.payment = [
  body('order').isMongoId().withMessage('Invalid order ID'),
  body('amount').isInt({ min: 0 }).withMessage('Amount must be a positive number'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer'])
    .withMessage('Invalid payment method')
];

exports.refund = [
  param('id').isMongoId().withMessage('Invalid payment ID'),
  body('amount').optional().isInt({ min: 0 }).withMessage('Amount must be positive')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};
