/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import { getRepository, Repository } from 'typeorm';
import Project from '../entity/Project';
import Sprint from '../entity/Sprint';
import Ticket from '../entity/Ticket';

/*
=> Get a ticket by id
=> Get all tickets by sprint
=> Get all tickets by project
=> Get all tickets by status
=> Get all tickets
=> Create a ticket
=> Delete a ticket
=> Update a ticket
*/

@Resolver(Ticket)
export default class TicketResolver {

    @Query(returns => Ticket)
    getOneProject(@Arg("id") id:number){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const ticket = ticketRepository.createQueryBuilder("ticket")
        .where("ticket.id = :id", {id}).getOne();
        return ticket;
    }

    @Query(returns => [Ticket])
    getAllTicketsBySprint(@Arg("sprint") sprint:number){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const tickets = ticketRepository.createQueryBuilder("ticket")
        .where("ticket.sprint = :sprint", {sprint}).getMany();
        return tickets;
    }

    @Query(returns => [Ticket])
    getAllTicketsByProject(@Arg("project") project:number){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const tickets = ticketRepository.createQueryBuilder("ticket")
        .where("ticket.project = :project", {project}).getMany();
        return tickets;
    }

    @Query(returns => [Ticket])
    getAllTicketsByStatus(@Arg("status") status:number){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const tickets = ticketRepository.createQueryBuilder("ticket")
        .where("ticket.status = :status", {status}).getMany();
        return tickets;
    }

    @Query(returns => [Ticket])
    getAllTickets(){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const tickets = ticketRepository.createQueryBuilder("ticket").getMany();
        return tickets;
    }

    @Mutation(returns => Ticket)
    createTicket(@Arg("title") title:string, @Arg("description") description:string,
    @Arg("estimated_timeframe") estimated_timeframe:Date, @Arg("time_spent") time_spent:Date, @Arg("status") status:number,
    @Arg("sprint") sprint:Sprint, @Arg("project") project:Project){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const ticket = ticketRepository.create({
            title,
            description,
            estimated_timeframe,
            time_spent,
            status,
            sprint,
            project
        });
        return ticketRepository.save(ticket);
    }

    @Mutation(returns => Ticket)
    async deleteTicket(@Arg("id") id:number){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const ticket = ticketRepository.createQueryBuilder("ticket")
        .where("ticket.id = :id", {id}).getOne();
        return ticketRepository.remove(await ticket);
    }

    @Mutation(returns => Ticket)
    async updateTicket(@Arg("id") id:number, @Arg("title") title:string, @Arg("description") description:string,
    @Arg("status") status:number, @Arg("sprint") sprint:Sprint, @Arg("project") project:Project){
        const ticketRepository:Repository<Ticket> = getRepository(Ticket);
        const ticket = ticketRepository.createQueryBuilder("ticket")
        .where("ticket.id = :id", {id}).getOne();
        (await ticket).title = title;
        (await ticket).description = description;
        (await ticket).status = status;
        (await ticket).sprint = sprint;
        (await ticket).project = project;
        return ticketRepository.save((await ticket));
    }

}