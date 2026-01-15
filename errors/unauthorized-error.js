const { UNAUTHORIZED } = require('../utils/errors');
const AppError = require('./app-error');

class UnauthorizedError extends AppError {
  constructor(message = 'Authorization required') {
    super(message, UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
