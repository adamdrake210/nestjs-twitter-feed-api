import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly twitterhandle: string;
}
