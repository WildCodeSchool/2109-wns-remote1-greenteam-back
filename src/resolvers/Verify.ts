import { Query, Resolver } from 'type-graphql';
import Cookie from 'js-cookie';
import * as jwt from "jsonwebtoken"
import UserResponse from '../types/UserResponse';
import User from '../entity/User';


@Resolver()
export default class verifyResolver{

  @Query(()=> UserResponse || User)
  async  verify(){

    let token = Cookie.get("user-token")
    let user = jwt.verify(token, "collabee")
    if(user) return user
    return {
      statusCode: 400,
      message: "Accés refusé.",
    }
  }
}