import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'), // 方式1：从头部获取token
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //方式2: 从头部获取Bearer token
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret, //对称加密密钥(暂用)   PEM 编码的公钥更适合生产环境
        });
    }

    /**
     *  JWT验证 - Step 4: 被守卫调用
     * @returns 
     */
    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username,
            realName: payload.realName,
            role: payload.role,
        };
    }
}
