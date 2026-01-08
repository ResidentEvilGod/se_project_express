
const AppError = require('./app-error');

class BadRequestError extends AppError {
  constructor(message = 'Invalid data passed') {
    super(message, 400);
  }
}
module.exports = BadRequestError;
