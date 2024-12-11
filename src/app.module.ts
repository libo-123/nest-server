import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { APP_GUARD,APP_PIPE } from '@nestjs/core';
import { AuthGuards } from './logical/auth/auth.guard';
import { CardModule } from './modules/card/card.module';
import { TitleModule } from './modules/title/title.module';
import { ValidationPipe } from './pipe/validation/validation.pipe';

@Module({
  imports: [UserModule, AuthModule, CardModule, TitleModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuards, // 注册守卫
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // 注册管道 实现入参验证
    },
  ],
})
export class AppModule {}
