import connection from '../database/index.js';

class UserService {
  async create({ username, password }) {
    const statement = `INSERT INTO users (username,password) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [username, password]);

    return result;
  }
  
  async findUserByName(username) {
    const statement = `SELECT * FROM users WHERE username = ?;`;
    const [result] = await connection.execute(statement, [username]);
    
    return result;
  }
}

export default new UserService();
