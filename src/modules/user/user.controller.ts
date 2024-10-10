import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRequest } from './interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUser();
  }

  @Get('/:userId')
  findUserById(@Param('userId') id: string) {
    return this.userService.findOneUser(+id);
  }

  @Patch('/:userId')
  updateUser(@Param('userId', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserRequest) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
