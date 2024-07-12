import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentInput {
  @IsString()
  text: string;

  @IsString()
  post_id: string;
}

export class UpdateCommentInput extends OmitType(
  PartialType(CreateCommentInput),
  ['post_id'] as const,
) {}
