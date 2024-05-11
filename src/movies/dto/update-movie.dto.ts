import { PartialType } from '@nestjs/swagger';

class _UpdateMovieDto {
  name: string;

  description: string;

  category: string;
}
export class UpdateMovieDto extends PartialType(_UpdateMovieDto) {}
