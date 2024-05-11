import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Movie } from './entities/movies.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export interface IMovieRepository {
  create(movie: Movie): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  findOne(id: string): Promise<Movie>;
  update(id: string, movie: Movie): Promise<UpdateResult>;
  delete(id: string): Promise<DeleteResult>;
}

@Injectable()
export class MovieTypeOrmRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private typeOrmRepository: Repository<Movie>,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    return await this.typeOrmRepository.save(movie);
  }
  async findAll(): Promise<Movie[]> {
    return await this.typeOrmRepository.find();
  }
  async findOne(id: string): Promise<Movie> {
    return await this.typeOrmRepository.findOne({ where: { id } });
  }
  async update(id: string, movie: Movie): Promise<UpdateResult> {
    return await this.typeOrmRepository.update(id, movie);
  }
  async delete(id: string): Promise<DeleteResult> {
    return await this.typeOrmRepository.delete(id);
  }
}
