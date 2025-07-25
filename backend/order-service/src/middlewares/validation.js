const { validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors');

exports.createOrder = [
  // Validate request body fields
  // Add your validation rules here
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }
    next();
  }
];

exports.updateOrderStatus = [
  // Validate status update fields
  // Add your validation rules here
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }
    next();
  }
];