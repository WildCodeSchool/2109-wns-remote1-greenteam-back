import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Project from "./Project";
import Sprint from "./Sprint";
import Comment from "./Comment";

@ObjectType()
@Entity()
export default class Ticket{

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    idTicket: number

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    description: string

    @Field()
    @Column()
    estimated_timeframe: Date

    @Field()
    @Column()
    time_spent: Date
    
    @Field()
    @Column()
    status: number

    @ManyToOne(() => Sprint, sprint => sprint.idSprint)
    sprint: Sprint

    @ManyToOne(() => Project, project => project.idProject)
    project: Project

    @OneToMany(() => Comment, comment => comment.ticket)
    comments: Comment[]



}