import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import { CreateTicketDTO } from '../../../models/dto/create-ticket-dto';
import TicketRepository from '../../../repositories/ticket-repository';
import { AssignPICDTO } from '../../../models/dto/assign-pic-dto';
import TicketHeaderRepository from '../../../repositories/ticket-header-repository';

export default async function handleAssignPIC(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const assignPICDTO: AssignPICDTO = await req.body;
  const ticketHeader = await assignPIC(assignPICDTO);
  res.json(ticketHeader);
}

async function assignPIC(assignPICDTO: AssignPICDTO) {
  return await TicketHeaderRepository.assignPIC(assignPICDTO);
}
