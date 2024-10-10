import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models';
import { CreateCategoryRequest, UpdateCategoryRequest } from './interfaces';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) { }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll()
  }

  async findCategoryById(categoryId: number): Promise<Category[]> {
    return await this.categoryModel.findAll({ where: { id: categoryId } })
  }

  async updateCategory(payload: UpdateCategoryRequest): Promise<void> {
    await this.categoryModel.update({ name: payload.name }, { where: { id: payload.id } })
  }

  async createCategory(payload: CreateCategoryRequest): Promise<void> {
    await this.categoryModel.create({ name: payload.name })
  }

  async deleteCategory(id: number) {
    await this.categoryModel.destroy({
      where: {
        id
      }
    });
  }
}
