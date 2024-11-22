import { ConsoleLogger, Injectable } from '@nestjs/common';
import { logLevels } from './app-logger.levels';
import * as path from 'path';
import * as fs from 'fs';
import 'dotenv/config';
import { env } from 'process';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  private logsPath = path.resolve('.', 'logs', 'app.log');
  private errorLogsPath = path.resolve('.', 'logs', 'error.log');
  private maxFileSize = +env.LOG_FILE_MAX_SIZE || 10 * 1024 * 1024; // 10MiB by default

  constructor() {
    super();

    this.setLogLevels(logLevels);
  }

  private writeLogs(message: unknown, context?: unknown, type = 'log') {
    const date = new Date().toISOString();
    const msg = `${date}  ${type.toUpperCase()} [${context}] ${message}`;

    this.writeLogsToFile(this.logsPath, msg);
    if (type === 'error') this.writeLogsToFile(this.errorLogsPath, msg);
  }

  private writeLogsToFile(filePath: string, msg: string) {
    const fileExist = this.fileExists(filePath);

    if (!fileExist) this.writeFile(filePath, '');
    const stat = fs.statSync(filePath);

    if (stat.size + this.stringSize(`${msg}\n`) > this.maxFileSize) {
      this.rotateFile(filePath);
    }

    fs.appendFileSync(filePath, `${msg}\n`, 'utf8');
  }

  private stringSize(str: string) {
    return new Blob([str]).size;
  }

  private fileExists(filePath: string) {
    try {
      fs.accessSync(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private writeFile(filePath: string, content: string) {
    const dirPath = path.dirname(filePath);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, content);
  }

  private rotateFile(filePath: string) {
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
    const backupFilePath = filePath.replace('.log', `_${timestamp}.log`);

    fs.renameSync(filePath, backupFilePath);
    fs.writeFileSync(filePath, '');
  }

  log(message: unknown, context?: unknown, ...rest: unknown[]) {
    super.log(message, context, ...rest);
    this.writeLogs(message, context, 'log');
  }

  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ) {
    const stackMsg = JSON.stringify({ stack });

    super.error(message, stack, context, ...rest);
    this.writeLogs(`${message} ${stackMsg}`, context, 'error');
  }

  warn(message: unknown, context?: unknown, ...rest: unknown[]) {
    super.warn(message, context, ...rest);
    this.writeLogs(message, context, 'warn');
  }

  debug(message: unknown, context?: unknown, ...rest: unknown[]) {
    super.debug(message, context, ...rest);
    this.writeLogs(message, context, 'debug');
  }

  verbose(message: unknown, context?: unknown, ...rest: unknown[]) {
    super.verbose(message, context, ...rest);
    this.writeLogs(message, context, 'verbose');
  }

  fatal(message: unknown, context?: unknown, ...rest: unknown[]) {
    super.fatal(message, context, ...rest);
    this.writeLogs(message, context, 'fatal');
  }
}
