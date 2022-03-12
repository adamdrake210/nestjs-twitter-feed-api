import { Module } from '@nestjs/common';
import { TweetingService } from './tweeting.service';
import { TweetingController } from './tweeting.controller';
import { TweetInfoService } from 'src/tweetinfo/tweetinfo.service';
import { CronService } from './cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetInfo } from 'src/tweetinfo/entities/tweetinfo.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TweetInfo, User])],
  controllers: [TweetingController],
  providers: [TweetingService, TweetInfoService, CronService],
})
export class TweetingModule {}
