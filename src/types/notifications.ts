import {ObjectType, Field, ID} from 'type-graphql'


@ObjectType()
export default class Notification {

    @Field(type => ID)
    id: string

    @Field()
    title: string

    @Field()
    description: string

    @Field()
    date: Date
}