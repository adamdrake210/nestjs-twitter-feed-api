import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password: string;
}
