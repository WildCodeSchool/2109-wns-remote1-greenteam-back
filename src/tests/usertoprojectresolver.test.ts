/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository } from 'typeorm';
import Project from '../entity/Project';
import User from '../entity/User';
import UserToProject, { UserRole } from '../entity/UserToProject';

describe('UserToProject Resolver', () => {
  describe('addUserToProject', () => {
    it('add user to project', async () => {
      const user: User = {
        id: 10,
        firstName: 'Nora',
        lastName: 'Lefeuvre',
        email: 'nora.lefeuvre@gmail.com',
        password: '',
        notifications: [],
        comments: [],
        encryptPassword(password: string): Promise<string> {
          throw new Error('Function not implemented.');
        },
        verifyPassword(password: string): Promise<boolean> {
          throw new Error('Function not implemented.');
        },
        generateToken() {
          throw new Error('Function not implemented.');
        },
      };
      const project: Project = {
        id: 10,
        title: 'Project',
        description: 'Description',
        picture: 'picture.jpg',
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
        tickets: [],
      };
      const role = UserRole.DEVELOPER;
      const usertoprojectRepository = getRepository(UserToProject);
      const usertoproject = usertoprojectRepository.create({
        user,
        project,
        role,
      });
      usertoprojectRepository.save(usertoproject).then((anusertoproject) => {
        expect(anusertoproject).toBeDefined();
        expect(anusertoproject.user).toBe(user);
        expect(anusertoproject.project).toBe(project);
        expect(anusertoproject.role).toBe(role);
      });
    });

    it('add user in project if user is already in', async () => {
      const user: User = {
        id: 10,
        firstName: 'Nora',
        lastName: 'Lefeuvre',
        email: 'nora.lefeuvre@gmail.com',
        password: '',
        notifications: [],
        comments: [],
        encryptPassword(password: string): Promise<string> {
          throw new Error('Function not implemented.');
        },
        verifyPassword(password: string): Promise<boolean> {
          throw new Error('Function not implemented.');
        },
        generateToken() {
          throw new Error('Function not implemented.');
        },
      };
      const project: Project = {
        id: 10,
        title: 'Project',
        description: 'Description',
        picture: 'picture.jpg',
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
        tickets: [],
      };
      const role = UserRole.DEVELOPER;
      const usertoprojectRepository = getRepository(UserToProject);
      const usertoproject = usertoprojectRepository.create({
        user,
        project,
        role,
      });
      usertoprojectRepository.save(usertoproject).then((anusertoproject) => {
        expect(anusertoproject).toBeDefined();
        expect(anusertoproject.user).toBe(user);
        expect(anusertoproject.project).toBe(project);
        expect(anusertoproject.role).toBe(role);
        expect(usertoprojectRepository.save(usertoproject)).toThrowError();
      });
    });
  });

  describe('getAllProjectsByUser', () => {
    it('get all projects by user', async () => {
      const user: User = {
        id: 10,
        firstName: 'Nora',
        lastName: 'Lefeuvre',
        email: 'nora.lefeuvre@gmail.com',
        password: '',
        notifications: [],
        comments: [],
        encryptPassword(password: string): Promise<string> {
          throw new Error('Function not implemented.');
        },
        verifyPassword(password: string): Promise<boolean> {
          throw new Error('Function not implemented.');
        },
        generateToken() {
          throw new Error('Function not implemented.');
        },
      };
      const project: Project = {
        id: 10,
        title: 'Project',
        description: 'Description',
        picture: 'picture.jpg',
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
        tickets: [],
      };
      const role = UserRole.DEVELOPER;
      const usertoprojectRepository = getRepository(UserToProject);
      const usertoproject = usertoprojectRepository.create({
        user,
        project,
        role,
      });
      const usertoprojectquery = usertoprojectRepository.find({
        where: { user },
        relations: ['user', 'project'],
      });
      const projects = usertoprojectquery.then((p) =>
        p.map((anusertoproject) => anusertoproject.project)
      );
      projects.then((aproject) => {
        expect(aproject).toBeDefined();
        expect(aproject.length).toBe(1);
        expect(aproject[0].title).toBe('Project');
        expect(aproject[0].description).toBe('Description');
        expect(aproject[0].picture).toBe('picture.jpg');
        expect(aproject[0].start_date).toBeDefined();
        expect(aproject[0].end_date).toBeDefined();
        expect(aproject[0].tickets.length).toBe(0);
      });
    });
  });
});
