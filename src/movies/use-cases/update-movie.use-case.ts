import { Movie } from '../entities/movies.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { IMovieRepository } from '../movies.repository';

export interface IUpdateMovieUseCase {
  execute(id: string, updateMovieDto: UpdateMovieDto): Promise<string>;
}

@Injectable()
export class UpdateMovieUseCase implements IUpdateMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string, input: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    input.name && (movie.name = input.name);
    input.description && (movie.description = input.description);
    input.category && (movie.category = input.category);
    movie.updatedAt = new Date();

    new Movie(movie).validate(movie);

    const response = await this.movieRepository.update(id, movie);

    return response.affected === 1 && 'Movie updated';
  }
}
