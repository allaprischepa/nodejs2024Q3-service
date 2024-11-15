import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { docsPath, docsConfig } from './swagger/swagger-config';
import { appName, port } from './app.settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup(docsPath, app, document, { customSiteTitle: appName });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    const appMsg = `Application is running at: http://localhost:${port}`;
    const docsMsg = `You can access the documentation at: http://localhost:${port}/${docsPath}`;

    console.log(appMsg);
    console.log(docsMsg);
  });
}
bootstrap();
