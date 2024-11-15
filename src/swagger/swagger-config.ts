import { DocumentBuilder } from '@nestjs/swagger';
import { appDescription, appName } from 'src/app.settings';

export const docsPath = 'doc';

export const docsConfig = new DocumentBuilder()
  .setTitle(appName)
  .setDescription(appDescription)
  .setVersion('0.1')
  .build();
