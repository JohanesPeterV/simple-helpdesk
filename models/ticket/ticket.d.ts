import { Admin, TicketDetail, TicketHeader } from '@prisma/client';

export type Ticket = TicketHeader & { admin: Admin | null } & {
  ticketDetails: TicketDetail[];
};
