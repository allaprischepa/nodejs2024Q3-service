import { ConsoleLogger, Injectable } from '@nestjs/common';
import { logLevels } from './app-logger.levels';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  constructor() {
    super();

    this.setLogLevels(logLevels);
  }
}
