import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput, UpdatePostInput } from 'src/inputs/post.input';
import { PostPayload } from 'src/payloads/post.payload';
import { Post } from 'src/schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(body: CreatePostInput, userId: string): Promise<PostPayload> {
    const createdPost = new this.postModel({
      ...body,
      authorId: userId,
    });
    const post = await createdPost.save();
    return post;
  }

  async findOne(postId: string): Promise<PostPayload> {
    const post = this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with id:${postId} not found `);
    }
    return post;
  }

  async findAll(): Promise<PostPayload[]> {
    return this.postModel.find();
  }

  async updateOne(postId: string, body: UpdatePostInput): Promise<PostPayload> {
    await this.postModel.updateOne({ _id: postId }, body);
    const updatedPost = this.findOne(postId);
    return updatedPost;
  }

  async deleteOne(postId: string) {
    return await this.postModel.deleteOne({ _id: postId });
  }
}
