import User from '../models/auth/user';
import TicketRepository from '../repositories/ticket-repository';
import superjson from 'superjson';
import { Ticket } from '../models/ticket/ticket';
import { PaginateTicketFilteredByUserParams } from '../models/parameters/paginate-ticket-filtered-by-user-params';
import { PaginateTicketParameter } from '../models/parameters/paginate-ticket-parameter';
import {
  FilterParameter,
  RangeDate,
} from '../models/parameters/filter-parameter';
import { createKeywordTypeNode } from 'typescript';

export default class TicketPresenter {
  static async get(user: User, id: string) {
    return await TicketRepository.get(user, id);
  }

  static async getPendingTickets(user: User, limit?: number) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getPending(user, limit)
    );
    return superjson.parse<Ticket[]>(pendingTicketsString);
  }

  static async getOngoingTickets(user: User, limit?: number) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getOnGoing(user, limit)
    );
    return superjson.parse<Ticket[]>(pendingTicketsString);
  }

  static async getClosedTickets({
    user,
    limit,
    skip,
  }: PaginateTicketFilteredByUserParams) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getClosed(user, limit, skip)
    );
    return superjson.parse<Ticket[]>(pendingTicketsString);
  }

  static async getClosedTicketsLength(username: string) {
    const lengthTicketString = superjson.stringify(
      await TicketRepository.getClosedLength(username)
    );
    const lengthTicket = superjson.parse<Ticket[]>(lengthTicketString);
    return lengthTicket;
  }

  static async getAllTicketsLength(
    user: User,
    filterParameter: FilterParameter
  ) {
    const lengthTicketString = superjson.stringify(
      await TicketRepository.getFilteredTicketLength(user, filterParameter)
    );
    const lengthTicket = superjson.parse<Ticket[]>(lengthTicketString);
    return lengthTicket;
  }

  static async getAllTickets(
    { user, limit, skip }: PaginateTicketFilteredByUserParams,
    filterParameter: FilterParameter
  ) {
    const paginate: PaginateTicketParameter = {
      page: 1,
      dataPerPage: limit!,
      filterParameter: filterParameter,
    };
    const ticketsString = superjson.stringify(
      await TicketRepository.getFilteredTickets(user, paginate)
    );
    return superjson.parse<Ticket[]>(ticketsString);
  }

  static async getPendingAndOngoingTicketsGroup(user: User, limit?: number) {
    return {
      pendingTickets: await TicketPresenter.getPendingTickets(user, limit),
      ongoingTickets: await TicketPresenter.getOngoingTickets(user, limit),
    };
  }
}
