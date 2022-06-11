import { FunctionComponent } from 'react';
import TicketCard from './ticket-card';
import { Ticket } from '../../models/ticket/ticket';
import DisclosureCard from '../disclosure-card';

const TicketStack: FunctionComponent<TicketStackProps> = ({
  title,
  tickets,
  className,
}) =>
  tickets.length > 0 ? (
    <ul className={`divide-y divide-gray-300 ${className}`}>
      {tickets.map((ticket) => (
        <TicketCard ticket={ticket} key={ticket.id} />
      ))}
    </ul>
  ) : (
    <h3 className="sm:text-lg font-bold text-center py-6">
      You have no {title.toLowerCase()}
    </h3>
  );

export default TicketStack;

export interface TicketStackProps {
  title: string;
  tickets: Ticket[];
  className?: string;
}
