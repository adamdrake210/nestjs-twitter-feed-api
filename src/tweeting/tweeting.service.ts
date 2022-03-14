import { Injectable, NotFoundException } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { twitterKeys } from './constants/twitterkeys';
import { filterForGoodTweet } from './utils/filterForGoodTweet';

const twitterClient = new TwitterApi({
  appKey: twitterKeys.apiKey,
  appSecret: twitterKeys.apiKeySecret,
  accessToken: twitterKeys.accessToken,
  accessSecret: twitterKeys.accessTokenSecret,
});

const MY_TWITTER_ID = '2458002092';

@Injectable()
export class TweetingService {
  async findOneById(id: string) {
    const response = await twitterClient.v2.get(`tweets/${id}`);
    return response.data;
  }

  public async getRecentTweetsByQuery(query: string) {
    const response = await twitterClient.v2.get('tweets/search/recent', {
      query,
      'tweet.fields': 'lang',
    });
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

  async getTweet(query: string) {
    const recentTweets = await this.getRecentTweetsByQuery(query);
    if (!recentTweets) {
      throw new NotFoundException(`Something went wrong retreiving tweets`);
    }
    const finalTweet = filterForGoodTweet(recentTweets);
    if (finalTweet?.text && finalTweet?.text.length < 200) {
      return finalTweet;
    }
    return;
  }

  async getAndLikeTweet(query: string) {
    const finalTweet = await this.getTweet(query);
    console.log('🚀 ~ getAndLike ~ finalTweet: ', finalTweet);
    if (finalTweet) {
      await this.likeTweet(MY_TWITTER_ID, finalTweet.id);
    }
  }

  async getAndRetweet(query: string) {
    const finalTweet = await this.getTweet(query);
    console.log('🚀 ~ getAndRetweet ~ finalTweet: ', finalTweet);
    if (finalTweet) {
      await this.createReTweet(MY_TWITTER_ID, finalTweet.id);
    }
    return;
  }

  async getAndWriteTweet(query: string) {
    const finalTweet = await this.getTweet(query);
    console.log('🚀 ~ getAndWriteTweet ~ finalTweet: ', finalTweet);
    if (finalTweet) {
      await this.createTweet(finalTweet.text);
    }
    return;
  }
}
