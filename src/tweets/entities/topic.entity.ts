import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Tweet, (tweet) => tweet.topics)
  tweets: Tweet[];
}
