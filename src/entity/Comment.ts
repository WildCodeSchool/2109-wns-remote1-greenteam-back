/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Ticket from './Ticket';
import User from './User';

@ObjectType()
@InputType('CommentInput')
@Entity()
export default class Comment {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Field((type) => Ticket)
  @ManyToOne(() => Ticket, (ticket) => ticket.comments)
  ticket: Ticket;

  @Field()
  @Column()
  content: string;
}
