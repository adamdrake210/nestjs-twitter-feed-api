import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @Column()
  name: string;

  @JoinTable()
  @ManyToMany((type) => Topic, (topic) => topic.tweets, {
    cascade: true,
  })
  topics: Topic[];
}
