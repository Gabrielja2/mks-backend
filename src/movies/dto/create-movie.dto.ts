import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'Nome do filme' })
  name: string;

  @ApiProperty({ description: 'Descrição do filme' })
  description: string;

  @ApiProperty({ description: 'Categoria do filme' })
  category: string;
}
