import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, Res } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FindCardDto } from './dto/find-card.dto';
import { Public } from 'src/meta/meta';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post('/create')
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Public()
  @Get('/findList')
  async findAll(@Query() query: FindCardDto) {
    return this.cardService.findAll(query);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }

  @Public()
  @Get('/getContentAI')
  async getContentAI(@Query('content') content: string, @Res() response) {
    const result = await this.cardService.getContentAI(content);

    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Connection', 'keep-alive');
    response.setHeader('Cache-Control', 'no-cache');


    const characters = result.toString();
    let index = 0;

    const interval = setInterval(() => {
      if (index < characters.length) {
        const chunkSize = Math.floor(Math.random() * 10) + 1; // 生成1-10之间的随机数
        const chunk = characters.slice(index, index + chunkSize);
        response.write(`data:${chunk}\n\n`);
        index += chunkSize;
      } else {
        clearInterval(interval);
        response.write('data: DONE');
        response.end();
      }
    }, 50); // 缩短发送间隔到20ms

    // 监听客户端断开连接
    response.on('close', () => {
      clearInterval(interval);
    });
  }
}
