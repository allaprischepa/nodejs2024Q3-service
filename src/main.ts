import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = env.PORT || 4000;

  // Create a Swagger document
  const docPath = 'docs';

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(docPath, app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`Application is running at: http://localhost:${port}`);
    console.log(
      `You can access the documentation at: http://localhost:${port}/${docPath}`,
    );
  });
}
bootstrap();
