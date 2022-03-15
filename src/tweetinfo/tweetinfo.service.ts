import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTweetInfoDto } from './dto/create-tweetinfo.dto';
import { UpdateTweetInfoDto } from './dto/update-tweetinfo.dto';
import { TweetInfo } from './entities/tweetinfo.entity';

@Injectable()
export class TweetInfoService {
  constructor(
    @InjectRepository(TweetInfo)
    private readonly tweetInfoRepository: Repository<TweetInfo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.tweetInfoRepository.find({
      skip: offset || 0,
      take: limit || 10,
    });
  }

  async findOne(id: string) {
    const tweetInfo = await this.tweetInfoRepository.findOne(id);
    if (!tweetInfo) {
      throw new NotFoundException(`TweetInfo for #${id} not found`);
    }
    return tweetInfo;
  }

  async create(createTweetInfoDto: CreateTweetInfoDto, { email }: User) {
    const tweetInfo = await this.tweetInfoRepository.create(createTweetInfoDto);
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`User for #${email} not found`);
    }
    if (user.tweetinfo !== null) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    user.tweetinfo = tweetInfo;
    await this.userRepository.save(user);
    return this.tweetInfoRepository.save(tweetInfo);
  }

  async update(id: string, updateTweetInfoDto: UpdateTweetInfoDto) {
    const tweetInfo = await this.tweetInfoRepository.preload({
      id: +id,
      ...updateTweetInfoDto,
    });
    if (!tweetInfo) {
      throw new NotFoundException(`Tweetinfo for #${id} not found`);
    }
    return this.tweetInfoRepository.save(tweetInfo);
  }

  async remove(id: string) {
    const tweetInfo = await this.findOne(id);
    return this.tweetInfoRepository.remove(tweetInfo);
  }
}
