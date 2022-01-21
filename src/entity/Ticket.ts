/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import Project from './Project';
import Sprint from './Sprint';
import Comment from './Comment';

@ObjectType()
@InputType('TicketInput')
@Entity()
export default class Ticket {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  idTicket: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  estimated_timeframe: Date;

  @Field()
  @Column()
  time_spent: Date;

  @Field()
  @Column()
  status: number;

  @Field((type) => Sprint)
  @ManyToOne(() => Sprint, (sprint) => sprint.tickets)
  sprint: Sprint;

  @Field((type) => Project)
  @ManyToOne(() => Project, (project) => project.tickets)
  project: Project;

  @Field((type) => [Comment])
  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];
}
