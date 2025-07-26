import * as crypto from 'crypto';

/**
 * @description: md5加密
 * @param {string} str
 */

const md5 = (str: string): string => {
  // return crypto.createHash('md5').update(str).digest('hex');
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};

export default md5;
