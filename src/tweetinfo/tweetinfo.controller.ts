import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTweetInfoDto } from './dto/create-tweetinfo.dto';
import { UpdateTweetInfoDto } from './dto/update-tweetinfo.dto';
import { TweetInfoService } from './tweetinfo.service';
import express from 'express';
import { User } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('tweetinfo')
export class TweetinfoController {
  constructor(private readonly tweetInfoService: TweetInfoService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.tweetInfoService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tweetInfoService.findOne('' + id);
  }

  @Post()
  create(
    @Body() createTweetInfoDto: CreateTweetInfoDto,
    @Req() req: express.Request,
  ) {
    return this.tweetInfoService.create(createTweetInfoDto, req.user as User);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTweetInfoDto: UpdateTweetInfoDto,
  ) {
    return this.tweetInfoService.update(id, updateTweetInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tweetInfoService.remove('' + id);
  }
}
