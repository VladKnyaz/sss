import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async Login(@Body() body: AuthLoginDto) {}
}
