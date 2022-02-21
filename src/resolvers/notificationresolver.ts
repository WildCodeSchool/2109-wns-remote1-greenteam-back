/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import Notification from '../entity/Notification';
import User from '../entity/User';

/*
=> Get a notification by id
=> Get all notifications by user
=> Create a notification
=> Delete a notification
=> Update a notification
*/

@Resolver(Notification)
export default class NotificationResolver {
  @Query((returns) => Notification)
  getOneNotification(@Arg('id', type => ID) id: string) {
    const notificationRepository: Repository<Notification> =
      getRepository(Notification);
    const notification = notificationRepository
      .createQueryBuilder('notification')
      .where('notification.idNotification = :id', { id })
      .getOne();
    return notification;
  }

  @Query((returns) => [Notification])
  getAllNotificationsByUser(@Arg('user', (returns) => [User]) user: User) {
    const notificationRepository: Repository<Notification> =
      getRepository(Notification);
    const notifications = notificationRepository
      .createQueryBuilder('notification')
      .where('notification.user = :user', { user })
      .getMany();
    return notifications;
  }

  @Mutation((returns) => Notification)
  createNotification(
    @Arg('user', (returns) => [User]) user: User,
    @Arg('title') title: string,
    @Arg('description') description: string
  ) {
    const notificationRepository: Repository<Notification> =
      getRepository(Notification);
    const notification = notificationRepository.create({
      user,
      title,
      description,
    });
    return notificationRepository.save(notification);
  }

  @Mutation((returns) => Notification)
  async deleteNotification(
    @Arg('user', (returns) => [User]) user: User,
    @Arg('id') id: number
  ) {
    const notificationRepository: Repository<Notification> =
      getRepository(Notification);
    const notification = notificationRepository
      .createQueryBuilder('notification')
      .where('notification.id = :id', { id })
      .getOne();
    return notificationRepository.remove(await notification);
  }

  @Mutation((returns) => Notification)
  updateNotification(
    @Arg('id') id: number,
    @Arg('user', (returns) => [User]) user: User,
    @Arg('title') title: string,
    @Arg('description') description: string
  ) {
    const notificationRepository: Repository<Notification> =
      getRepository(Notification);
    const notification = notificationRepository
      .createQueryBuilder('notification')
      .where('notification.id = :id', { id })
      .getOne();
    return notificationRepository.save({
      ...notification,
      user,
      title,
      description,
    });
  }
}
