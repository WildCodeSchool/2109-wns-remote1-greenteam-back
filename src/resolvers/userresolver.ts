import {Resolver, Query, Arg} from 'type-graphql'
import { getRepository, Repository } from 'typeorm';
import User from '../entity/User';

@Resolver(User)
export default class UserResolver {

    @Query(returns => User)
    getOneUser(@Arg("email") email:string){

        const userRepository:Repository<User> = getRepository(User)
        const user = userRepository.createQueryBuilder("user")
        .where("user.email = :email", {email: email}).getOne()

        return user
    }

}