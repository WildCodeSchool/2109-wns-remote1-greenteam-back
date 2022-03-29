import { Field, ID, ObjectType, InputType } from 'type-graphql';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Comment from './Comment';
import Notification from './Notification';

@ObjectType()
@InputType('UserInput')
@Entity()
export default class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Length(4, 100)
  @Column()
  email: string;

  @Field()
  @Column()
  admin: boolean;

  @Column()
  password: string;

  @Field((type) => [Notification])
  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Notification[];

  @Field((type) => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  async encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  generateToken() {
    const payload = {
      id: this.id,
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName,
      notifications: this.notifications,
    };

    const token = jwt.sign(payload, 'collabee', {
      algorithm: 'HS256',
      expiresIn: '1y',
    });
    console.log(token);
    return token;
  }
}
