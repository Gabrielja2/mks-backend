import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Email de login do usuário' })
  email: string;

  @ApiProperty({ description: 'Senha cadastrada do usuário' })
  password: string;
}
