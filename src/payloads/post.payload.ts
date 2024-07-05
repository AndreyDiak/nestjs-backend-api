import { PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Post } from 'src/schemas/post.schema';

export class PostPayload extends PartialType(Post) {
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
