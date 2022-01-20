import { Field, ID, ObjectType, Int } from "type-graphql";
import * as jwt from "jsonwebtoken"
import * as bcrypt  from "bcrypt"
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
    comments: Comment[]

    async encryptPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async verifyPassword(password: string){

        return await bcrypt.compare(password, this.password)
    }

    generateToken() {
        const payload = {
            id: this.idUser,
            email: this.email,
            lastName: this.lastName,
            firstName: this.firstName,
            age: this.age,
            notifications: this.notifications
        }

        const token = jwt.sign(payload, "collabee", { algorithm: 'HS256', expiresIn: "1y" })
        console.log(token)
        return token
    }

}
