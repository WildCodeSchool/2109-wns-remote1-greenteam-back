/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import Comment from '../entity/Comment';
import Notification from '../entity/Notification';
import User from '../entity/User';

/*
=> Get a user by mail
=> Add a user
=> Update a user
=> Delete a user
*/

@Resolver(User)
export default class UserResolver {
  @Query((returns) => User)
  getOneUser(@Arg('email') email: string) {
    const userRepository: Repository<User> = getRepository(User);
    const user = userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  @Query((returns) => [User])
  getAllUsers() {
    const userRepository: Repository<User> = getRepository(User);
    const users = userRepository.createQueryBuilder('user').getMany();
    return users;
  }

  @Query((returns) => [Notification])
  getAllNotificationsByUser(@Arg('email') email: string) {
    const notificationRepository: Repository<Notification> =
      getRepository(Notification);
    const notifications = notificationRepository
      .createQueryBuilder('notification')
      .where('notification.user.email = :email', { email })
      .getMany();
    return notifications;
  }

  @Query((returns) => [Comment])
  getAllCommentsByUser(@Arg('email') email: string) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comments = commentRepository
      .createQueryBuilder('comment')
      .where('comment.user.email = :email', { email })
      .getMany();
    return comments;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Arg('email') email: string,
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('password') password: string,
  ) {
    const userRepository: Repository<User> = getRepository(User);
    const user = userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    (await user).firstName = firstname;
    (await user).lastName = lastname;
    (await user).password = password;
    await userRepository.save(await user);
    return user;
  }

  @Mutation((returns) => User)
  async deleteUser(@Arg('id', type => ID) id: number) {
    const repository = getRepository(User);
    const user = await repository.findOne({ id });
    await repository.delete({ id });
    return {
        ...user,
    };
  }
}
