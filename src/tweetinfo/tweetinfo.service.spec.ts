import { Test, TestingModule } from '@nestjs/testing';
import { TweetInfoService } from './tweetinfo.service';

describe('TweetinfoService', () => {
  let service: TweetInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetInfoService],
    }).compile();

    service = module.get<TweetInfoService>(TweetInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
