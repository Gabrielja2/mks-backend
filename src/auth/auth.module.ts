import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from './auth.controller';
import { AuthenticationAdapter, CryptographyAdapter } from '@/external';
import { UserTypeOrmRepository } from '@/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE_IN_SECONDS, JWT_SECRET } from '@/shared';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE_IN_SECONDS },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthenticationAdapter,
    UserTypeOrmRepository,
    CryptographyAdapter,
    {
      provide: 'IUserRepository',
      useClass: UserTypeOrmRepository,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IAuthenticationAdapter',
      useClass: AuthenticationAdapter,
    },
    {
      provide: 'ICryptographyAdapter',
      useClass: CryptographyAdapter,
    },
    JwtStrategyService,
  ],
})
export class AuthModule {}
