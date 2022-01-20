/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Project from "./Project";
import User from "./User";

export enum UserRole {
    DEVELOPER = "developer",
    ADMIN = "admin",
    PRODUCT_MANAGER = "project_manager"
}


@ObjectType()
@Entity()
export default class UserToProject {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    idUserToProject: number

    @Field()
    @ManyToOne(() => User, user => user.idUser)
    user: number

    @Field()
    @ManyToOne(() => Project, project => project.id)
    project: number

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.DEVELOPER
    })
    role: UserRole


}