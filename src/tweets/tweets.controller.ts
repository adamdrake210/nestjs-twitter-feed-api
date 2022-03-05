import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';

@UseGuards(JwtAuthGuard)
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.tweetsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tweetsService.findOne('' + id);
  }

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }
}
