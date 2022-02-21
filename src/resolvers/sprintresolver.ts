/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation, ID } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import Sprint from '../entity/Sprint';
import Ticket from '../entity/Ticket';

/*
=> Get a sprint by id
=> Get all tickets by sprint
=> Get all current sprints
=> Get all past sprints
=> Get all future sprints
=> Get all sprints
=> Create a sprint
=> Delete a sprint
=> Delete all past sprints
=> Delete all future sprints
=> Delete all current sprints
=> Delete all sprints
=> Update a sprint
*/

@Resolver(Sprint)
export default class SprintResolver {
  @Query((returns) => Sprint)
  getOneSprint(@Arg('id', type => ID) id: string) {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprint = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.idSprint = :id', { id })
      .getOne();
    return sprint;
  }

  @Query((returns) => [Ticket])
  getAllTicketsBySprint(@Arg('sprint', (returns) => [Sprint]) sprint: Sprint) {
    const ticketRepository: Repository<Ticket> = getRepository(Ticket);
    const tickets = ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.sprint = :sprint', { sprint })
      .getMany();
    return tickets;
  }

  @Query((returns) => [Sprint])
  getAllCurrentSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository
      .createQueryBuilder('sprint')
      .where(
        'sprint.start_date IS NOT NULL' &&
          'sprint.end_date IS NOT NULL' &&
          'sprint.start_date<Date.now()' &&
          'sprint.end_date>Date.now()'
      )
      .getMany();
    return sprints;
  }

  @Query((returns) => [Sprint])
  getAllPastSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.end_date IS NOT NULL' && 'sprint.end_date<Date.now()')
      .getMany();
    return sprints;
  }

  @Query((returns) => [Sprint])
  getAllFutureSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.start_date IS NOT NULL' && 'sprint.start_date>Date.now()')
      .getMany();
    return sprints;
  }

  @Query((returns) => [Sprint])
  getAllSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository.createQueryBuilder('sprint').getMany();
    return sprints;
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
  async deleteAllPastSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.end_date IS NOT NULL' && 'sprint.end_date<Date.now()')
      .getMany();
    (await sprints).forEach(async (sprint) => {
      sprintRepository.delete(sprint);
    });
    return sprints;
  }

  @Mutation((returns) => Sprint)
  async deleteAllFutureSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.start_date IS NOT NULL' && 'sprint.start_date>Date.now()')
      .getMany();
    (await sprints).forEach(async (sprint) => {
      sprintRepository.delete(sprint);
    });
    return sprints;
  }

  @Mutation((returns) => Sprint)
  async deleteAllCurrentSprints() {
    const sprintRepository: Repository<Sprint> = getRepository(Sprint);
    const sprints = sprintRepository
      .createQueryBuilder('sprint')
      .where(
        'sprint.start_date IS NOT NULL' &&
          'sprint.end_date IS NOT NULL' &&
          'sprint.start_date<Date.now()' &&
          'sprint.end_date>Date.now()'
      )
      .getMany();
    (await sprints).forEach(async (sprint) => {
      sprintRepository.delete(sprint);
    });
    return sprints;
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
