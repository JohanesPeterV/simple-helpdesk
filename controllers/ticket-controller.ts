import User from '../models/auth/user';
import TicketRepository from '../repositories/ticket-repository';
import superjson from 'superjson';
import { Ticket } from '../models/ticket/ticket';

export default class TicketController {
  static async get(user: User, id: string) {
    const ticket = await TicketRepository.get(user, id);
    return ticket;
  }

  static async getPendingTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getPending(user)
    );
    return superjson.parse<Ticket[]>(pendingTicketsString);
  }

  static async getOngoingTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getOnGoing(user)
    );
    return superjson.parse<Ticket[]>(pendingTicketsString);
  }

  static async getClosedTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getClosed(user)
    );
    return superjson.parse<Ticket[]>(pendingTicketsString);
  }

  static async getTicketsGroup(user: User) {
    return {
      pendingTickets: await TicketController.getPendingTickets(user),
      ongoingTickets: await TicketController.getOngoingTickets(user),
    };
  }
}
