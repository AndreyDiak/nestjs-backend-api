import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentInput {
  @IsString()
  text: string;

  @IsString()
  authorId: string;

  @IsString()
  postId: string;
}

export class UpdateCommentInput extends OmitType(
  PartialType(CreateCommentInput),
  ['postId', 'authorId'] as const,
) {}
