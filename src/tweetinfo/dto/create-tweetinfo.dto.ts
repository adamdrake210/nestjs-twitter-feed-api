import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTweetInfoDto {
  @ApiProperty({ description: 'Array of topics to use on twitter api' })
  @IsString({ each: true })
  readonly tweettopics: string[];

  @ApiProperty({ description: 'Array of questions for the openai api' })
  @IsString({ each: true })
  readonly tweetquestions: string[];
}
