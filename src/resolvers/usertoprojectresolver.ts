/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import {
  createQueryBuilder,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import Project from '../entity/Project';
import User from '../entity/User';
import UserToProject, { UserRole } from '../entity/UserToProject';
import UserWithRole from '../entity/UserWithRole';

/*
=> Get all users by role
=> Get all users by project
=> Get all users by project and role 
=> Get all projects by user
=> Get all roles by user
=> Get all projects by user and role
=> Add a user to a project
=> Remove a user from a project
=> Update role of a user by project
=> Delete role of a user by project
*/

@Resolver(UserToProject)
export default class UserToProjectResolver {
  @Query((returns) => [User])
  getAllUsersByRole(@Arg('role', (returns) => UserRole) role: UserRole) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const users = usertoprojectRepository
      .createQueryBuilder('usertoproject')
      .where('usertoproject.role = :role', { role })
      .getMany();
    return users;
  }

  @Query((returns) => [UserWithRole])
  async getAllUsersByProject(@Arg('projectId') projectId: string) {
    const userRepository: Repository<User> = getRepository(User);
    const sql = userRepository
      .createQueryBuilder('user')
      .select('user.*')
      .addSelect('utp.role', 'role')
      .leftJoin('user_to_project', 'utp', 'utp.userId = user.id')
      .leftJoin('project', 'project', 'project.id = utp.projectId')
      .where('project.id = :projectId', { projectId })
      .getSql();
    const users = await getConnection().query(sql, [projectId]);
    return users;
  }

  @Query((returns) => [User])
  getAllUsersByProjectAndRole(
    @Arg('project', (returns) => Project) project: Project,
    @Arg('role', (returns) => UserRole) role: UserRole
  ) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const users = usertoprojectRepository
      .createQueryBuilder('usertoproject')
      .where('usertoproject.project = :project', { project })
      .andWhere('usertoproject.role = :role', { role })
      .getMany();
    return users;
  }

  @Query((returns) => [Project])
  getAllProjectsByUser(@Arg('user', (returns) => User) user: User) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const usertoprojectquery = usertoprojectRepository.find({
      where: { user },
      relations: ['user', 'project'],
    });
    const projects = usertoprojectquery.then((p) =>
      p.map((usertoproject) => usertoproject.project)
    );
    return projects;
  }

  // @Query((returns) => [User.role])
  // getAllRolesByUser(@Arg('user', (returns) => User) user: User) {
  //   const usertoprojectRepository: Repository<UserToProject> =
  //     getRepository(UserToProject);
  //   const roles = usertoprojectRepository
  //     .createQueryBuilder('usertoproject')
  //     .where('usertoproject.user = :user', { user })
  //     .getMany();
  //   return roles;
  // }

  @Query((returns) => [Project])
  getAllProjectsByUserAndRole(
    @Arg('user', (returns) => User) user: User,
    @Arg('role', (returns) => UserRole) role: UserRole
  ) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const projects = usertoprojectRepository
      .createQueryBuilder('usertoproject')
      .where('usertoproject.user = :user', { user })
      .andWhere('usertoproject.role = :role', { role })
      .getMany();
    return projects;
  }

  @Mutation((returns) => UserToProject)
  addUserToProject(
    @Arg('user', (returns) => User) user: User,
    @Arg('project', (returns) => Project) project: Project,
    @Arg('role', (returns) => UserRole) role: UserRole
  ) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    if (!usertoprojectRepository.findOne({ where: { user, project } })) {
      const usertoproject = usertoprojectRepository.create({
        user,
        project,
        role,
      });
      return usertoprojectRepository.save(usertoproject);
    }
    return new Error('User is already in project');
  }

  @Mutation((returns) => UserToProject)
  async removeUserFromProject(
    @Arg('user', (returns) => User) user: User,
    @Arg('project', (returns) => Project) project: Project
  ) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const usertoproject = usertoprojectRepository
      .createQueryBuilder('usertoproject')
      .where('usertoproject.user = :user', { user })
      .andWhere('usertoproject.project = :project', { project })
      .getOne();
    usertoprojectRepository.remove(await usertoproject);
    return usertoproject;
  }

  @Mutation((returns) => UserToProject)
  async updateRoleOfUserByProject(
    @Arg('user', (returns) => User) user: User,
    @Arg('project', (returns) => Project) project: Project,
    @Arg('role', (returns) => UserRole) role: UserRole
  ) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const usertoproject = usertoprojectRepository
      .createQueryBuilder('usertoproject')
      .where('usertoproject.user = :user', { user })
      .andWhere('usertoproject.project = :project', { project })
      .getOne();
    (await usertoproject).role = role;
    usertoprojectRepository.save(await usertoproject);
    return usertoproject;
  }

  @Mutation((returns) => UserToProject)
  async deleteRoleOfUserByProject(
    @Arg('user', (returns) => User) user: User,
    @Arg('project', (returns) => Project) project: Project
  ) {
    const usertoprojectRepository: Repository<UserToProject> =
      getRepository(UserToProject);
    const usertoproject = usertoprojectRepository
      .createQueryBuilder('usertoproject')
      .where('usertoproject.user = :user', { user })
      .andWhere('usertoproject.project = :project', { project })
      .getOne();
    usertoprojectRepository.remove(await usertoproject);
    return usertoproject;
  }
}
