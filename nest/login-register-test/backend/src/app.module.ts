import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModuleConfig } from '@/modules/typeorm.module';
import { JwtModuleConfig } from '@/modules/jwt.module';

@Module({
  imports: [UserModule, TypeOrmModuleConfig, JwtModuleConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
