/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Notification from "./Notification";
import Comment from "./Comment";

@ObjectType()
@Entity()
export default class User {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    idUser: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string

    @Field()
    @Column()
    age: number;

    @OneToMany(() => Notification, notification => notification.user)
    notifications : Notification[]

    @OneToMany(() => Comment, comment => comment.user)
    comments : Comment[]

}
