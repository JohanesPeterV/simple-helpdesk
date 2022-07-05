import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { UserNameParameter } from '../../../models/parameters/user-name-parameter';
import { FilterParameter } from '../../../models/parameters/filter-parameter';

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
  return await TicketRepository.getAllTicketLength(filterParameter);
}
