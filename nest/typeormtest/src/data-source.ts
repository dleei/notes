import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User, IdCard } from './entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'codehub',
  synchronize: true,
  logging: false,
  entities: [User, IdCard],
  migrations: [],
  subscribers: [],
})
