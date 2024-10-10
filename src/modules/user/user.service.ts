import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { UpdateUserRequest } from './interfaces/update-user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) { }

  async createUser(payload: CreateUserDto): Promise<void> {
    await this.userModel.create({
      fullName: payload.fullName,
      image: payload.image,
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
    return await this.userModel.update(
      {
        fullName: payload.fullName,
        image: payload.image,
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
