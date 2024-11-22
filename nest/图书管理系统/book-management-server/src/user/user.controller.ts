import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description  用户注册
   * @params registerDto 用户注册信息
   * @returns
   */

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.userService.register(registerDto);
  }

  /**
   * @description  用户登录
   * @param loginUserDto 用户登录
   * @returns
   */

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
