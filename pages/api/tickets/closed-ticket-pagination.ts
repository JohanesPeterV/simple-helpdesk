import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import TicketRepository from '../../../repositories/ticket-repository';
import { PaginateClosedTicket } from '../../../models/ticket/ticket';

export default withIronSessionApiRoute(getTickets, ironSessionOptions);

async function getTickets(req: NextApiRequest, res: NextApiResponse){
    const paginate: PaginateClosedTicket = await req.body;
    const user = req.session.user;
    if(user){
        const tickets = await getClosedTickets(user, paginate);
        res.json(tickets);
    }
    
}

async function getClosedTickets(user: User, paginate: PaginateClosedTicket) {
    const takeData = paginate.dataPerPage;
    const skipData = (paginate.page-1)*paginate.dataPerPage;
    return await TicketRepository.getClosed(user, takeData, skipData, paginate.user);
  }