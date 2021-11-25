import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
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

    @Field()
    @Column()
    age: number;

    @OneToMany(() => Notification, notification => notification.user)
    notifications : Notification[]

}
