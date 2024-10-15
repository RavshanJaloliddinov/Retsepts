import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models';
import { Food, FoodModule } from '../food';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Food]),
    forwardRef(() => FoodModule)
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
