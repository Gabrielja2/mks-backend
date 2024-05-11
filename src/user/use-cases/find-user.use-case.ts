import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository';

export interface IFindUserUseCase {
  execute(id: string): Promise<User>;
}

@Injectable()
export class FindUserUseCase implements IFindUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
