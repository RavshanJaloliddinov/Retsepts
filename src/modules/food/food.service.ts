import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './models/food.model';
import { CreateFoodRequest } from './interfaces/create-food.interface';

@Injectable()
export class FoodService {

  constructor(
    @InjectModel(Food) private foodModel: typeof Food
  ) { }


  async createFood(payload: CreateFoodRequest): Promise<void> {
    await this.foodModel.create({
      title: payload.title,
      creator_id: payload.creator_id,
      category_id: payload.category_id,
      receipt: payload.receipt,
      description: payload.description,
      cooking_time: payload.cooking_time,
      video: payload.video,
      is_passed: payload.is_passed,
      rating: payload.rating
    })
  }

  async findAllFood(): Promise<Food[]> {
    return this.foodModel.findAll()
  }

  async findFoodById(id: number) {
    return this.foodModel.findAll({ where: { id } });
  }

  async updateFood(id: number, payload: UpdateFoodDto) {
    this.foodModel.update(
      {
        title: payload.title,
        creator_id: payload.creator_id,
        category_id: payload.category_id,
        receipt: payload.receipt,
        description: payload.description,
        cooking_time: payload.cooking_time,
        video: payload.video,
        is_passed: payload.is_passed,
        rating: payload.rating
      },
      { where: { id } }
    )
  }

  async deleteFood(id: number) {
    await this.foodModel.destroy({
      where: { id }
    })
  }
}
