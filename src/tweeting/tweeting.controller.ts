import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TweetingService } from './tweeting.service';
@Controller('tweeting')
export class TweetingController {
  constructor(private readonly tweetingService: TweetingService) {}

  @Post('create')
  createTweet(@Body() text: string) {
    return this.tweetingService.createTweet(text);
  }

  @Get(':id')
  findOneTweet(@Param('id') id: string) {
    return this.tweetingService.findOneById(id);
  }

  @Get()
  findTweetsByQuery(@Query('query') query: string) {
    return this.tweetingService.getRecentTweetsByQuery(query);
  }

  @Post('like')
  likeTweet(
    @Body()
    { twitterId, tweetId }: { twitterId: string; tweetId: string },
  ) {
    return this.tweetingService.likeTweet(twitterId, tweetId);
  }

  @Post('retweet')
  createReTweet(
    @Body()
    { twitterId, tweetId }: { twitterId: string; tweetId: string },
  ) {
    return this.tweetingService.createReTweet(twitterId, tweetId);
  }
}
