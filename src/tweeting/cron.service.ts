import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TweetInfoService } from 'src/tweetinfo/tweetinfo.service';
import { TweetingService } from './tweeting.service';

@Injectable()
export class CronService {
  constructor(
    private readonly tweetingService: TweetingService,
    private readonly tweetInfoService: TweetInfoService,
  ) {}

  @Cron('*/8 * * * *')
  cronLikeTweet() {
    try {
      console.log('Running the Like Job');
      this.tweetingService.getAndLikeTweet('javascript');
    } catch (error) {
      throw new NotFoundException(
        `Something went wrong liking a tweet: ${error}`,
      );
    }
  }

  @Cron('*/20 * * * * *')
  async cronRetweet() {
    try {
      console.log('Running the Retweet Job');
      const tweetInfo = await this.tweetInfoService.findOne('1');
      const { tweettopics } = tweetInfo;
      this.tweetingService.getAndRetweet(
        tweettopics[Math.floor(Math.random() * tweettopics.length)],
      );
    } catch (error) {
      throw new NotFoundException(
        `Something went wrong retweeting a tweet: ${error}`,
      );
    }
  }
}
