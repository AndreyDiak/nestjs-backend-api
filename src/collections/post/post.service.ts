import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput } from 'src/inputs/post.input';
import { Post } from 'src/schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(body: CreatePostInput): Promise<Post> {
    const createdPost = new this.postModel(body);
    const post = await createdPost.save();
    return post;
  }
}
