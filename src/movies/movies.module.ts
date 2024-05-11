import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { MoviesController } from './movies.controller';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  FindAllMoviesUseCase,
  FindMovieUseCase,
  UpdateMovieUseCase,
} from '@/movies/use-cases';
import { MovieTypeOrmRepository } from './movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [
    CreateMovieUseCase,
    FindAllMoviesUseCase,
    FindMovieUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
    MovieTypeOrmRepository,
    {
      provide: 'IMovieRepository',
      useExisting: MovieTypeOrmRepository,
    },
    {
      provide: 'ICreateMovieUseCase',
      useClass: CreateMovieUseCase,
    },
    {
      provide: 'IFindAllMoviesUseCase',
      useClass: FindAllMoviesUseCase,
    },
    {
      provide: 'IFindMovieUseCase',
      useClass: FindMovieUseCase,
    },
    {
      provide: 'IUpdateMovieUseCase',
      useClass: UpdateMovieUseCase,
    },
    {
      provide: 'IDeleteMovieUseCase',
      useClass: DeleteMovieUseCase,
    },
  ],
})
export class MoviesModule {}
