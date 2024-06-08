import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  findAll(@Query() paginationOptions: PaginationOptionsDto): Promise<PaginationDto<Users>> {
    if (!(paginationOptions.page && paginationOptions.take)) paginationOptions = new PaginationOptionsDto();
    return this.userService.findAll(paginationOptions);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.create(createUserDto);
  }


  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return this.userService.update(id, updateUserDto)
  }

  @Patch('solve-problem/:id')
  async solve(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.userService.solve(id)
  }

}
