import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTweetInfoDto } from './dto/create-tweetinfo.dto';
import { TweetsInfoService } from './tweetinfo.service';

@UseGuards(JwtAuthGuard)
@Controller('tweetinfo')
export class TweetinfoController {
  constructor(private readonly tweetsInfoServer: TweetsInfoService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.tweetsInfoServer.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tweetsInfoServer.findOne('' + id);
  }

  @Post()
  create(@Body() createTweetInfoDto: CreateTweetInfoDto) {
    return this.tweetsInfoServer.create(createTweetInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tweetsInfoServer.remove('' + id);
  }
}
