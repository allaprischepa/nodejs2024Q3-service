import { LogLevel } from '@nestjs/common';
import 'dotenv/config';
import { env } from 'process';

const allLogLevels: Record<LogLevel, number> = {
  fatal: 0,
  error: 1,
  warn: 2,
  log: 3,
  debug: 4,
  verbose: 5,
};

const currentLevel = +env.LOG_LEVEL || 0;

export const logLevels: LogLevel[] = Object.keys(allLogLevels)
  .filter((level) => allLogLevels[level] <= currentLevel)
  .map((level) => level as LogLevel);
