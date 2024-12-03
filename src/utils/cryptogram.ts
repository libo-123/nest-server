import * as crypto from 'crypto';


/**
 * make salt
 * @returns 
 */
export const makeSalt = () => {
    return crypto.randomBytes(3).toString('base64');
};

/**
 * 加密 密码
 * @param password  密码
 * @param salt 密码盐
 * @returns 
 */

export const encryptPassword = (password: string, salt: string) => {
    if (!password || !salt) return '';

    const tempSalt = Buffer.from(salt, 'base64');
    // 10000 代表迭代次数 16代表长度
    return crypto.pbkdf2Sync(password, tempSalt, 10000, 16, `sha1`).toString('base64');
}
