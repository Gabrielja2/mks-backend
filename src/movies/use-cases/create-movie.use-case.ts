import { Movie } from '../entities/movies.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IMovieRepository } from '../movies.repository';

export interface ICreateMovieUseCase {
  execute(input: CreateMovieDto): Promise<Movie>;
}

@Injectable()
export class CreateMovieUseCase implements ICreateMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  execute(input: CreateMovieDto) {
    const movie = new Movie(input).validate(input);

    return this.movieRepository.create(movie);
  }
}
