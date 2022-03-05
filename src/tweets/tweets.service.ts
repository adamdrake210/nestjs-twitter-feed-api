import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Topic } from './entities/topic.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.tweetRepository.find({
      relations: ['topics'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const tweet = await this.tweetRepository.findOne(id, {
      relations: ['topics'],
    });
    if (!tweet) {
      throw new NotFoundException(`Tweet info for #${id} not found`);
    }
    return tweet;
  }

  async create(createTweetDto: CreateTweetDto) {
    const topics = await Promise.all(
      createTweetDto.topics.map((name) => this.preloadTopicByName(name)),
    );
    const tweet = await this.tweetRepository.create({
      ...createTweetDto,
      topics,
    });
    return this.tweetRepository.save(tweet);
  }

  private async preloadTopicByName(name: string): Promise<Topic> {
    const existingFlavor = await this.topicRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.topicRepository.create({ name });
  }
}
