import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/entities/auth.decorator';
import { Role } from 'src/entities/role.enum';
import { Roles } from 'src/entities/roles.decorator';
import { CreateUserInput } from 'src/inputs/user.input';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() body: CreateUserInput) {
    return this.userService.createUser(body);
  }

  // @Public()
  @Get('/list')
  getAll() {
    return this.userService.listUser();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserByID(id);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: CreateUserInput) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
