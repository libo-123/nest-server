import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    /**
     * JWT验证 - Step 2: 校验登录用户信息
     */
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user) {
            const hashedPassword = user.password;
            const salt = user.salt;
            // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
            const hashPassword = encryptPassword(password, salt);
            if (hashedPassword === hashPassword) {
                console.log("登录成功");
                return {
                    code: 1,
                    user,
                }
            } else {
                return {
                    code: 2,
                    user: null,
                    msg: '密码错误',
                }
            }
        }
        return {
            code: 3,
            user: null,
            msg: '用户不存在',
        };
    }

    /**
     * JWT验证 - Step 3: 生成 jwt 签证
     */
    async certificate(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId,
            realName: user.realName,
            role: user.role,
        };
        try {
            const token = this.jwtService.sign(payload);
            return {
                code: 200,
                data: {
                    token,
                },
                msg: `登录成功`,
            };
        } catch (error) {
            return {
                code: 600,
                msg: `账号或密码错误`,
            };
        }
    }


    /**
     * 校验token是否过期
     * @param token 
     * @returns 
     */
    async verifyToken(token: string) {
        if (!token) return '';
        return this.jwtService.verify(token);
    }

}
