import { DocumentBuilder } from '@nestjs/swagger';

export const docsPath = 'api';

export const docsTitle = 'Home Library Service';

export const docsConfig = new DocumentBuilder()
  .setTitle(docsTitle)
  .setDescription('Home music library service')
  .setVersion('0.1')
  .build();
