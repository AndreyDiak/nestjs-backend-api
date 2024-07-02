import { PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export class UserPayload extends PartialType(User) {
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
