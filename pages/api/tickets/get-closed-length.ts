import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { UserNameParameter } from '../../../models/parameters/user-name-parameter';
import requireAdmin from '../../../lib/api/require-admin';

export default withIronSessionApiRoute(
  requireAdmin(handleClosedTicketLength),
  ironSessionOptions
);

async function handleClosedTicketLength(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ticketLength: UserNameParameter = await req.body;
  const user = req.session.user;
  if (user) {
    const tickets = await getClosedTicketsLength(user, ticketLength);
    res.json(tickets);
  }
}

async function getClosedTicketsLength(
  user: User,
  ticketLength: UserNameParameter
) {
  return await TicketRepository.getClosedLength(ticketLength.userName);
}
