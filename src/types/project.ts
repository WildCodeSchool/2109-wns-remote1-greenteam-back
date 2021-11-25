import {ObjectType, Field, ID} from 'type-graphql'
import MemberProject from './member_project'


@ObjectType()
export default class Project {

    @Field(type => ID)
    id: string

    @Field()
    title: string

    @Field()
    description: string

    @Field()
    picture: string

    @Field()
    start_date: Date

    @Field()
    end_date: Date

    @Field(type => [MemberProject])
    members_project: MemberProject[]

}