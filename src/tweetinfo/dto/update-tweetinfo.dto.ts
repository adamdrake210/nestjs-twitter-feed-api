import { PartialType } from '@nestjs/swagger';
import { CreateTweetInfoDto } from './create-tweetinfo.dto';

export class UpdateTweetInfoDto extends PartialType(CreateTweetInfoDto) {}
