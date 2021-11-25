import { ObjectType, Field, ID } from "type-graphql";

export default class Ticket{

    @Field(type => ID)
    id: string

    @Field()
    title: string

    @Field()
    description: string

    @Field()
    estimated_timeframe: Date

    @Field()
    time_spent: Date
    
    @Field()
    status: number

    @Field()
    sprint: boolean

    
}