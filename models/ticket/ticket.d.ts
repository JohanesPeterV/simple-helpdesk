import { Admin, TicketDetail, TicketHeader } from '@prisma/client';

export type Ticket = TicketHeader & { admin: Admin | null } & {
  ticketDetails: TicketDetail[];
};

export type PaginateClosedTicketParameter = {
  page: number;
  dataPerPage: number;
  user: string;
};

export type PaginateTicketParameter = {
  page: number;
  dataPerPage: number;
};
