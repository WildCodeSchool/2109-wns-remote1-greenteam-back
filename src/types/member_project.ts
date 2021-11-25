
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class MemberProject {

    @Field(type => ID)
    id: string

    @Field()
    id_member: string

    @Field()
    role: number
}