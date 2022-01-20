/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import { getRepository, Repository } from 'typeorm';
import Project from '../entity/Project';
import Ticket from '../entity/Ticket';

/*
=> Get a project by id
=> Get all current projects
=> Get all past projects
=> Get all future projects
=> Get all projects
=> Create a project
=> Delete a project
=> Delete all past projects
=> Delete all future projects
=> Delete all current projects
=> Delete all projects
=> Update a project
*/

@Resolver(Project)
export default class ProjectResolver {

    @Query(returns => Project)
    getOneProject(@Arg("id") id:number){
        const projectRepository:Repository<Project> = getRepository(Project);
        const project = projectRepository.createQueryBuilder("project")
        .where("project.idProject = :id", {id}).getOne();
        return project;
    }

    @Query(returns => [Project])
    getAllCurrentProjects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project")
        .where("project.start_date IS NOT NULL" && "project.end_date IS NOT NULL" && "project.start_date<Date.now()" &&
        "project.end_date>Date.now()").getMany();
        return projects;
    }

    @Query(returns => [Project])
    getAllPastProjects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project")
        .where("project.end_date IS NOT NULL" && "project.end_date<Date.now()").getMany();
        return projects;
    }

    @Query(returns => [Project])
    getAllFutureprojects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project")
        .where("project.start_date IS NOT NULL" && "project.start_date>Date.now()").getMany();
        return projects;
    }

    @Query(returns => [Project])
    getAllprojects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project").getMany();
        return projects;
    }

    @Mutation(returns => Project)
    createproject(@Arg("title") title:string, @Arg("description") description:string, @Arg("picture") picture:string,
    @Arg("start_date") start_date:Date, @Arg("end_date") end_date:Date, @Arg("tickets") tickets:Ticket[]){
        const projectRepository:Repository<Project> = getRepository(Project);
        const project = projectRepository.create({
            title,
            description,
            picture,
            start_date,
            end_date,
            tickets
        });
        return projectRepository.save(project);
    }

    @Mutation(returns => Project)
    async deleteProject(@Arg("id") id:number){
        const projectRepository:Repository<Project> = getRepository(Project);
        const project = projectRepository.createQueryBuilder("project")
        .where("project.id = :id", {id}).getOne();
        projectRepository.delete(await project);
        return project;
    }

    @Mutation(returns => [Project])
    async deleteAllPastProjects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project")
        .where("project.end_date IS NOT NULL" && "project.end_date<Date.now()").getMany();
        (await projects).forEach(async (project) => {
            projectRepository.delete(project);
        });
        return projects;
    }

    @Mutation(returns => [Project])
    async deleteAllFutureprojects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project")
        .where("project.start_date IS NOT NULL" && "project.start_date>Date.now()").getMany();
        (await projects).forEach(async (project) => {
            projectRepository.delete(project);
        });
        return projects;
    }

    @Mutation(returns => [Project])
    async deleteAllCurrentprojects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project")
        .where("project.start_date IS NOT NULL" && "project.end_date IS NOT NULL" && "project.start_date<Date.now()" &&
        "project.end_date>Date.now()").getMany();
        (await projects).forEach(async (project) => {
            projectRepository.delete(project);
        });
        return projects;
    }

    @Mutation(returns => [Project])
    async deleteAllprojects(){
        const projectRepository:Repository<Project> = getRepository(Project);
        const projects = projectRepository.createQueryBuilder("project").getMany();
        (await projects).forEach(async (project) => {
            projectRepository.delete(project);
        });
        return projects;
    }

    @Mutation(returns => Project)
    async updateproject(@Arg("id") id:number, @Arg("title") title:string, @Arg("description") description:string,
    @Arg("picture") picture:string, @Arg("start_date") start_date:Date, @Arg("end_date") end_date:Date,
    @Arg("tickets") tickets:Ticket[]){
        const projectRepository:Repository<Project> = getRepository(Project);
        const project = projectRepository.createQueryBuilder("project")
        .where("project.id = :id", {id}).getOne();
        (await project).title = title;
        (await project).description = description;
        (await project).picture = picture;
        (await project).start_date = start_date;
        (await project).end_date = end_date;
        (await project).tickets = tickets;
        projectRepository.save(await project);
        return project;
    }

}