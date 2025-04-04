import connection from '../database/index.js';

class RegisterService {
  async create({ username, password }) {
    const statement = `INSERT INTO users (username,password) VALUES (?,?);`;

    try {
      // 执行 SQL 语句
      const [result] = await connection.execute(statement, [username, password]);
      return result;
    } catch (error) {
      // 捕获并处理异常
      console.error('Error executing SQL statement:', error);
      throw error;
    }
  }
}

export default new RegisterService();
