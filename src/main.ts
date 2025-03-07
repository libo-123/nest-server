import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';
import { ValidationPipe } from 'src/pipe/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsingapplication/x-www-form-urlencoded
  app.use(logger); // 监听所有的请求路由，并打印日志

  // 注册的每个路由设置前缀
  // app.setGlobalPrefix('nest-zero-to-one');

  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());

  // 主动允许跨域
  app.enableCors();
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
