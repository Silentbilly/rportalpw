import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Write all logs to `combined.log` 
    new winston.transports.File({ filename: 'logs/combined.log' }),

    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

    // Write to console
    new winston.transports.Console()
  ]
});

export default logger;