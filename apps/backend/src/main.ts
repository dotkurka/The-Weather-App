import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import envConfig from 'src/config/env.config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, allowedOrigins } = envConfig();

  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });

  if (allowedOrigins.length > 0) {
    app.enableCors({ origin: allowedOrigins, credentials: true });
  }

  await app.listen(port);
}
bootstrap();
