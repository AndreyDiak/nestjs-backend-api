import { PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';

export class CommentPayload extends PartialType(Comment) {
  _id: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
