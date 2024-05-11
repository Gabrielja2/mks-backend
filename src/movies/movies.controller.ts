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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@UseInterceptors(CacheInterceptor)
@ApiResponse({ status: 401, description: 'Unauthorized request' })
@ApiTags('movies')
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

  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @CacheTTL(60 * 1000)
  @CacheKey('movies')
  @ApiResponse({ status: 404, description: 'Not found request' })
  @Get()
  findAll() {
    return this.findAllMoviesUseCase.execute();
  }

  @ApiResponse({ status: 404, description: 'Not found request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findMovieUseCase.execute(id);
  }

  @ApiResponse({ status: 404, description: 'Not found request' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.updateMovieUseCase.execute(id, updateMovieDto);
  }

  @ApiResponse({ status: 404, description: 'Not found request' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteMovieUseCase.execute(id);
  }
}
