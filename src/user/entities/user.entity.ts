import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; //uuid

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

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
    props: { name: string; email: string; password: string },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }

  validate(input: CreateUserDto) {
    if (input.name.length < 3) {
      throw new BadRequestException('Name must be at least 3 characters long');
    }
    if (!input.name) {
      throw new BadRequestException('Name is required');
    }
    if (typeof input.name !== 'string') {
      throw new BadRequestException('Name must be a string');
    }

    const userEmailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!userEmailRegEx.test(input.email)) {
      throw new BadRequestException('Email input must be a valid email');
    }
    if (!input.email) {
      throw new BadRequestException('Email is required');
    }
    if (typeof input.email !== 'string') {
      throw new BadRequestException('Email must be a string');
    }

    const userPasswordRegEx =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/;

    if (!userPasswordRegEx.test(input.password)) {
      throw new BadRequestException(
        'Password must have at least 8 characters, one uppercase and one number',
      );
    }
    if (!input.password) {
      throw new BadRequestException('Password is required');
    }
    if (typeof input.password !== 'string') {
      throw new BadRequestException('Password must be a string');
    }

    return new User(input);
  }
}
