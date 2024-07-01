import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserInput } from 'src/inputs/user.input';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserInput) {
    return this.userService.createUser(body);
  }

  @Get('/list')
  getAll() {
    return this.userService.listUser();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: CreateUserInput) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
