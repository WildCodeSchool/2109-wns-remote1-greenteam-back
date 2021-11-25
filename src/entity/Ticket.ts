import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Project from "./Project";
import Sprint from "./Sprint";

@ObjectType()
@Entity()
export default class Ticket{

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
    estimated_timeframe: Date

    @Field()
    @Column()
    time_spent: Date
    
    @Field()
    @Column()
    status: number

    @ManyToOne(() => Sprint, sprint => sprint.id)
    sprint: Sprint

    @ManyToOne(() => Project, project => project.id)
    project: Project

}