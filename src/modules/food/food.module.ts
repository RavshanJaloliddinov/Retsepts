import { Module, forwardRef } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './models';
import { UploadService } from '../upload/upload.service';
import { Category } from '../category';
import { User, UserModule } from '../user';

@Module({
  imports: [
    SequelizeModule.forFeature([Food]),
    forwardRef(() => UserModule),
  ],  
  controllers: [FoodController],
  providers: [FoodService, UploadService],
  exports: [SequelizeModule],
})
export class FoodModule { }
