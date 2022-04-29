import User from '../models/auth/user';
import TicketRepository from '../repositories/ticket-repository';
import superjson from 'superjson';
import { Ticket } from '../models/ticket/ticket';

interface NamedParametersClosedTickets{
  user: User,
  limit?: number,
  skip?: number
}

export default class TicketController {
  static async get(user: User, id: string) {
    const ticket = await TicketRepository.get(user, id);
    return ticket;
  }

  static async getPendingTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getPending(user)
    );
    const pendingTickets = superjson.parse<Ticket[]>(pendingTicketsString);
    return pendingTickets;
  }

  static async getOngoingTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getOnGoing(user)
    );
    const pendingTickets = superjson.parse<Ticket[]>(pendingTicketsString);
    return pendingTickets;
  }

  static async getClosedTickets({user, limit, skip}: NamedParametersClosedTickets) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getClosed(user, limit, skip)
    );
    const pendingTickets = superjson.parse<Ticket[]>(pendingTicketsString);
    return pendingTickets;
  }

  static async getClosedTicketsLength(){
    const lengthTicketString = superjson.stringify(
      await TicketRepository.getClosedLength()
    );
    const lengthTicket = superjson.parse<Ticket[]>(lengthTicketString);
    return lengthTicket;
  }

  static async getTicketsGroup(user: User) {
    return {
      pendingTickets: await TicketController.getPendingTickets(user),
      ongoingTickets: await TicketController.getOngoingTickets(user),
    };
  }

  static async getAllTickets(user: User) {
    const ticketsString = superjson.stringify(
      await TicketRepository.getAllTickets(user)
    );
    return superjson.parse<Ticket[]>(ticketsString);
  }
}
