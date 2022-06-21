import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { PaginateClosedTicketParameter } from '../../../models/parameters/paginate-closed-ticket-parameter';

export default withIronSessionApiRoute(
  handleGetAllTicketsPaginated,
  ironSessionOptions
);

async function handleGetAllTicketsPaginated(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paginate: PaginateClosedTicketParameter = await req.body;
  const user = req.session.user;
  if (user) {
    const tickets = await getAllTickets(user, paginate);
    res.json(tickets);
  }
}

async function getAllTickets(
  user: User,
  paginate: PaginateClosedTicketParameter
) {
  const takeData = paginate.dataPerPage;
  const skipData = (paginate.page - 1) * paginate.dataPerPage;
  return await TicketRepository.getAllTickets(user, takeData, skipData);
}
