import User from '../models/auth/user';
import TicketPresenter from '../presenters/ticket-presenter';

export default class TicketController {
  static async getTicketsGroup(user: User) {
    return {
      pendingTickets: await TicketPresenter.getPendingTickets(user),
      ongoingTickets: await TicketPresenter.getOngoingTickets(user),
    };
  }
}
