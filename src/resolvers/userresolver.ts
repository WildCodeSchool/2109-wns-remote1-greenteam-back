/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import { getRepository, Repository } from 'typeorm';
import Comment from '../entity/Comment';
import Notification from '../entity/Notification';
import User from '../entity/User';

/*
=> Get a user by mail
=> Get all users
=> Get all notifications by user => Notification
=> Get all comments by user => Comment
=> Add a user
=> Update a user
=> Delete a user
*/

@Resolver(User)
export default class UserResolver {

    @Query(returns => User)
    getOneUser(@Arg("email") email:string){
        const userRepository:Repository<User> = getRepository(User);
        const user = userRepository.createQueryBuilder("user")
        .where("user.email = :email", {email}).getOne();
        return user;
    }

    @Query(returns => [User])
    getAllUsers(){
        const userRepository:Repository<User> = getRepository(User);
        const users = userRepository.createQueryBuilder("user").getMany();
        return users;
    }

    @Query(returns => [Notification])
    getAllNotificationsByUser(@Arg("email") email:string){
        const notificationRepository:Repository<Notification> = getRepository(Notification);
        const notifications = notificationRepository.createQueryBuilder("notification")
        .where("notification.user.email = :email", {email}).getMany();
        return notifications;
    }

    @Query(returns => [Comment])
    getAllCommentsByUser(@Arg("email") email:string){
        const commentRepository:Repository<Comment> = getRepository(Comment);
        const comments = commentRepository.createQueryBuilder("comment")
        .where("comment.user.email = :email", {email}).getMany();
        return comments
    }

    @Mutation(returns => User)
    async addUser(@Arg("firstName") firstName:string, @Arg("lastName") lastName:string, @Arg("email") email:string,
    @Arg("age") age:number){
        const userRepository:Repository<User> = getRepository(User);
        const user = userRepository.create({
            firstName,
            lastName,
            email,
            age
        });
        await userRepository.save(user);
        return user;
    }

    @Mutation(returns => User)
    async updateUser(@Arg("email") email:string, @Arg("firstName") firstName:string, @Arg("lastName") lastName:string,
    @Arg("age") age:number){
        const userRepository:Repository<User> = getRepository(User);
        const user = userRepository.createQueryBuilder("user")
        .where("user.email = :email", {email}).getOne();
        (await user).firstName = firstName;
        (await user).lastName = lastName;
        (await user).age = age;
        await userRepository.save(await user);
        return user;
    }

    @Mutation(returns => User)
    async deleteUser(@Arg("email") email:string){
        const userRepository:Repository<User> = getRepository(User);
        const user = userRepository.createQueryBuilder("user")
        .where("user.email = :email", {email}).getOne();
        await userRepository.remove(await user);
        return user;
    }
    

}