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

  async getContentAI(content: string) {
    const msg = `《水浒传》是中国四大名著之一，作者施耐庵，后由罗贯中修订。这部小说讲述
    了108位好汉在宋代末年反抗腐败官府、追求正义的故事。书中的主要人物有宋江、
    卢俊义、吴用、林冲等，他们各具特色，有的智勇双全，有的忠义勇敢，聚集在水泊梁山，组成了一个反抗势力。
    故事分为几个部分，开头描写了好汉们的背景和遭遇，随后是他们如何聚集在一起，形
    成梁山泊的强大团队。随着故事的发展，梁山好汉们与官府的冲突不断升级，最终以悲剧收
    尾，反映了对社会不公的控诉和对忠义精神的赞美。
    《水浒传》不仅是中国古代小说的经典之作，也影响了后世的文学、戏剧和影视作品，展
    现了深刻的社会问题和人性的复杂。你对这部作品有什么特别的兴趣或问题吗？`;
    const msg2 = '《水浒传》是';
    return msg2
  }
}
