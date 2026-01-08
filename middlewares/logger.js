const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const logDir = path.join(__dirname, '..', 'logs');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const baseTransports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
];

const errorTransports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: path.join(logDir, 'error.log') }),
];

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: baseTransports,
});

const requestLogger = expressWinston.logger({
  transports: baseTransports,
  format: logFormat,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  headerBlacklist: ['authorization', 'cookie'],
});

const errorLogger = expressWinston.errorLogger({
  transports: errorTransports,
  format: logFormat,
});

module.exports = { logger, requestLogger, errorLogger };
