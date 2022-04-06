// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from "../../../lib/session";

const prisma = new PrismaClient();
const argon2 = require('argon2');

function create(req: NextApiRequest, user: User) {
    return new Promise(async resolve => {
        req.session.user = user;
        await req.session.save();
        resolve(user);
    })
}


async function getPendingTicketStatusId() {
    return await prisma.ticketStatus.findUnique(
        {
            where: {
                name: 'Pending'
            }
        }
    );
}

async function createTicketHeader(user: User) {
    const pendingStatus = await getPendingTicketStatusId();
    return await prisma.ticketHeader.create({
        data: {
            creatorEmail: user.email,
            creatorName: user.name,
            ticketStatus: {
                connect: {
                    id: pendingStatus ? pendingStatus.id : ''
                }
            },
            solveDetail: '',
        },
    });
}

async function createTicketDetail(user: User, ticketHeaderId: string) {
    return await prisma.ticketDetail.create({
        data: {
            creatorEmail: user.email,
            creatorName: user.name,
            title: '',
            content: '',
            emailMessageId: '',
            ticketHeader: {
                connect: {id: ticketHeaderId}
            }
        },
    });
}

export default withIronSessionApiRoute(handleCreateTicket, sessionOptions)

async function handleCreateTicket(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {title, description} = await req.body;
    const user = req.session.user;
    if (user) {
        const ticketHeader = await createTicketHeader(user);
        const ticketDetail = await createTicketDetail(user, ticketHeader.id);
        res.json(ticketHeader);
    }

}



