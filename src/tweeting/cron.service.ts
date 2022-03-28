import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DevtoService } from 'src/devto/devto.service';
import { OpenaiService } from 'src/openai/openai.service';
import { TweetInfoService } from 'src/tweetinfo/tweetinfo.service';
import { cronConfig } from './configs/cronConfig';
import { TweetingService } from './tweeting.service';
import { randomiser } from './utils/randomiser';

@Injectable()
export class CronService {
  constructor(
    private readonly tweetingService: TweetingService,
    private readonly tweetInfoService: TweetInfoService,
    private readonly openaiService: OpenaiService,
    private readonly devtoService: DevtoService,
  ) {}

  @Cron(cronConfig.likingTweets.schedule)
  async cronLikeTweet() {
    if (cronConfig.retweetingTweets.isRunning) {
      try {
        console.log('🚀 ~ Running the Like Job');
        const tweetInfo = await this.tweetInfoService.findOne('1');
        const { tweettopics } = tweetInfo;
        const chosenTopic = randomiser(tweettopics);
        this.tweetingService.getAndLikeTweet(chosenTopic);
      } catch (error) {
        throw new NotFoundException(
          `Something went wrong liking a tweet: ${error}`,
        );
      }
    }
  }

  @Cron(cronConfig.retweetingTweets.schedule)
  async cronRetweet() {
    if (cronConfig.retweetingTweets.isRunning) {
      try {
        console.log('🚀 ~ Running the Retweet Job');
        const tweetInfo = await this.tweetInfoService.findOne('1');
        const { tweettopics } = tweetInfo;
        const chosenTopic = randomiser(tweettopics);
        this.tweetingService.getAndRetweet(chosenTopic);
      } catch (error) {
        throw new NotFoundException(
          `Something went wrong retweeting a tweet: ${error}`,
        );
      }
    }
  }

  @Cron(cronConfig.creatingTweets.schedule)
  async cronCreateTweet() {
    if (cronConfig.creatingTweets.isRunning) {
      try {
        console.log('🚀 ~ Running the Create Tweet Job');
        const tweetInfo = await this.tweetInfoService.findOne('1');
        const { tweettopics } = tweetInfo;
        const chosenTopic = randomiser(tweettopics);
        this.tweetingService.getAndWriteTweet(chosenTopic);
      } catch (error) {
        throw new NotFoundException(
          `Something went wrong creating a tweet: ${error}`,
        );
      }
    }
  }

  @Cron(cronConfig.creatingOpenAiTweets.schedule)
  async cronCreateOpenAiTweet() {
    if (cronConfig.creatingOpenAiTweets.isRunning) {
      try {
        console.log('🚀 ~ Running the Create Tweet via OpenAI');
        const tweetInfo = await this.tweetInfoService.findOne('1');
        const { tweetquestions, tweettopics } = tweetInfo;
        const chosenTopic = randomiser(tweettopics);
        const chosenQuestion = randomiser(tweetquestions);
        this.openaiService.createOpenAiTweet(chosenQuestion + chosenTopic);
      } catch (error) {
        throw new NotFoundException(
          `Something went wrong creating a tweet for openai: ${error}`,
        );
      }
    }
  }

  @Cron(cronConfig.creatingDevToTweets.schedule)
  async cronCreateDevToTweet() {
    if (cronConfig.creatingDevToTweets.isRunning) {
      try {
        console.log('🚀 ~ Running the Create Article Tweet via DevTo');
        const tweetInfo = await this.tweetInfoService.findOne('1');
        const { tweettopics } = tweetInfo;
        const chosenTopic = randomiser(tweettopics);
        this.devtoService.createDevToTweet(chosenTopic);
      } catch (error) {
        throw new NotFoundException(
          `Something went wrong creating an article tweet for devto: ${error}`,
        );
      }
    }
  }
}
