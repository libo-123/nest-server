import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TitleService } from './title.service';
import { UpdateTitleDto } from './dto/update-title.dto';
import { HelpDto } from './dto/help.dto';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) { }

  @Get('/find')
  async find() {
    return this.titleService.findOne();
  }
  @Patch('/update')
  async update(@Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update(updateTitleDto);
  }

  /**
   *  调查问卷入口
   * @param helpDto 
   * @returns 
   */
  @Post('/addHelp')
  async helper(@Body() helpDto: HelpDto) {
    return this.titleService.help(helpDto);
  }

  @Get('/findHelp')
  async findHelp() {
    return this.titleService.findHelp();
  }
}
