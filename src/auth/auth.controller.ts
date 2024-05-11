import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginUserDto } from '@/auth/dto';
import { IAuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  login(@Body() loginDto: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
