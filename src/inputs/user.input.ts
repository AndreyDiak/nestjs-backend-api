import { OmitType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  password: string;
}

export class UpdateUserInput extends OmitType(CreateUserInput, [
  'password',
] as const) {}
