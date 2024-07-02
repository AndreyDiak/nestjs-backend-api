import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ collection: 'comments', timestamps: true })
export class Comment {
  @Prop()
  text: string;

  @Prop()
  likesCount: number;

  @Prop()
  author: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
