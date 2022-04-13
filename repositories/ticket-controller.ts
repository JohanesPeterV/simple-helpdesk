import User from "../models/auth/user";
import {TicketDetail, TicketHeader, TicketStatus} from "@prisma/client";
import TicketRepository from "./ticket-repository";
import superjson from "superjson";


export default class TicketController {

    static async getPendingTickets(user: User) {
        const pendingTicketsString = superjson.stringify(await TicketRepository.getPending(user));
        const pendingTickets = superjson.parse<(TicketHeader & { ticketDetails: TicketDetail[] })[]>(pendingTicketsString);
        return pendingTickets;
    }

    static async getOngoingTickets(user: User) {
        const pendingTicketsString = superjson.stringify(await TicketRepository.getOnGoing(user));
        const pendingTickets = superjson.parse<(TicketHeader & { ticketDetails: TicketDetail[] })[]>(pendingTicketsString);
        return pendingTickets;
    }

    static async getTicketsGroup(user: User) {
        return {
            pendingTickets: await TicketController.getPendingTickets(user),
            ongoingTickets: await TicketController.getOngoingTickets(user)
        };
    }
}
