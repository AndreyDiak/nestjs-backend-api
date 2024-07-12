import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from 'src/inputs/user.input';
import { UserPayload } from 'src/payloads/user.payload';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserInput): Promise<UserPayload> {
    const createdUser = new this.userModel(body);
    const user = await createdUser.save();
    return user;
  }

  async findOneByID(userId: string): Promise<UserPayload> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with id:${userId} not found `);
    }
    return user;
  }

  async findOneByUsername(userName: string): Promise<UserPayload> {
    const user = await this.userModel.findOne({ userName });
    if (!user) {
      throw new NotFoundException(`User with username:${userName} not found `);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserPayload> {
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException(`User with email:${email} not found `);
    }
    return user;
  }

  async findAll(): Promise<UserPayload[]> {
    const users = await this.userModel.find();
    return users;
  }

  async updateOne(id: string, body: UpdateUserInput): Promise<UserPayload> {
    await this.userModel.updateOne({ _id: id }, body);
    const updatedUser = this.userModel.findById(id);
    return updatedUser;
  }

  async deleteOne(id: string): Promise<unknown> {
    return await this.userModel.deleteOne({ _id: id });
  }
}
