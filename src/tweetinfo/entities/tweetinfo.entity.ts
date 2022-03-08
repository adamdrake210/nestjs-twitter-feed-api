import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TweetInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  tweettopics: string[];

  @Column('text', { array: true })
  tweetquestions: string[];

  @OneToOne(() => User, (user: User) => user.tweetinfo)
  user: User;
}
