import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';


const jwtModule = JwtModule.register({
    secret:  jwtConstants.secret,               // 加密 key
    signOptions: { expiresIn: '120h' }, // 过期时间 - 这里设置是 5 天
});

/**
 * Global全局定义 程序服务将无处不在
 */
@Global()
@Module({
    imports: [
        PassportModule,
        jwtModule,
        UserModule
    ],
    controllers: [],
    providers: [AuthService, JwtStrategy],
    exports: [jwtModule,AuthService],
})
export class AuthModule { }
