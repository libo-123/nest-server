import { Injectable } from '@nestjs/common';

import * as Sequelize from 'sequelize';
import sequelize from '../database/sequelize'; // 引入 Sequelize 实例
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户名
   * @param username 用户名
   * @returns 
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
      `;
    try {
      const user = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
      });

      return user[0]
    } catch (error) {
      console.error(error)
      return void 0
    }
  }

  /**
   * 注册用户
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 200,
        data: null,
        msg: '两次密码输入不一致'
      }
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const registerSQL = `
            INSERT INTO admin_user
              (account_name, real_name, passwd, passwd_salt, mobile, user_status,role, create_by)
            VALUES
              ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}',1, 3, 0)
            `;
    try {
      await sequelize.query(registerSQL, { logging: false });
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
