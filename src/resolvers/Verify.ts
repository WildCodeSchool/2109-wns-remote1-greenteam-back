import { Query, Resolver, Ctx } from 'type-graphql';
import Cookie from 'js-cookie';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';
import UserResponse from '../types/UserResponse';
import User from '../entity/User';
import ContextResponse from '../types/ContextResponse';

@Resolver()
export default class verifyResolver {
  @Query(() => User)
  async verifyUser(@Ctx() ctx: ContextResponse) {
    try {
      const token = ctx.req.cookies['user-token'];
      const user = jwt.verify(token, 'collabee');
      return user;
    } catch (err) {
      throw new AuthenticationError('Accés refusé.');
    }
  }
}
