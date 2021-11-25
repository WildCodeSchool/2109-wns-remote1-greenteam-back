import { ObjectType, Field, ID } from "type-graphql";
import Ticket from "./ticket";

export default class sprint{

    @Field(type => ID)
    id: string

    @Field()
    start_date: Date

    @Field()
    end_date: Date

    @Field(type => [Ticket])
    tickets: Ticket[]
}