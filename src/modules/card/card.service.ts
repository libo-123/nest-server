import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FindCardDto } from './dto/find-card.dto'
import { excuteSql } from 'src/utils/sql-query';
@Injectable()
export class CardService {
  async create(createCardDto: CreateCardDto) {
    const sql = `INSERT INTO card (name, title, description, link) 
    VALUES ('${createCardDto.name}', 
    '${createCardDto.title}', 
    '${createCardDto.description}', 
    '${createCardDto.link}')`;

    // 插入数据表格
    try {
      await excuteSql(sql, 'INSERT')
      return {
        code: 200,
        data: null,
        msg: 'SUCCESS'
      }
    } catch (error) {
      console.error(error)
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async findAll(cardQuery: FindCardDto) {
    const { title, description } = cardQuery
    const sql = `SELECT * FROM card WHERE title LIKE '%${title || ''}%' AND description LIKE '%${description || ''}%'`;
    try {
      const result = await excuteSql(sql, 'SELECT')
      return {
        code: 200,
        data: result,
        msg: 'SUCCESS'
      }
    } catch (error) {
      console.error(error)
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const sql = `
    UPDATE card 
    SET 
    name='${updateCardDto.name || ''}', 
    title='${updateCardDto.title}', 
    description='${updateCardDto.description}', 
    link='${updateCardDto.link}'
    WHERE id = ${id}`;
    try {
      await excuteSql(sql, 'UPDATE')
      return {
        code: 200,
        data: null,
        msg: 'SUCCESS'
      }
    } catch (error) {
      console.error(error)
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async remove(id: number) {
    const sql = `DELETE FROM card WHERE id=${id}`;
    try {
      await excuteSql(sql, 'DELETE')
      return {
        code: 200,
        data: null,
        msg: 'SUCCESS'
      }
    } catch (error) {
      console.error(error)
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
