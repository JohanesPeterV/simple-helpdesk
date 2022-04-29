import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import { CreateTicketDTO } from '../../../models/dto/create-ticket-dto';
import TicketRepository from '../../../repositories/ticket-repository';

export default withIronSessionApiRoute(handleCreateTicket, ironSessionOptions);

async function handleCreateTicket(req: NextApiRequest, res: NextApiResponse) {
  const ticket: CreateTicketDTO = await req.body;
  const user = req.session.user;
  if (user) {
    const ticketHeader = await createTicket(user, ticket);
    res.json(ticketHeader);
  }
}

async function createTicket(user: User, ticketDTO: CreateTicketDTO) {
  return await TicketRepository.create(user, ticketDTO);
}
