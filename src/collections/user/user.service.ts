import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from 'src/inputs/user.input';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(body: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(body);
    const user = await createdUser.save();
    return user;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with email id:${id} not found `);
    }
    return user;
  }

  async listUser(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async updateUser(id: string, body: UpdateUserInput): Promise<User> {
    await this.userModel.updateOne({ _id: id }, body);
    const updatedUser = this.userModel.findById(id);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }
}
