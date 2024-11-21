import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { docsPath, docsConfig } from './swagger/swagger-config';
import { appName, port } from './app.settings';
import { AppLoggerService } from './app-logger/app-logger.service';
import { AppLoggerExceptionFilter } from './app-logger/app-logger.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(AppLoggerService);
  app.useLogger(logger);
  app.useGlobalFilters(new AppLoggerExceptionFilter(httpAdapterHost, logger));
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup(docsPath, app, document, { customSiteTitle: appName });

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  });

  await app.listen(port, () => {
    const appMsg = `Application is running at: http://localhost:${port}`;
    const docsMsg = `You can access the documentation at: http://localhost:${port}/${docsPath}`;

    console.log(appMsg);
    console.log(docsMsg);
  });
}

bootstrap();
