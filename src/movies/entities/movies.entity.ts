import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: string; //uuid

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  updatedAt: Date;

  constructor(
    props: { name: string; description: string; category: string },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }

  validate(input: CreateMovieDto) {
    if (!input.name) {
      throw new BadRequestException('Name is required');
    }
    if (typeof input.name !== 'string') {
      throw new BadRequestException('Name must be a string');
    }

    if (!input.description) {
      throw new BadRequestException('Description is required');
    }
    if (typeof input.description !== 'string') {
      throw new BadRequestException('Description must be a string');
    }

    if (!input.category) {
      throw new BadRequestException('Category is required');
    }
    if (typeof input.category !== 'string') {
      throw new BadRequestException('Category must be a string');
    }

    return new Movie(input);
  }
}
