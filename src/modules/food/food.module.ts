import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Food])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
