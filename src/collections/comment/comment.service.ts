import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/inputs/comment.input';
import { CommentPayload } from 'src/payloads/comment.payload ';
import { Comment } from './../../schemas/comment.schema';
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(
    body: CreateCommentInput,
    authorId: string,
  ): Promise<CommentPayload> {
    const createdComment = new this.commentModel({
      ...body,
      authorId,
    });
    const comment = await createdComment.save();
    return comment;
  }

  async findOne(commentId: string): Promise<CommentPayload> {
    const post = this.commentModel.findById(commentId);
    if (!post) {
      throw new NotFoundException(`Comment with id:${commentId} not found `);
    }
    return post;
  }

  async findByFilter(filter: FilterQuery<Comment>): Promise<CommentPayload[]> {
    const comments = this.commentModel.find(filter);
    return comments;
  }

  async updateOne(
    commentId: string,
    body: UpdateCommentInput,
  ): Promise<CommentPayload> {
    await this.commentModel.updateOne({ _id: commentId }, body);
    const updatedComment = this.findOne(commentId);
    return updatedComment;
  }

  async deleteOne(commentId: string) {
    await this.commentModel.deleteOne({ _id: commentId });
  }

  async deleteMany(commentIds: Types.ObjectId[]) {
    await this.commentModel.deleteMany({
      _id: {
        $in: commentIds,
      },
    });
  }
}
