/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import Sprint from '../entity/Sprint';
import Ticket from '../entity/Ticket';

/*
=> Get all tickets by sprint
=> Create a sprint
=> Delete a sprint
=> Delete all sprints
=> Update a sprint
*/

@Resolver(Sprint)
export default class SprintResolver {
  @Query((returns) => [Ticket])
  getAllTicketsBySprint(@Arg('sprint', (returns) => [Sprint]) sprint: Sprint) {
    const ticketRepository: Repository<Ticket> = getRepository(Ticket);
    const tickets = ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.sprint = :sprint', { sprint })
      .getMany();
    return tickets;
  }

  @Mutation((returns) => Sprint)
  createSprint(
    @Arg('start_date') start_date: Date,
    @Arg('end_date') end_date: Date,
    @Arg('tickets', (returns) => [Ticket]) tickets: Ticket[]
  ) {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprint = sprintRepository.create({
      start_date,
      end_date,
      tickets,
    });
    return sprintRepository.save(sprint);
  }

  @Mutation((returns) => Sprint)
  async deleteSprint(@Arg('id') id: number) {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprint = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.id = :id', { id })
      .getOne();
    sprintRepository.delete(await sprint);
    return sprint;
  }

  @Mutation((returns) => Sprint)
  async deleteAllSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository.createQueryBuilder('sprint').getMany();
    (await sprints).forEach(async (sprint) => {
      sprintRepository.delete(sprint);
    });
    return sprints;
  }

  @Mutation((returns) => Sprint)
  async updateSprint(
    @Arg('id') id: number,
    @Arg('start_date') start_date: Date,
    @Arg('end_date') end_date: Date,
    @Arg('tickets', (returns) => [Ticket]) tickets: Ticket[]
  ) {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprint = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.id = :id', { id })
      .getOne();
    (await sprint).start_date = start_date;
    (await sprint).end_date = end_date;
    (await sprint).tickets = tickets;
    sprintRepository.save(await sprint);
    return sprint;
  }
}
