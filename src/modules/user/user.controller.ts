import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/logical/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuards } from 'src/logical/auth/auth.guard';
import { Public } from 'src/meta/meta';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Get()
  async index(): Promise<any> {
    return 'Hello World!';

  }
  @Get('find')
  async getByUserName(@Query('username') username: string): Promise<any> {
    return this.userService.findOne(username);
  }

  @Public()
  @Post('/login')
  async login(@Body() loginParams: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParams.username,
      loginParams.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        }; default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @Post('/register')
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }
}
