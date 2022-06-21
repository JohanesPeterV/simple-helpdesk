import { FunctionComponent } from 'react';
import { TicketStatus } from '@prisma/client';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { Ticket } from '../../models/ticket/ticket';
import { Else, If, Then } from 'react-if';
import { TicketProp } from '../../models/props/ticket-prop';
import TicketCard from './ticket-card';

const TicketWithDetailsCard: FunctionComponent<TicketProp> = ({ ticket }) => {
  return (
    <TicketCard ticket={ticket}>
      <div className="px-6 pb-4 sm:px-8">
        {ticket.ticketDetails.map((t, idx) => (
          <div className="flex items-center px-2 mb-2" key={idx}>
            <div>
              <TagIcon
                className="h-4 w-4 text-gray-400 mr-2"
                aria-hidden="true"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>{t.content}</p>
            </div>
          </div>
        ))}
      </div>
    </TicketCard>
  );
};

export default TicketWithDetailsCard;
