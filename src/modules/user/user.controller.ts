import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRequest } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('user')
export class UserController { 
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    dest: './uploads',
    storage: multer.diskStorage({
      destination(req, file, callback) {
        return callback(null, "./uploads")
      },
      filename: function (req, file, cb) {
        const extName = path.extname(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.round(Math.random() * 1E9))
        cb(null, file.filename + '-' + uniqueSuffix + extName)
      }
    })
  }))
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
