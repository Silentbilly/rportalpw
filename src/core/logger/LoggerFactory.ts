import { WinstonLogger } from "./WinstonLogger";

let logger: Logger;

export class LoggerFactory {
  static getLogger(): Logger {
    if (!logger) {
      logger = new WinstonLogger();
    }
    return logger;
  }
}