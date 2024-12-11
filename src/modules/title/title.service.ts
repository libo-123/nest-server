import { Injectable } from '@nestjs/common';
import { UpdateTitleDto } from './dto/update-title.dto';
import { HelpDto } from './dto/help.dto';
import { excuteSql } from 'src/utils/sql-query';

@Injectable()
export class TitleService {

  async findOne() {
    const sql = `SELECT * FROM articles`;
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

  /** 只存在一条数据，更新第一条即可 */
  async update(updateTitleDto: UpdateTitleDto) {
    const sql = `
    UPDATE articles SET 
    title='${updateTitleDto.title || ''}', 
    description='${updateTitleDto.description || ''}'
    WHERE id=1`;
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

  async findHelp() {
    const sql = `SELECT * FROM help`;
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

  async help(helpDto: HelpDto) {
    const sql = `
    INSERT INTO help (username, description, phone, email)
    VALUES ('${helpDto.username}', '${helpDto.description}', '${helpDto.phone}', '${helpDto.email}');`
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
}
