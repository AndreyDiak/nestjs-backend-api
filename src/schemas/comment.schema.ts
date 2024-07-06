import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ collection: 'comments', timestamps: true })
export class Comment {
  @Prop()
  text: string;

  @Prop()
  likesCount: number;

  @Prop()
  authorId: string;

  @Prop()
  postId: string;

  @Prop()
  edited: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
