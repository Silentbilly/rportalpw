import * as winston from 'winston';

export class WinstonLogger implements Logger {
  private winstonLogger: winston.Logger;

  constructor() {
    this.winstonLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.Console()
      ]
    });
  }

  info(message: string): void {
    this.winstonLogger.info(message);
  }

  error(message: string): void {
    this.winstonLogger.error(message);
  }

  debug(message: string): void {
    this.winstonLogger.debug(message);
  }
}