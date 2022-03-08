import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateTweetInfoDto } from './dto/create-tweetinfo.dto';
import { TweetInfo } from './entities/tweetinfo.entity';

@Injectable()
export class TweetsInfoService {
  constructor(
    @InjectRepository(TweetInfo)
    private readonly tweetInfoRepository: Repository<TweetInfo>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.tweetInfoRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const tweetInfo = await this.tweetInfoRepository.findOne(id);
    if (!tweetInfo) {
      throw new NotFoundException(`TweetInfo for #${id} not found`);
    }
    return tweetInfo;
  }

  async create(createTweetInfoDto: CreateTweetInfoDto) {
    const tweetInfo = await this.tweetInfoRepository.create(createTweetInfoDto);
    return this.tweetInfoRepository.save(tweetInfo);
  }

  async remove(id: string) {
    const tweetInfo = await this.findOne(id);
    return this.tweetInfoRepository.remove(tweetInfo);
  }
}
