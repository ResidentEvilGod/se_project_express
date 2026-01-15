const { CONFLICT } = require('../utils/errors');
const AppError = require('./app-error');

class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, CONFLICT);
  }
}

module.exports = ConflictError;