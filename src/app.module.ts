import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuards } from './logical/auth/auth.guard';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuards,
    }
  ],
})
export class AppModule {}
