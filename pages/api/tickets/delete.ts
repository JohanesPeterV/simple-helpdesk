import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import { CreateTicketDTO } from '../../../models/dto/create-ticket-dto';
import TicketRepository from '../../../repositories/ticket-repository';
import requireAdmin from '../../../lib/api/require-admin';

export default withIronSessionApiRoute(
  requireAdmin(handleDeleteTicket),
  ironSessionOptions
);

async function handleDeleteTicket(req: NextApiRequest, res: NextApiResponse) {
  const { ticketId } = await req.body;
  res.json(await deleteTicket(ticketId));
}

async function deleteTicket(ticketId: string) {
  return await TicketRepository.delete(ticketId);
}
