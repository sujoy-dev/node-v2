import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    res.on('finish', () => {
      const timeTaken = Date.now() - startTime;
      console.log(`${req.method} ${req.url} ${res.statusCode} ${timeTaken} ms`);
    });
    next();
  }
}
