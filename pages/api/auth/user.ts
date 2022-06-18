import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import { CreateTicketDTO } from '../../../models/dto/create-ticket-dto';
import TicketRepository from '../../../repositories/ticket-repository';

export default withIronSessionApiRoute(handleGetUser, ironSessionOptions);

async function handleGetUser(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;
  if (user) {
    res.json(user);
  }
}
