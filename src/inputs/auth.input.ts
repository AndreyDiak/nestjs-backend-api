import { IsString } from 'class-validator';

export class CreateAuthInput {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
