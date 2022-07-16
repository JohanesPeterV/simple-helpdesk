import User from '../models/auth/user';
import TicketRepository from '../repositories/ticket-repository';
import superjson from 'superjson';
import { Ticket } from '../models/ticket/ticket';
import { PaginateTicketFilteredByUserParams } from '../models/parameters/paginate-ticket-filtered-by-user-params';
import { PaginateTicketParameter } from '../models/parameters/paginate-ticket-parameter';
import { FilterParameter, RangeDate } from '../models/parameters/filter-parameter';
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

  static async getAllTicketsLength(status: string, title: string, content: string, keyword: string, creationStartDate: string, creationEndDate: string, doneStartDate: string, doneEndDate: string) {
    const creationRangeDate: RangeDate = {
      startDate: creationStartDate,
      endDate: creationEndDate
    }
    const doneRangeDate: RangeDate = {
      startDate: doneStartDate,
      endDate: doneEndDate
    }

    const filter: FilterParameter = {
      status: status,
      title: title,
      content: content,
      keyword: keyword,
      creationTimeRange: creationRangeDate,
      doneTimeRange: doneRangeDate
    };
    const lengthTicketString = superjson.stringify(
      await TicketRepository.getAllTicketLength(filter)
    );
    const lengthTicket = superjson.parse<Ticket[]>(lengthTicketString);
    return lengthTicket;
  }

  static async getAllTickets({
    user,
    limit,
    skip,
  }: PaginateTicketFilteredByUserParams, status: string,
    title: string, content: string, keyword: string, creationStartDate: string, creationEndDate: string, doneStartDate: string,
    doneEndDate: string) {
    const creationRangeDate: RangeDate = {
      startDate: creationStartDate,
      endDate: creationEndDate
    }
    const doneRangeDate: RangeDate = {
      startDate: doneStartDate,
      endDate: doneEndDate
    }
    const paginate: PaginateTicketParameter = {
      page: 1,
      dataPerPage: limit!,
      filterParameter: {
        status: status,
        title: title,
        content: content,
        keyword: keyword,
        creationTimeRange: creationRangeDate,
        doneTimeRange: doneRangeDate
      }
    };
    const ticketsString = superjson.stringify(
      await TicketRepository.getAllTickets(user, paginate)
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
