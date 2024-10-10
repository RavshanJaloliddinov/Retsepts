import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodService.findAllFood();
  }

  @Get(':foodId')
  findOne(@Param('foodId') foodId: number) {
    return this.foodService.findFoodById(foodId);
  }

  @Patch(':foodId')
  update(@Param('foodId') foodId: number, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.updateFood(foodId, updateFoodDto);
  }

  @Delete('foodId')
  remove(@Param('foodId', ParseIntPipe) foodId: number) {
    return this.foodService.deleteFood(foodId);
  }
}
