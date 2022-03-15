import { Module } from '@nestjs/common';
import { TweetInfoService } from './tweetinfo.service';
import { TweetinfoController } from './tweetinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetInfo } from './entities/tweetinfo.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TweetInfo, User])],
  providers: [TweetInfoService],
  controllers: [TweetinfoController],
  exports: [TweetInfoService],
})
export class TweetinfoModule {}
