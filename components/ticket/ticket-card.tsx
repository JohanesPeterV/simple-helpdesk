import { FunctionComponent, HTMLAttributes } from 'react';
import { TicketStatus } from '@prisma/client';
import { CalendarIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import { Ticket } from '../../models/ticket/ticket';
import { Else, If, Then } from 'react-if';

export interface TicketProp {
  ticket: Ticket;
}

const TicketCard: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & TicketProp
> = ({ children, ticket }) => {
  return (
    <li>
      <a
        href={'/ticket/' + ticket.id}
        className="block hover:bg-gray-100 shadow-md border border-gray-200 rounded-md"
      >
        <div className="min-w-0 flex flex-col px-2 py-4 sm:px-6">
          <div className="pb-1">
            <p className="flex items-center text-md font-semibold h-8">
              {ticket.ticketStatus}
              {ticket.admin ? (
                <div className="flex items-center text-sm w-min bg-sky-600 text-white ml-2 px-2 py-1 rounded-md">
                  <span className="truncate">{ticket.admin.username}</span>
                </div>
              ) : (
                <></>
              )}
            </p>

            <p className="text-lg font-thin">{ticket.ticketDetails[0].title}</p>
          </div>
          <div className="font-thin text-xs flex flex-col">
            <div className="flex items-center text-sm text-gray-500">
              <span className="truncate">
                {ticket.creatorEmail}
                {', '}
                {ticket.createdAt.toLocaleString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}

                {ticket.doneAt
                  ? '-' +
                    ticket.doneAt.toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </span>
            </div>
          </div>
        </div>
        {children}
      </a>
    </li>
  );
};

export default TicketCard;
