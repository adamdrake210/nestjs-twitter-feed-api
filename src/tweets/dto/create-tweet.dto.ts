import { IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly topics: string[];
}
