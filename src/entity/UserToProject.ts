/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Project from './Project';
import User from './User';

export enum UserRole {
  DEVELOPER = 'developer',
  PRODUCT_MANAGER = 'project_manager',
}

registerEnumType(UserRole, {
  name: 'UserRole', // this one is mandatory
  description: 'The basic roles', // this one is optional
});

@ObjectType()
@InputType('UserToProjectInput')
@Entity()
export default class UserToProject {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Field((type) => Project)
  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @Field((type) => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEVELOPER,
  })
  role: UserRole;
}
