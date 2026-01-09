require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const mainRouter = require('./routes');
const { PORT, DB_ADDRESS } = require('./utils/config');
const { logger, requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./middlewares/error-handler');

const app = express();

mongoose
  .connect(DB_ADDRESS)
  .catch((err) => {
    logger.error('MongoDB connection error', { error: err.message, stack: err.stack });
  });

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', mainRouter);

app.use((req, res, next) => next(new NotFoundError('Requested resource not found')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
