import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginGuard } from '../login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  login(@Body(ValidationPipe) user: LoginDto) {
    // Logic for user login
    return this.userService.login(user);
  }

  @Post('register')
  register(@Body(ValidationPipe) user: RegisterDto) {
    // Logic for user registration
    return this.userService.register(user);
  }
}
