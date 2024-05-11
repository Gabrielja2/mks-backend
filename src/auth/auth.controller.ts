import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginUserDto } from '@/auth/dto';
import { IAuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post()
  login(@Body() loginDto: LoginUserDto): Promise<string> {
    return this.authService.login(loginDto);
  }
}