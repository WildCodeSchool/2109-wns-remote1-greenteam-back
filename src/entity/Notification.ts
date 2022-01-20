/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql'
import User from "./User";

@ObjectType()
@Entity()
export default class Notification {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    description: string

    @Field()
    @Column()
    date: Date

    @ManyToOne(() => User, user => user.idUser)
    user: User

}
