/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import { getRepository, Repository } from 'typeorm';
import User from '../entity/User';
import UserToProject, { UserRole } from '../entity/UserToProject';

/*
=> Get all users by role
=> Get all users by project
=> Get all users by project and role 
=> Get all projects by user
=> Get all roles by user
=> Get all projects by user and role
=> Add a user to a project
=> Remove a user from a project
=> Add a role to a user in a project
=> Update role of a user by project
=> Delete role of a user by project
*/

@Resolver(UserToProject)
export default class UserToProjectResolver {

    @Query(returns => [User])
    getAllUsersByRole(@Arg("role") role:UserRole){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const users = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.role = :role", {role}).getMany();
        return users;
    }

    @Query(returns => [User])
    getAllUsersByProject(@Arg("project") project:number){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const users = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.project = :project", {project}).getMany();
        return users;
    }

    @Query(returns => [User])
    getAllUsersByProjectAndRole(@Arg("project") project:number, @Arg("role") role:UserRole){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const users = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.project = :project", {project}).andWhere("usertoproject.role = :role", {role}).getMany();
        return users;
    }

    @Query(returns => [User])
    getAllProjectsByUser(@Arg("user") user:number){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const projects = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).getMany();
        return projects;
    }

    @Query(returns => [User])
    getAllRolesByUser(@Arg("user") user:number){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const roles = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).getMany();
        return roles;
    }

    @Query(returns => [User])
    getAllProjectsByUserAndRole(@Arg("user") user:number, @Arg("role") role:UserRole){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const projects = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).andWhere("usertoproject.role = :role", {role}).getMany();
        return projects;
    }

    @Mutation(returns => User)
    addUserToProject(@Arg("user") user:number, @Arg("project") project:number, @Arg("role") role:UserRole){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const usertoproject = usertoprojectRepository.create({
            user,
            project,
            role
        });
        usertoprojectRepository.save(usertoproject);
        return usertoproject;
    }

    @Mutation(returns => User)
    async removeUserFromProject(@Arg("user") user:number, @Arg("project") project:number){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const usertoproject = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).andWhere("usertoproject.project = :project", {project}).getOne();
        usertoprojectRepository.remove(await usertoproject);
        return usertoproject;
    }

    @Mutation(returns => User)
    async addRoleToUserByProject(@Arg("user") user:number, @Arg("project") project:number, @Arg("role") role:UserRole){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const usertoproject = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).andWhere("usertoproject.project = :project", {project}).getOne();
        (await usertoproject).role = role;
        usertoprojectRepository.save(await usertoproject);
        return usertoproject;
    }

    @Mutation(returns => User)
    async updateRoleOfUserByProject(@Arg("user") user:number, @Arg("project") project:number, @Arg("role") role:UserRole){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const usertoproject = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).andWhere("usertoproject.project = :project", {project}).getOne();
        (await usertoproject).role = role;
        usertoprojectRepository.save(await usertoproject);
        return usertoproject;
    }

    @Mutation(returns => User)
    async deleteRoleOfUserByProject(@Arg("user") user:number, @Arg("project") project:number){
        const usertoprojectRepository:Repository<UserToProject> = getRepository(UserToProject);
        const usertoproject = usertoprojectRepository.createQueryBuilder("usertoproject")
        .where("usertoproject.user = :user", {user}).andWhere("usertoproject.project = :project", {project}).getOne();
        usertoprojectRepository.remove(await usertoproject);
        return usertoproject;
    }


}