import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TweetinfoModule } from './tweetinfo/tweetinfo.module';
import { TweetingModule } from './tweeting/tweeting.module';
import * as Joi from '@hapi/joi';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenaiModule } from './openai/openai.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true, // disable for prod
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    TweetinfoModule,
    TweetingModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
