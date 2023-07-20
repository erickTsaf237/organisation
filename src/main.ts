import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {HttpLoggerMiddleware} from "./logger/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({

    origin: ['http://localhost:3000', 'http://192.168.43.19:3000', 'https://organisations.adaptable.app'],
  });
  app.use(new HttpLoggerMiddleware().getMiddleware());
  await app.listen( 3000 || process.env.PORT );

}
bootstrap();

