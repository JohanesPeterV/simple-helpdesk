import { Admin, TicketDetail, TicketHeader } from '@prisma/client';

export type Ticket = TicketHeader & { admin: Admin | null } & {
  ticketDetails: TicketDetail[];
};

export type PaginateClosedTicket = {
  page: number;
  dataPerPage: number;
  user: String;
}

export type TicketLength = {
  userParam: String;
}
