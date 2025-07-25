class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource not found') {
    super(message);
    this.statusCode = 404;
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request', details = {}) {
    super(message);
    this.statusCode = 400;
    this.details = details;
  }
}

class ValidationError extends BadRequestError {
  constructor(errors = {}) {
    super('Validation failed', errors);
    this.name = 'ValidationError';
  }
}

class InternalServerError extends CustomError {
  constructor(message = 'Internal server error') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  CustomError,
  NotFoundError,
  BadRequestError,
  ValidationError,
  InternalServerError
};