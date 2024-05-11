import { PartialType } from '@nestjs/mapped-types';

class _UpdateMovieDto {
  name: string;

  description: string;

  category: string;
}
export class UpdateMovieDto extends PartialType(_UpdateMovieDto) {}
