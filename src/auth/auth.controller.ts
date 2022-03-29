import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';

import RequestWithUser from './requestWithUser.interface';

import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login-dto';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterUserDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
