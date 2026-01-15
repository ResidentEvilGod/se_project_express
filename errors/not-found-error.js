const { NOT_FOUND } = require('../utils/errors');
const AppError = require('./app-error');

class NotFoundError extends AppError {
  constructor(message = 'Requested resource not found') {
    super(message, NOT_FOUND);
  }
}

module.exports = NotFoundError;
