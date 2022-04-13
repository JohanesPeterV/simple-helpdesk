// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {withIronSessionApiRoute} from 'iron-session/next'
import {ironSessionOptions} from "../../../lib/session";
import TicketHeaderRepository from "../../../repositories/ticket-header-repository";
import TicketDetailRepository from "../../../repositories/ticket-detail-repository";
import {CreateTicketDTO} from "../../../models/ticket/create-ticket-dto";


async function createTicket(user: User, ticket: CreateTicketDTO) {
    const ticketHeader = await TicketHeaderRepository.create(user);
    await TicketDetailRepository.create(user,
        {
            title: ticket.title,
            content: ticket.content,
            headerId: ticketHeader.id
        }
    );
    return ticketHeader;
}

export default withIronSessionApiRoute(handleCreateTicket, ironSessionOptions)

async function handleCreateTicket(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ticket: CreateTicketDTO = await req.body;

    const user = req.session.user;
    if (user) {
        const ticketHeader = await createTicket(user, ticket);
        res.json(ticketHeader);
    }

}



