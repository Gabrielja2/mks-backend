import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ICreateMovieUseCase,
  IDeleteMovieUseCase,
  IFindAllMoviesUseCase,
  IFindMovieUseCase,
  IUpdateMovieUseCase,
} from '@/movies/use-cases';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { JwtGuard } from '@/auth/jwt-guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseGuards(JwtGuard)
@UseInterceptors(CacheInterceptor)
@Controller('movies')
export class MoviesController {
  constructor(
    @Inject('ICreateMovieUseCase')
    private readonly createMovieUseCase: ICreateMovieUseCase,
    @Inject('IFindAllMoviesUseCase')
    private readonly findAllMoviesUseCase: IFindAllMoviesUseCase,
    @Inject('IFindMovieUseCase')
    private readonly findMovieUseCase: IFindMovieUseCase,
    @Inject('IUpdateMovieUseCase')
    private readonly updateMovieUseCase: IUpdateMovieUseCase,
    @Inject('IDeleteMovieUseCase')
    private readonly deleteMovieUseCase: IDeleteMovieUseCase,
  ) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @CacheTTL(60 * 1000)
  @CacheKey('movies')
  @Get()
  findAll() {
    return this.findAllMoviesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findMovieUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.updateMovieUseCase.execute(id, updateMovieDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteMovieUseCase.execute(id);
  }
}
