import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMovieRepository } from '../movies.repository';
import { Movie } from '../entities/movies.entity';

export interface IFindMovieUseCase {
  execute(id: string): Promise<Movie>;
}

@Injectable()
export class FindMovieUseCase implements IFindMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string) {
    const movie = await this.movieRepository.findOne(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
