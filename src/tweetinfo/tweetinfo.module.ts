import { Module } from '@nestjs/common';
import { TweetsInfoService } from './tweetinfo.service';
import { TweetinfoController } from './tweetinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetInfo } from './entities/tweetinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TweetInfo])],
  providers: [TweetsInfoService],
  controllers: [TweetinfoController],
})
export class TweetinfoModule {}
