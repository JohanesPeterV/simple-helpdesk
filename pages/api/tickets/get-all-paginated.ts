import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { PaginateTicketParameter } from '../../../models/parameters/paginate-ticket-parameter';


export default withIronSessionApiRoute(
  handleGetAllTicketsPaginated,
  ironSessionOptions
);

async function handleGetAllTicketsPaginated(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paginate: PaginateTicketParameter = await req.body;
  const user = req.session.user;

  if (user) {
    const tickets = await getAllTickets(user, paginate);
    res.json(tickets);
  }
  res.status(401);
}

async function getAllTickets(user: User, paginate: PaginateTicketParameter) {
  return await TicketRepository.getAllTickets(user, paginate);
}
