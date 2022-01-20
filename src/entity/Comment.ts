import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Ticket from "./Ticket";
import User from "./User";


@ObjectType()
@Entity()
export default class Comment {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    idComment: number

    @ManyToOne(() => User, user => user.idUser)
    user: User

    @ManyToOne(() => Ticket, ticket => ticket.idTicket)
    ticket : Ticket

    @Field()
    @Column()
    comment: string
}
