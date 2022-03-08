import { Module } from '@nestjs/common';
import { TweetInfoService } from './tweetinfo.service';
import { TweetinfoController } from './tweetinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetInfo } from './entities/tweetinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TweetInfo])],
  providers: [TweetInfoService],
  controllers: [TweetinfoController],
})
export class TweetinfoModule {}
