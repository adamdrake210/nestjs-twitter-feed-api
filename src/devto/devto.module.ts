import { Module } from '@nestjs/common';
import { DevtoService } from './devto.service';
import { DevtoController } from './devto.controller';
import { HttpModule } from '@nestjs/axios';
import { TweetingService } from 'src/tweeting/tweeting.service';
import { OpenaiService } from 'src/openai/openai.service';

@Module({
  imports: [HttpModule],
  controllers: [DevtoController],
  providers: [DevtoService, TweetingService, OpenaiService],
})
export class DevtoModule {}
