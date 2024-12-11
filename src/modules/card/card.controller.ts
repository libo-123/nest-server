import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FindCardDto } from './dto/find-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post('/create')
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

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
}
