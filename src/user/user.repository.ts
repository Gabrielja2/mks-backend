import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOne(email: string): Promise<User>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.typeOrmRepository.save(user);
  }

  async findOne(email: string): Promise<User> {
    return await this.typeOrmRepository.findOne({ where: { email } });
  }
}
