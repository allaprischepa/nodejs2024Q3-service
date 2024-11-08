import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';
import { docsPath, docsConfig, docsTitle } from './swagger/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT || 4000;

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup(docsPath, app, document, { customSiteTitle: docsTitle });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    const appMsg = `Application is running at: http://localhost:${port}`;
    const docsMsg = `You can access the documentation at: http://localhost:${port}/${docsPath}`;

    console.log(appMsg);
    console.log(docsMsg);
  });
}
bootstrap();
