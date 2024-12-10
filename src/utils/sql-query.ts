import * as Sequelize from "sequelize";
import sequelize from "src/database/sequelize";


/**
 * 如果是通用的，用这个就行
 * @param sql sql语句
 * @param queryType  执行类型，默认值为Sequelize.QueryTypes.SELECT
 * @returns 
 */
export const excuteSql = async (sql: string, queryType?: keyof typeof Sequelize.QueryTypes) => {
    const data = await sequelize.query(sql, {
        type: queryType || Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
    });
    return data;
}