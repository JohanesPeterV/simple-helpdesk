import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironSessionOptions } from "../../../lib/session";
import User from "../../../models/auth/user";
import { CreateTicketDetailDTO } from "../../../models/dto/create-ticket-detail-dto";
import TicketDetailRepository from "../../../repositories/ticket-detail-repository";

export default withIronSessionApiRoute(handleCreateTicketDetail, ironSessionOptions);

async function handleCreateTicketDetail(req: NextApiRequest, res: NextApiResponse) {
    const ticket: CreateTicketDetailDTO = await req.body;
    const user = req.session.user;
    if (user) {
        const ticketDetail = await createTicketDetail(user, ticket);
        res.json(ticketDetail);
    }
}

async function createTicketDetail(user: User, ticketDTO: CreateTicketDetailDTO) {
    return await TicketDetailRepository.create(
        user, 
        ticketDTO
    );
}