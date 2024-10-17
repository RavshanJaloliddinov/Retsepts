import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRequest } from './interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decarators';
import { UserRoles } from './models';


// @ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Create food
  // @Protected(true)
  // @Roles([UserRoles.admin])
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.userService.createUser({
      ...createUserDto,
      image: image?.filename 
    });
  }

  // Get all foods
  @Get()
  // @Protected(true)
  // @Roles([UserRoles.admin])
  findAllUsers() {
    return this.userService.findAllUser();
  }

  // Get food by id
  // @Protected(true)
  // @Roles([UserRoles.admin])
  @Get('/:userId')
  findUserById(@Param('userId') id: string) {
    return this.userService.findOneUser(+id);
  }

  // Update user
  // @Protected(true)
  // @Roles([UserRoles.admin])
  @Patch('/:userId')
  @ApiConsumes('multipart/form-data') 
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateUser(
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserRequest,
    @UploadedFile() image?: Express.Multer.File, 
  ): Promise<void> {
    const updateData = {
      ...updateUserDto,
      image: image, 
    };

    await this.userService.updateUser(id, updateData);
  }

  // Delete user
  // @Protected(true)
  // @Roles([UserRoles.admin])
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
