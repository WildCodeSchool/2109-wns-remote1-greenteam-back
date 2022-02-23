/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Mutation, Arg } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import User from '../entity/User';
import UserResponse from '../types/UserResponse';

@Resolver(User)
export default class AuthResolver {
  @Mutation((returns) => UserResponse)
  async login(@Arg('email') email: string, @Arg('password') password: string) {
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
    return {
      statusCode: 201,
      message: 'Connection réussie',
      token,
    };
  }

  @Mutation((returns) => UserResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('lastname') lastname: string,
    @Arg('firstname') firstname: string,
    @Arg('age') age: number
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
      return {
        statusCode: 201,
        message: 'Merci pour votre inscription',
        token,
      };
    } catch (e) {
      return e;
    }
  }
}
