import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private userService: UsersService) {}

  @Get('/')
  home() {
    return 'This is lazy twitter';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { email } = req.user;
    return this.userService.findOneUserByEmail({ emailAddress: email });
  }
}
