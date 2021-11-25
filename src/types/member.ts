import {ObjectType, Field, ID} from 'type-graphql'
import Notification from './notifications'

@ObjectType()
export default class User {

    @Field(type => ID)
    id: string

    @Field()
    last_name : string

    @Field()
    first_name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field()
    picture: string

    @Field(type => [Notification])
    notifications: Notification[]

}