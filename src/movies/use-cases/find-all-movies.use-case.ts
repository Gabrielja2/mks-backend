import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMovieRepository } from '../movies.repository';
import { Movie } from '../entities/movies.entity';
import { Cache } from 'cache-manager';

export interface IFindAllMoviesUseCase {
  execute(): Promise<Movie[]>;
}

@Injectable()
export class FindAllMoviesUseCase implements IFindAllMoviesUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,

    @Inject('CACHE_MANAGER')
    private readonly cacheManager: Cache,
  ) {}

  async execute() {
    const movies = await this.movieRepository.findAll();
    await this.cacheManager.set('movies', movies);
    if (movies.length === 0) {
      throw new NotFoundException('Movies not found');
    }
    return movies;
  }
}
