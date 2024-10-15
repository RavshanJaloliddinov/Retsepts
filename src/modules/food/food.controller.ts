import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './models';
import { Protected, Roles } from 'src/decarators';
import { UserRoles } from '../user';

@ApiTags('Food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }


  @ApiConsumes('multipart/form-data')
  @Post()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @Body() createFoodDto: CreateFoodDto,
    @UploadedFile()
      file: Express.Multer.File,
  ): Promise<void> {
    return await this.foodService.createFood({ ...createFoodDto, video: file });
  }


  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  async findAll(): Promise<Food[]> {
    return await this.foodService.findAllFood();
  }


  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':foodId')
  async findOne(@Param('foodId') foodId: number) {
    return await this.foodService.findFoodById(foodId);
  }


  @ApiConsumes('multipart/form-data')
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch(':foodId')
  async update(@Param('foodId') foodId: number, @Body() updateFoodDto: UpdateFoodDto) {
    return await this.foodService.updateFood(foodId, updateFoodDto);
  }


  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Delete(':foodId')
  async remove(@Param('foodId', ParseIntPipe) foodId: number) {
    return await this.foodService.deleteFood(foodId);
  }
}
