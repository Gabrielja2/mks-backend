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
    const cachedData = await this.cacheManager.get('movies');

    if (cachedData) {
      return JSON.parse(cachedData as string);
    }

    const movies = await this.movieRepository.findAll();
    await this.cacheManager.set('movies', JSON.stringify(movies), 6 * 1000);

    if (movies.length === 0) throw new NotFoundException('Movies not found');

    return movies;
  }
}
