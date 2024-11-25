import { DocumentBuilder } from '@nestjs/swagger';
import { appDescription, appName } from 'src/app.settings';

export const docsPath = 'doc';

export const AUTH_NAME = 'bearerAuth';

export const docsConfig = new DocumentBuilder()
  .setTitle(appName)
  .setDescription(appDescription)
  .setVersion('0.1')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    AUTH_NAME,
  )
  .build();
