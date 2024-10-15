import { Injectable } from '@nestjs/common';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './models/food.model';
import { CreateFoodRequest } from './interfaces/create-food.interface';
import { UploadService } from '../upload/upload.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FoodService {

  #_uploadService: UploadService
  #_jwtService: JwtService
  constructor(
    @InjectModel(Food) private foodModel: typeof Food,
    upload: UploadService,
    jwtService: JwtService,
  ) {
    this.#_uploadService = upload
    this.#_jwtService = jwtService
  }

  async createFood(payload: CreateFoodRequest): Promise<void> {

    const videoOptions = await this.#_uploadService.uploadFile({
      file: payload.video,
      destination: 'uploads/videos',
    })
    

    await this.foodModel.create({
      title: payload.title,
      creator_id: payload.creator_id,
      category_id: payload.category_id,
      receipt: payload.receipt,
      description: payload.description,
      cooking_time: payload.cooking_time,
      video: videoOptions.file, 
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
        video: payload.video
      },
      { where: { id } }
    )
  }

  async deleteFood(id: number) {

    const foundedFood = await this.foodModel.findByPk(id);

    await this.#_uploadService.removeFile({ fileName: foundedFood.video });

    await this.foodModel.destroy({ where: { id } });
  }
}
