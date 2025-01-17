import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Role } from 'src/common/entities/role.enum';
import { Roles } from 'src/common/entities/roles.decorator';
import { CreateUserInput, UpdateUserInput } from 'src/inputs/user.input';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserInput) {
    return this.userService.create(body);
  }

  @Get('/list')
  getAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneByID(id);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdateUserInput) {
    return this.userService.updateOne(id, body);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
