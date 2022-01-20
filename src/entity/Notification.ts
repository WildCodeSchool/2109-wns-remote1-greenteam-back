/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql'
import User from "./User";

@ObjectType()
@Entity()
export default class Notification {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id: number
=======
    idNotification: number
>>>>>>> ad6780cf97754d6ee7b419f4b6a4da5b3ad6d377

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
