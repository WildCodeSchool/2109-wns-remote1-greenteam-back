/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import Ticket from './Ticket';

@ObjectType()
@InputType('SprintInput')
@Entity()
export default class Sprint {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  idSprint: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field((type) => [Ticket])
  @OneToMany(() => Ticket, (ticket) => ticket.sprint)
  tickets: Ticket[];
}
