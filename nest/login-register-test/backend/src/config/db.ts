const dataBase = {
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'login_test',
  type: 'mysql',
  port: 3306,
  poolSize: 10,
  synchronize: true,
  logging: true,
  authPlugin: 'sha256_password',
  connectorPackage: 'mysql2',
};

export default dataBase;
