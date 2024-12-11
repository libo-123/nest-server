import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';
import { excuteSql } from 'src/utils/sql-query';
@Injectable()
export class CardService {
  create(createCardDto: CreateCardDto) {
    console.log("传入的参数", createCardDto);
    // 插入数据表格

    return 'This action adds a new card';
  }

  async findAll() {
    const sql = `SELECT * FROM card`;
    try {
      return await excuteSql(sql, 'SELECT')
    } catch (error) {
      console.error(error)
      return void 0
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
