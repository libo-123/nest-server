import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 *  @public decorator to mark a controller method as public token 验证白名单
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);