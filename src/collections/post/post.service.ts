import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput, UpdatePostInput } from 'src/inputs/post.input';
import { PostPayload } from 'src/payloads/post.payload';
import { Post } from 'src/schemas/post.schema';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly commentService: CommentService,
  ) {}

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
    await this.postModel.deleteOne({ _id: postId });
    try {
      const post = await this.findOne(postId);
    } catch {
      const candidates = await this.commentService.findByFilter({
        postId,
      });
      const candidateIds = candidates.map((v) => v._id);
      await this.commentService.deleteMany(candidateIds);
    }
  }
}
