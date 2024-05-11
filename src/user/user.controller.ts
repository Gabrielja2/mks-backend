import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ICreateUserUseCase, IFindUserUseCase } from '@/user/use-cases';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject('ICreateUserUseCase')
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject('IFindUserUseCase')
    private readonly findUserUseCase: IFindUserUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserUseCase.execute(id);
  }
}
