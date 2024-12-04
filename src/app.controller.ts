import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './meta/meta';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.hello();
  }
}
