import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map, firstValueFrom } from 'rxjs';
import { OpenaiService } from 'src/openai/openai.service';
import { TweetingService } from 'src/tweeting/tweeting.service';

@Injectable()
export class DevtoService {
  constructor(
    private readonly tweetingService: TweetingService,
    private readonly openaiService: OpenaiService,
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

  async findingTwitterHandle(twitter_username: string | null) {
    if (twitter_username) {
      const twitterHandleText = await this.openaiService.anotherWayToSay(
        'It was written by',
      );
      return `${twitterHandleText} @${twitter_username}`;
    }
    return '';
  }

  async craftingTweetFromData(tweetIntro: string, article: any) {
    try {
      const twitterHandleText = await this.findingTwitterHandle(
        article.user.twitter_username,
      );
      return `${tweetIntro} ${article.url} ${twitterHandleText} #${article.tag_list[0]}`;
    } catch (error) {
      console.error('craftTweetError: ', error);
    }
  }

  async createDevToTweet(topic: string) {
    const finalDevToArticle = await this.findArticle(topic);
    const articleArray = await firstValueFrom(finalDevToArticle);
    const article = await articleArray[0];
    const tweetIntro = await this.openaiService.anotherWayToSay(
      'I read this very interesting article',
    );
    if (article && tweetIntro) {
      const finalTweet = await this.craftingTweetFromData(tweetIntro, article);
      await this.tweetingService.createTweet(finalTweet);
    }
  }
}
