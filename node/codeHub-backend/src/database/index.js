import mysql2 from 'mysql2';
import chalk from 'chalk';
import {
  CONNECTION_LIMIT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from '../config/index.js';

const connectionPool = mysql2.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: DATABASE_PORT,
  waitForConnections: true,
  connectionLimit: CONNECTION_LIMIT,
});

// 测试连接
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log(chalk.red('数据库连接失败:', err.message));
    return;
  }
  console.log(chalk.green('数据库连接成功🎉'));
  connection.release();
});

const connection = connectionPool.promise();

export default connection;
