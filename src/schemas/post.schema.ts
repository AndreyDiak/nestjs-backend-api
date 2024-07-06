import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  tags: string[];

  @Prop()
  edited: boolean;

  @Prop()
  authorId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
