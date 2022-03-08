import { IsString } from 'class-validator';

export class CreateTweetInfoDto {
  @IsString({ each: true })
  readonly tweettopics: string[];

  @IsString({ each: true })
  readonly tweetquestions: string[];
}
