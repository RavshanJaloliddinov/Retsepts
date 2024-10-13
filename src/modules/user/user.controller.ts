import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRequest } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { multerConfig } from 'src/config/multer.config';

@Controller('user')
export class UserController { 
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.userService.createUser({
      ...createUserDto,
      image: image.filename
    });
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
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
