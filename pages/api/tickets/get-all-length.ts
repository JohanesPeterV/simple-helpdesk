import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { FilterParameter } from '../../../models/parameters/filter-parameter';
import User from '../../../models/auth/user';

export default withIronSessionApiRoute(
  handleClosedTicketLength,
  ironSessionOptions
);

async function handleClosedTicketLength(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filterParameter: FilterParameter = await req.body;
  const user = req.session.user;
  if (user) {
    const tickets = await getAllTicketsLength(user, filterParameter);
    res.json(tickets);
  }
}

async function getAllTicketsLength(
  user: User,
  filterParameter: FilterParameter
) {
  return await TicketRepository.getFilteredTicketLength(user, filterParameter);
}
