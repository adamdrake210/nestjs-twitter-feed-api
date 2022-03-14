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
  async cronLikeTweet() {
    try {
      console.log('🚀 ~ Running the Like Job');
      const tweetInfo = await this.tweetInfoService.findOne('1');
      const { tweettopics } = tweetInfo;
      const chosenTopic =
        tweettopics[Math.floor(Math.random() * tweettopics.length)];
      this.tweetingService.getAndLikeTweet(chosenTopic);
    } catch (error) {
      throw new NotFoundException(
        `Something went wrong liking a tweet: ${error}`,
      );
    }
  }

  @Cron('*/11 * * * *')
  async cronRetweet() {
    try {
      console.log('🚀 ~ Running the Retweet Job');
      const tweetInfo = await this.tweetInfoService.findOne('1');
      const { tweettopics } = tweetInfo;
      const chosenTopic =
        tweettopics[Math.floor(Math.random() * tweettopics.length)];
      this.tweetingService.getAndRetweet(chosenTopic);
    } catch (error) {
      throw new NotFoundException(
        `Something went wrong retweeting a tweet: ${error}`,
      );
    }
  }

  @Cron('* * * * *')
  async cronCreateTweet() {
    try {
      console.log('🚀 ~ Running the Retweet Job');
      const tweetInfo = await this.tweetInfoService.findOne('1');
      const { tweettopics } = tweetInfo;
      const chosenTopic =
        tweettopics[Math.floor(Math.random() * tweettopics.length)];
      this.tweetingService.getAndWriteTweet(chosenTopic);
    } catch (error) {
      throw new NotFoundException(
        `Something went wrong creating a tweet: ${error}`,
      );
    }
  }
}
