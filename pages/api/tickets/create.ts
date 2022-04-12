// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from "../../../lib/session";
import TicketHeaderRepository from "../../../repositories/TicketHeaderRepository";
import TicketStatusRepository from "../../../repositories/TicketStatusRepository";
import TicketDetailRepository from "../../../repositories/TicketDetailRepository";

const prisma = new PrismaClient();
const argon2 = require('argon2');

function create(req: NextApiRequest, user: User) {
    return new Promise(async resolve => {
        req.session.user = user;
        await req.session.save();
        resolve(user);
    })
}


async function createTicket(user: User) {
    const pendingStatus = await TicketStatusRepository.getByName('Pending');
    const statusId = (pendingStatus ? pendingStatus.id : '');
    const ticketHeader = await TicketHeaderRepository.create(user, statusId);
    await TicketDetailRepository.create(user, ticketHeader.id);
    return ticketHeader;
}

export default withIronSessionApiRoute(handleCreateTicket, sessionOptions)

async function handleCreateTicket(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {title, description} = await req.body;
    const user = req.session.user;
    if (user) {
        const ticketHeader = await createTicket(user);
        res.json(ticketHeader);
    }

}



