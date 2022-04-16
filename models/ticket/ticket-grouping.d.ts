import {TicketDetail, TicketHeader} from "@prisma/client";
import {Ticket} from "./ticket";

export type TicketGrouping = {
    ongoingTickets: Ticket[],
    pendingTickets: Ticket[]
}
