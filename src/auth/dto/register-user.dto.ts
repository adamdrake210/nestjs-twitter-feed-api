import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly twitterhandle: string;
}
