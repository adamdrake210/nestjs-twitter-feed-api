import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { TweetingService } from 'src/tweeting/tweeting.service';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class OpenaiService {
  constructor(private readonly tweetingService: TweetingService) {}

  async create(prompt: string) {
    const openAiResponse = await openai.createCompletion('text-davinci-001', {
      prompt,
      max_tokens: 45,
      temperature: 1,
      top_p: 1,
      n: 1,
      stop: '.',
    });
    return openAiResponse.data.choices[0].text;
  }

  async createOpenAiTweet(question: string) {
    const finalOpenAiText = await this.create(question);
    console.log(
      '🚀 ~ file: createOpenAiTweet.ts ~ line 9 ~ createOpenAiTweet ~ finalOpenAiText',
      finalOpenAiText,
    );
    if (finalOpenAiText) {
      await this.tweetingService.createTweet(finalOpenAiText);
    }
  }

  async anotherWayToSay(text: string) {
    const finalOpenAiText = await this.create(`Another way to say "${text}"`);
    if (finalOpenAiText) {
      return finalOpenAiText;
    }
  }
}
