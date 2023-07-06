import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {HttpLoggerMiddleware} from "./logger/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(new HttpLoggerMiddleware().getMiddleware());
  await app.listen(process.env.PORT || 3000 );
}
bootstrap();

