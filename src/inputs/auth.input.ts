import { IsString } from 'class-validator';

export class CreateAuthInput {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
