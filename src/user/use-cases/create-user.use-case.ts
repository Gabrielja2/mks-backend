import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository';
import { ICryptographyAdapter } from '@/ports';

export interface ICreateUserUseCase {
  execute(input: CreateUserDto): Promise<User>;
}

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICryptographyAdapter')
    private readonly cryptoAdapter: ICryptographyAdapter,
  ) {}

  async execute(input: CreateUserDto) {
    const emailAlreadyExists = await this.userRepository.findOne(input.email);

    if (emailAlreadyExists) throw new ConflictException('Email already exists');

    const user = new User(input).validate(input);
    user.password = await this.cryptoAdapter.hash(input.password);

    return this.userRepository.create(user);
  }
}
