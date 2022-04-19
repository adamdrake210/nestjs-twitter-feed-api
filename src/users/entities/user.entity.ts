import { Exclude } from 'class-transformer';
import { TweetInfo } from 'src/tweetinfo/entities/tweetinfo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ unique: true })
  twitterhandle: string;

  @OneToOne(() => TweetInfo, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  tweetinfo: TweetInfo;
}
