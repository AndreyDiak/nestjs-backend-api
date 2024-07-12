import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentInput {
  @IsString()
  text: string;

  @IsString()
  postId: string;
}

export class UpdateCommentInput extends OmitType(
  PartialType(CreateCommentInput),
  ['postId'] as const,
) {}
