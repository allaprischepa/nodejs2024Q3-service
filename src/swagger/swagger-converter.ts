import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import { stringify } from 'yaml';
import { docsConfig } from './swagger-config';

async function convert() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, docsConfig);

  await fs.writeFile('doc/api.yaml', stringify(document));

  await app.close();
}
convert();
