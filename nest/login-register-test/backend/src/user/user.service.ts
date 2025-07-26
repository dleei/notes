import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  HttpException,
  Injectable,
  Logger,
  Body,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import md5 from '@/utils/md5';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  private logger = new Logger();

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (foundUser) {
      throw new HttpException('user already exists', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    const token = this.jwtService.signAsync({
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });

    try {
      await this.userRepository.save(newUser);
      return {
        status: 'success',
        token: await token,
        data: {
          id: newUser.id,
          username: newUser.username,
        },
      };
    } catch (e) {
      this.logger.error(e, UserService);
      return 'register failed';
    }
  }

  async login(@Body() user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('user not found', 200);
    }

    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('password error', 200);
    }

    this.logger.log(
      `User ${user.username} logged in successfully`,
      UserService,
    );

    return {
      status: 'success',
      data: {
        id: foundUser.id,
        username: foundUser.username,
      },
    };
  }
}
