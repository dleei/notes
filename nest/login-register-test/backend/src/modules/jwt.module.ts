import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'lei',
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  exports: [JwtModule],
})
export class JwtModuleConfig {}
