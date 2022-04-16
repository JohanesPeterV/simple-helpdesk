import {Ticket} from "./ticket";

export type TicketGrouping = {
    ongoingTickets: Ticket[],
    pendingTickets: Ticket[]
}
