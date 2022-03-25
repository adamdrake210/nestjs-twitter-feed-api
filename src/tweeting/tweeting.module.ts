import { Module } from '@nestjs/common';
import { TweetingService } from './tweeting.service';
import { TweetingController } from './tweeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetInfo } from 'src/tweetinfo/entities/tweetinfo.entity';
import { User } from 'src/users/entities/user.entity';
import { CronService } from './cron.service';
import { TweetInfoService } from 'src/tweetinfo/tweetinfo.service';
import { OpenaiService } from 'src/openai/openai.service';
import { DevtoService } from 'src/devto/devto.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([TweetInfo, User]), HttpModule],
  controllers: [TweetingController],
  providers: [
    TweetingService,
    CronService,
    TweetInfoService,
    OpenaiService,
    DevtoService,
  ],
})
export class TweetingModule {}
