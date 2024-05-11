import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMovieRepository } from '../movies.repository';

export interface IDeleteMovieUseCase {
  execute(id: string): Promise<string>;
}

@Injectable()
export class DeleteMovieUseCase implements IDeleteMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string) {
    const movie = await this.movieRepository.findOne(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const response = await this.movieRepository.delete(id);
    return response.affected === 1 && 'Movie deleted';
  }
}
