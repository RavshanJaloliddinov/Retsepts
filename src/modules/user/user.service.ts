import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { UpdateUserRequest } from './interfaces/update-user.interface';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class UserService {
  #_uploadService: UploadService
  constructor(@InjectModel(User) private userModel: typeof User, service: UploadService) { 
    this.#_uploadService = service
  }

  async createUser(payload: CreateUserDto): Promise<void> {

    
    const imageOptions = await this.#_uploadService.uploadFile({
      file: payload.image,
      destination: 'uploads/users',
    })

    

    await this.userModel.create({
      fullName: payload.fullName,
      image: imageOptions,
      experience: payload.experience,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      password: payload.password,
    })
  }

  async findAllUser(): Promise<User[]> {
    return await this.userModel.findAll()
  }

  async findOneUser(id: number): Promise<User[]> {
    return await this.userModel.findAll({ where: { id } })
  }

  async updateUser(id: number, payload: UpdateUserRequest) {
    const imageOptions = await this.#_uploadService.uploadFile({
      file: payload.image,
      destination: 'uploads/users',
    })
    return await this.userModel.update(
      {
        fullName: payload.fullName,
        image: imageOptions,
        expreince: payload.experience,
        email: payload.email,
        phone: payload.phone,
        password: payload.password
      },
      { where: { id } }
    )
  }

  async deleteUser(id: number) {
    return await this.userModel.destroy({
      where: { id }
    })
  }
}
