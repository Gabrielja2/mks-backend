import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ICreateUserUseCase, IFindUserUseCase } from '@/user/use-cases';
import { CreateUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject('ICreateUserUseCase')
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject('IFindUserUseCase')
    private readonly findUserUseCase: IFindUserUseCase,
  ) {}

  @ApiResponse({ status: 409, description: 'User already exists' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserUseCase.execute(id);
  }
}
