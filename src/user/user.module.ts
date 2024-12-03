import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/logical/auth/auth.service';
import { AuthModule } from 'src/logical/auth/auth.module';
// import { AppService } from './app.service';

@Module({
  // imports: [AuthModule],
  // 如果在 user.module.ts 中引入 AuthService 的话，就还要将其他的策略又引 入一次，个人觉得很麻烦，
  // 就干脆直接用 app 来统一管理了。
  // controllers: [UserController],
  providers: [UserService],
  // 提供者：提供服务，全局依赖啊注入使用
  exports: [UserService],
})
export class UserModule { }
