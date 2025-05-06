import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'codehub',
      synchronize: true,
      entities: [User],
      poolSize: 10,
      logging: true,
      connectorPackage: 'mysql2',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
