/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Field, ID, ObjectType, Int } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as bcrypt  from "bcrypt";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Comment from "./Comment";
import Notification from "./Notification";


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

    @Field(type => Int)
    @Column()
    age: number;

    @Column()
    password: string

    @OneToMany(() => Notification, notification => notification.user)
    notifications : Notification[]

    @OneToMany(() => Comment, comment => comment.user)
    comments : Comment[]

}
