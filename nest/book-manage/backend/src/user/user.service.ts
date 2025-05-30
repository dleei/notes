import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === registerUserDto.username,
    );

    if (foundUser) {
      // throw new BadRequestException('该用户已经注册');
      return {
        data: null,
        message: '该用户已经注册',
        code: 20001,
      };
    }

    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return {
      data: user,
      message: 'success',
      code: 20000,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );

    if (!foundUser) {
      // throw new BadRequestException('用户不存在');
      return {
        data: null,
        message: '用户不存在',
        code: 20002,
      };
    }

    if (foundUser.password !== loginUserDto.password) {
      // throw new BadRequestException('密码不正确');
      return {
        data: null,
        message: '密码不正确',
        code: 20003,
      };
    }

    return {
      data: foundUser,
      message: 'success',
      code: 20000,
    };
  }
}
