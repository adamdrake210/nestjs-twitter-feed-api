import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { twitterKeys } from './constants/twitterkeys';

const twitterClient = new TwitterApi({
  appKey: twitterKeys.apiKey,
  appSecret: twitterKeys.apiKeySecret,
  accessToken: twitterKeys.accessToken,
  accessSecret: twitterKeys.accessTokenSecret,
});

@Injectable()
export class TweetingService {
  async findOneById(id: string) {
    const response = await twitterClient.v2.get(`tweets/${id}`);
    return response.data;
  }
  async createTweet(text: string) {
    const response = await twitterClient.v2.tweet(text);
    return response.data;
  }

  async createReTweet(twitterId: string, tweetId: string) {
    const response = await twitterClient.v2.retweet(twitterId, tweetId);
    return response.data;
  }

  async likeTweet(twitterId: string, tweetId: string) {
    const response = await twitterClient.v2.like(twitterId, tweetId);
    return response.data;
  }
}
