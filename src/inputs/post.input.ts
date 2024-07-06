import { OmitType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}

export class UpdatePostInput extends OmitType(CreatePostInput, [
  'title',
] as const) {}
