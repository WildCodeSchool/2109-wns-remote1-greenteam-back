import {Field, ObjectType} from "type-graphql";



@ObjectType()
export default class UserResponse {

  @Field(type => Number)
  statusCode: number;

  @Field()
  message: string

  @Field(type => String, { nullable: true })
  token?: string
}