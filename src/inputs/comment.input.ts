import { IsString } from 'class-validator';

export class CreateCommentInput {
  @IsString()
  text: string;

  @IsString()
  authorId: string;

  @IsString()
  postId: string;
}
