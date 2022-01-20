/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql';
import Ticket from './Ticket';

@ObjectType()
@Entity()
export default class Project {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    picture: string;

    @Field()
    @Column()
    start_date: Date;

    @Field()
    @Column()
    end_date: Date;

    @OneToMany(() => Ticket, ticket => ticket.project)
    tickets : Ticket[]


}
