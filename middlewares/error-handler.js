const { isCelebrateError } = require('celebrate');
const { BadRequestError, ConflictError, NotFoundError } = require('../errors');

const DUPLICATE_KEY_ERROR_CODE = 11000;

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  let error = err;

  if (isCelebrateError(err)) {
    const firstKey = [...err.details.keys()][0];
    const joiErr = err.details.get(firstKey);
    const message =
      joiErr?.details?.map((d) => d.message).join(', ') || 'Validation failed';
    error = new BadRequestError(message);
  }

  if (err.code === DUPLICATE_KEY_ERROR_CODE) {
    error = new ConflictError('A user with this email already exists');
  }
  if (err.name === 'ValidationError') error = new BadRequestError(err.message);
  if (err.name === 'CastError') error = new BadRequestError('Invalid id');
  if (err.name === 'DocumentNotFoundError') {
    error = new NotFoundError('Requested resource not found');
  }

  const { statusCode = 500, message } = error;

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'An error has occurred on the server' : message,
  });
};
