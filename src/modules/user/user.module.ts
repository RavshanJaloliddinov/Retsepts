import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { Food, FoodModule } from '../food';
import { UploadService } from '../upload/upload.service';


@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => FoodModule)
  ],
  controllers: [UserController],
  providers: [UserService, UploadService],
  exports: [SequelizeModule],
})
export class UserModule {}
