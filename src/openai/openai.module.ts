import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { TweetingService } from 'src/tweeting/tweeting.service';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, TweetingService],
})
export class OpenaiModule {}
