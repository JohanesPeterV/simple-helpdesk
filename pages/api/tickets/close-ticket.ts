import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import requireAdmin from "../../../lib/api/require-admin";
import { ironSessionOptions } from "../../../lib/session";
import { CloseTicketParameter } from "../../../models/parameters/close-ticket-parameter";
import TicketHeaderRepository from "../../../repositories/ticket-header-repository";

export default withIronSessionApiRoute(requireAdmin(handleCloseTicket), ironSessionOptions);

async function handleCloseTicket(req: NextApiRequest, res: NextApiResponse) {
    const parameter: CloseTicketParameter = await req.body;
    const user = req.session.user;
    if (user) {
        const ticket = await closeTicket(parameter);
        res.json(ticket);
        
    }
}

async function closeTicket(closeTicketParameter: CloseTicketParameter) {
    return await TicketHeaderRepository.closeTicket(
        closeTicketParameter
    );
}