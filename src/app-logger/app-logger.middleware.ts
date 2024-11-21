import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLoggerService } from './app-logger.service';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {
    logger.setContext('HttpRequest');
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl: url, method, query, body } = request;

    response.on('close', () => {
      const { statusCode, statusMessage } = response;

      const message = {
        method,
        url,
        query,
        requestBody: body,
        status: `${statusCode} ${statusMessage}`,
      };

      this.logger.log(JSON.stringify(message));
    });

    next();
  }
}
