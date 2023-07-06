import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as winston from 'winston';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'my-app' },
      transports: [
        new winston.transports.File({ filename: 'logs/access.log' }),
      ],
    });
  }

  use(req: Request, res: Response, next: Function) {
    const date = new Date().toISOString();

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referer = req.headers['referer'] || '';
    const method = req.method;
    const url = req.originalUrl;
    const headers = JSON.stringify(req.headers);

    this.logger.info(`[${date}] [${ipAddress}] ${method} ${url} - ${userAgent} - ${referer} - ${headers}`);

    next();
  }

  public getMiddleware(): (req, res, next) => void {
    return this.use.bind(this);
  }
}