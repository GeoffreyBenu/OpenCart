const logger = require('../utils/logger');
const { 
  CustomError,
  NotFoundError,
  BadRequestError,
  ValidationError,
  InternalServerError 
} = require('../utils/errors');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Handle Mongoose validation errors
  if (err.code === 11000) { // MongoDB duplicate key error
    const field = Object.keys(err.keyPattern)[0];
    const error = new BadRequestError(`${field} must be unique`);
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }

  // Default to 500 server error
  const error = new InternalServerError();
  res.status(error.statusCode).json({
    success: false,
    error: error.message
  });
};