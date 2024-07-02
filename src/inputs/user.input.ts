import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  userName: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsString()
  password: string;
}

export class UpdateUserInput extends OmitType(PartialType(CreateUserInput), [
  'password',
] as const) {}
