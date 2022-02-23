/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import User from './User';

@ObjectType()
@InputType('NotificationInput')
@Entity()
export default class Notification {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  date: Date;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
