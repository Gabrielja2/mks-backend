import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'mydatabase',
      username: 'myuser',
      password: 'mypassword',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MoviesModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 60 * 1000,
      isGlobal: true,
      store: redisStore,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
