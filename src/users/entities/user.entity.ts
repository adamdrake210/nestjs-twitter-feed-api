import { Tweet } from 'src/tweets/entities/tweet.entity';
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
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  twitterhandle: string;

  @OneToOne(() => Tweet)
  @JoinColumn()
  tweet: Tweet;
}
