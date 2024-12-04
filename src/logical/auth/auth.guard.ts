import {
    Injectable,
    ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/meta/meta';


/** 全局登录守卫 */
@Injectable()
export class AuthGuards extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector
    ) {
        super();
    }
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }

}
