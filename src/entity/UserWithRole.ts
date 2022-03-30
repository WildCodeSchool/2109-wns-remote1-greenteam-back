import { Field, ObjectType } from 'type-graphql';

import User from './User';

@ObjectType()
export default class UserWithRole extends User {
  @Field()
  role: string;
}
