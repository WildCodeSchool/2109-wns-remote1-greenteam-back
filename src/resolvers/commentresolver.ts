/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import Comment from '../entity/Comment';
import Ticket from '../entity/Ticket';
import User from '../entity/User';

/*
=> Get a comment by id
=> Get all comments by ticket
=> Create a comment
=> Delete a comment
=> Delete all comments by user
=> Update a comment
*/

@Resolver(Comment)
export default class CommentResolver {
  @Query((returns) => Comment)
  getOneComment(@Arg('id') id: number) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comment = commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .getOne();
    return comment;
  }

  @Query((returns) => [Comment])
  getAllCommentsByTicket(@Arg('ticket', (returns) => Ticket) ticket: number) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comments = commentRepository
      .createQueryBuilder('comment')
      .where('comment.ticket = :ticket', { ticket })
      .getMany();
    return comments;
  }

  @Mutation((returns) => Comment)
  createComment(
    @Arg('user', (returns) => User) user: User,
    @Arg('ticket', (returns) => Ticket) ticket: Ticket,
    @Arg('content') content: string
  ) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comment = commentRepository.create({
      user,
      ticket,
      content,
    });
    return commentRepository.save(comment);
  }

  @Mutation((returns) => Comment)
  async deleteComment(@Arg('id') id: number) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comment = commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .getOne();
    return commentRepository.remove(await comment);
  }

  @Mutation((returns) => [Comment])
  async deleteAllCommentsByUser(@Arg('user', (returns) => User) user: User) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comments = commentRepository
      .createQueryBuilder('comment')
      .where('comment.user = :user', { user })
      .getMany();
    (await comments).forEach(async (comment) => {
      await commentRepository.remove(comment);
    });
    return comments;
  }

  @Mutation((returns) => Comment)
  async updateComment(
    @Arg('id') id: number,
    @Arg('content') content: string,
    @Arg('user', (returns) => User) user: User
  ) {
    const commentRepository: Repository<Comment> = getRepository(Comment);
    const comment = commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .getOne();
    (await comment).content = content;
    return comment;
  }
}
