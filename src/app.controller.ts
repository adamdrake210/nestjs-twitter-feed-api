import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login-dto';
import { RegisterUserDto } from './auth/dto/register-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get('/')
  home() {
    return 'This is lazy twitter';
  }

  @Post('register')
  async register(@Body() registrationData: RegisterUserDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { email } = req.user;
    return this.userService.findOneEmail({ emailAddress: email });
  }
}
