import {TicketDetail, TicketHeader} from "@prisma/client";

export type TicketGrouping = {
    ongoingTickets: (TicketHeader & { ticketDetails: TicketDetail[] })[],
    pendingTickets: (TicketHeader & { ticketDetails: TicketDetail[] })[]
}
