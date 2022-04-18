import User from '../models/auth/user'
import TicketRepository from '../repositories/ticket-repository'
import superjson from 'superjson'
import { Ticket } from '../models/ticket/ticket'

export default class TicketController {
  static async get(user: User, id: string) {
    const ticket = await TicketRepository.get(user, id)
    const existOrAuthorized =
      user.role === 'Admin' || (ticket && ticket.creatorEmail === user.email)
    if (!existOrAuthorized) {
      return null
    }
    return ticket
  }

  private static async adminCondition(user: User) {
    return user.role === 'admin' ? {} : { creatorEmail: user.email }
  }

  static async getPendingTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getPending(this.adminCondition(user))
    )
    const pendingTickets = superjson.parse<Ticket[]>(pendingTicketsString)
    return pendingTickets
  }

  static async getOngoingTickets(user: User) {
    const pendingTicketsString = superjson.stringify(
      await TicketRepository.getOnGoing(this.adminCondition(user))
    )
    const pendingTickets = superjson.parse<Ticket[]>(pendingTicketsString)
    return pendingTickets
  }

  static async getTicketsGroup(user: User) {
    return {
      pendingTickets: await TicketController.getPendingTickets(user),
      ongoingTickets: await TicketController.getOngoingTickets(user),
    }
  }
}
