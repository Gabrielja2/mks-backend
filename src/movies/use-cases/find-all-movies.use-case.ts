import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMovieRepository } from '../movies.repository';
import { Movie } from '../entities/movies.entity';

export interface IFindAllMoviesUseCase {
  execute(): Promise<Movie[]>;
}

@Injectable()
export class FindAllMoviesUseCase implements IFindAllMoviesUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute() {
    const movies = await this.movieRepository.findAll();
    if (movies.length === 0) {
      throw new NotFoundException('Movies not found');
    }
    return movies;
  }
}
