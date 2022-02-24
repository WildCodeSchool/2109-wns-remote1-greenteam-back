import { getRepository } from 'typeorm';
import Project from '../entity/Project';
import User from '../entity/User';
import UserToProject, { UserRole } from '../entity/UserToProject';

describe('UserToProject Resolver', () => {
  describe('addUserToProject', () => {
    it('add user to project', async () => {
      const user: User = {
        id: 1,
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
        id: 1,
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
      return usertoprojectRepository
        .save(usertoproject)
        .then((usertoproject) => {
          expect(usertoproject).toBeDefined();
          expect(usertoproject.user).toBe(user);
          expect(usertoproject.project).toBe(project);
          expect(usertoproject.role).toBe(role);
        });
    });

    it('add user in project if user is already in', async () => {
      const user: User = {
        id: 1,
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
        id: 1,
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
      await usertoprojectRepository.save(usertoproject);
      usertoprojectRepository.save(usertoproject).then((usertoproject) => {
        expect(usertoproject).toBe('User is already in project');
      });
    });
  });

  describe('getAllProjectsByUser', () => {
    it('get all projects by user', async () => {
      const user: User = {
        id: 1,
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
        id: 1,
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
      await usertoprojectRepository.save(usertoproject);
      const usertoprojectquery = usertoprojectRepository.find({
        where: { user },
        relations: ['user', 'project'],
      });
      const projects = usertoprojectquery.then((p) =>
        p.map((usertoproject) => usertoproject.project)
      );
      return projects.then((projects) => {
        expect(projects).toBeDefined();
        expect(projects.length).toBe(1);
        expect(projects[0].title).toBe('Project');
        expect(projects[0].description).toBe('Description');
        expect(projects[0].picture).toBe('picture.jpg');
        expect(projects[0].start_date).toBeDefined();
        expect(projects[0].end_date).toBeDefined();
        expect(projects[0].tickets.length).toBe(0);
      });
    });
  });
});
