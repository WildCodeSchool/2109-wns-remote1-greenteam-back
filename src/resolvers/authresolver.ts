import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import { Context } from 'apollo-server-core';
import * as Cookie from "js-cookie";
import User from '../entity/User';
import UserResponse from '../types/UserResponse';
import ContextResponse from '../types/ContextResponse';






@Resolver(User)
export default class AuthResolver {
  @Mutation(() => UserResponse)
  // eslint-disable-next-line class-methods-use-this
  async login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: ContextResponse) {

    if (!email || !password)
      return {
        statusCode: 400,
        message: 'Veuillez remplir correctement le formulaire',
      };

    const userRepository: Repository<User> = getRepository(User);
    const userToFind = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!userToFind)
      return {
        statusCode: 400,
        message: "Aucun utilisateur avec cet email n'existe chez nous.",
      };

    if (!(await userToFind.verifyPassword(password)))
      return {
        statusCode: 400,
        message: 'Le mot de passe saisi est incorrect',
      };

    // @ts-ignore
    const token = userToFind.generateToken();

    const cookie = `user-token=${token}; HttpOnly`
     ctx.res.setHeader("Set-Cookie", [cookie])

    return {
      statusCode: 201,
      message: 'Connection réussie',
    };
  }

  @Mutation(() => UserResponse)
  // eslint-disable-next-line class-methods-use-this
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('lastname') lastname: string,
    @Arg('firstname') firstname: string,
    @Arg('age') age: number,
    @Ctx() ctx:Context
  ) {


    if (!email || !password || !lastname || !firstname || !age)
      throw new Error('Veuillez remplir correctement le formulaire');

    const userRepository: Repository<User> = getRepository(User);
    const userToFind = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (userToFind) throw new Error('Cet email est déjà utilisée.');

    try {
      const user = new User();
      user.firstName = firstname;
      user.lastName = lastname;
      user.email = email;
      user.notifications = [];
      user.comments = [];
      user.password = await user.encryptPassword(password);
      await userRepository.save(user);

      // @ts-ignore
      const token = user.generateToken();
      ctx['result'].cookie('user-token', token)
      return {
        statusCode: 201,
        message: 'Merci pour votre inscription',
      };
    } catch (e) {
      return e;
    }
  }

  @Query(() => UserResponse)
  async logout(@Ctx() ctx: ContextResponse){

    try {
      ctx.res.clearCookie("user-token")
      return {
        statusCode: 201,
        message: 'Déconnexion',
      };
    }catch (e) {
      return {
        statusCode: 400,
        message: 'Erreur lors de la déconnexion',
      };
    }

  }
}
