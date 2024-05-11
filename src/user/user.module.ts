import { Module } from '@nestjs/common';
import { CreateUserUseCase, FindUserUseCase } from '@/user/use-cases';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmRepository } from './user.repository';
import { CryptographyAdapter } from '@/external';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    UserTypeOrmRepository,
    CryptographyAdapter,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
    {
      provide: 'ICreateUserUseCase',
      useClass: CreateUserUseCase,
    },
    {
      provide: 'IFindUserUseCase',
      useClass: FindUserUseCase,
    },
    {
      provide: 'ICryptographyAdapter',
      useClass: CryptographyAdapter,
    },
  ],
})
export class UserModule {}
