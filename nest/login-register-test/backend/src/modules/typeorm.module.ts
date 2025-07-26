import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import dbConfig from '@/config/db';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type as 'mysql',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: dbConfig.synchronize,
      logging: dbConfig.logging,
      entities: [User],
      poolSize: dbConfig.poolSize,
      connectorPackage: dbConfig.connectorPackage as 'mysql2',
      extra: {
        authPlugin: dbConfig.authPlugin,
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmModuleConfig {}
