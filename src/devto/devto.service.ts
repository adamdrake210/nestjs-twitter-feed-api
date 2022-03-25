import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map, firstValueFrom } from 'rxjs';
import { TweetingService } from 'src/tweeting/tweeting.service';
import { craftingTweetFromData } from './utils/craftingTweetFromData';

@Injectable()
export class DevtoService {
  constructor(
    private readonly tweetingService: TweetingService,
    private httpService: HttpService,
  ) {}

  findArticle(topic: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get('https://dev.to/api/articles', {
        headers: {
          'api-key': process.env.DEV_TO_API_KEY,
        },
        params: {
          tag: topic,
          state: 'fresh',
          per_page: '1',
        },
      })
      .pipe(map((response) => response.data));
  }

  async createDevToTweet(topic: string) {
    const finalDevToArticle = await this.findArticle(topic);
    const articleArray = await firstValueFrom(finalDevToArticle);
    const tweet = await articleArray[0];
    if (tweet) {
      await this.tweetingService.createTweet(craftingTweetFromData(tweet));
    }
  }
}
