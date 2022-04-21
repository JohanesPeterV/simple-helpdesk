import { FunctionComponent } from 'react';
import TicketCard from './ticket-card';
import { Ticket } from '../../models/ticket/ticket';
import DisclosureCard from '../disclosure-card';

const TicketStack: FunctionComponent<TicketStackProps> = ({
  title,
  tickets,
  className,
  useDisclosure,
}) =>
  useDisclosure ? (
    <DisclosureCard
      title={title}
      content={getTicketStack(title, tickets)}
      defaultOpen={true}
      className={'h-fit ' + className}
    />
  ) : (
    getTicketStack(title, tickets, className)
  );

export default TicketStack;

export interface TicketStackProps {
  title: string;
  tickets: Ticket[];
  className: string;
  useDisclosure?: boolean;
}

function getTicketStack(title: string, tickets: Ticket[], className?: string) {
  {
    return tickets.length > 0 ? (
      <ul
        className={
          className
            ? 'divide-y divide-gray-300 ' + className
            : 'divide-y divide-gray-300'
        }
      >
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </ul>
    ) : (
      <h3 className="sm:text-lg font-bold text-center py-6">
        You have no {title.toLowerCase()}
      </h3>
    );
  }
}
