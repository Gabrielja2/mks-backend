import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { IAuthenticationAdapter, ICryptographyAdapter } from '@/ports';
import { JWT_EXPIRE_IN_SECONDS } from '@/shared';
import { IUserRepository } from '@/user/user.repository';
import { User } from '@/user/entities/user.entity';

export interface IAuthService {
  login(input: LoginUserDto): Promise<{ token: string }>;
  validateCredentials(input: LoginUserDto): void;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IAuthenticationAdapter')
    private readonly authAdapter: IAuthenticationAdapter,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('ICryptographyAdapter')
    private readonly cryptoAdapter: ICryptographyAdapter,
  ) {}

  async login(input: LoginUserDto) {
    const user = await this.validateCredentials(input);

    const token = this.authAdapter.createJsonWebToken(
      {
        sub: user.id,
        email: input.email,
      },
      JWT_EXPIRE_IN_SECONDS,
    );

    return { token };
  }

  async validateCredentials(input: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne(input.email);
    if (!user) {
      throw new BadRequestException('Email or password is invalid');
    }
    if (
      !(await this.cryptoAdapter.compareHash(user.password, input.password))
    ) {
      throw new BadRequestException('Email or password is invalid');
    }

    return user;
  }
}
