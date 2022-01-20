/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql'
import User from "./User";
import Ticket from "./Ticket";

@ObjectType()
@Entity()
export default class Comment {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    content: string

    @ManyToOne(() => User, user => user.idUser)
    user: User

    @ManyToOne(() => Ticket, ticket => ticket.id)
    ticket: Ticket

}
