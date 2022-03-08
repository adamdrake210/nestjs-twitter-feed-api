import { Test, TestingModule } from '@nestjs/testing';
import { TweetsInfoService } from './tweetinfo.service';

describe('TweetinfoService', () => {
  let service: TweetsInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsInfoService],
    }).compile();

    service = module.get<TweetsInfoService>(TweetsInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
