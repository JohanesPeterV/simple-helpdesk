import {Admin, TicketDetail, TicketHeader} from "@prisma/client";

export type Ticket = (TicketHeader & { admin: Admin } & { ticketDetails: TicketDetail[] })



