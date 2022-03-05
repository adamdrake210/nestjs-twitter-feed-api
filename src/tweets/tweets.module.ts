import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Tweet } from './entities/tweet.entity';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, Topic])],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
