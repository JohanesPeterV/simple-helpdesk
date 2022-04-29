import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { TicketLength } from '../../../models/ticket/ticket';

export default withIronSessionApiRoute(closedTicketsLength, ironSessionOptions);

async function closedTicketsLength(req: NextApiRequest, res: NextApiResponse){
    const ticketLength: TicketLength = await req.body;
    const user = req.session.user;
    if(user){
        const tickets = await getClosedTicketsLength(user, ticketLength);
        res.json(tickets);
    }
    
}

async function getClosedTicketsLength(user: User, ticketLength: TicketLength) {
    return await TicketRepository.getClosedLength(ticketLength.userParam);
  }