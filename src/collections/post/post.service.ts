import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput } from 'src/inputs/post.input';
import { Post } from 'src/schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(body: CreatePostInput, userId: string): Promise<Post> {
    const createdPost = new this.postModel({
      ...body,
      authorId: userId,
    });
    const post = await createdPost.save();
    return post;
  }
  async findOne(postId: string) {
    const post = this.postModel.findById(postId);
    if (!post) {
    }
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }
}
