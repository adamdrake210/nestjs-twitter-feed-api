import { Module } from '@nestjs/common';
import { TweetingService } from './tweeting.service';
import { TweetingController } from './tweeting.controller';

@Module({
  controllers: [TweetingController],
  providers: [TweetingService],
})
export class TweetingModule {}
