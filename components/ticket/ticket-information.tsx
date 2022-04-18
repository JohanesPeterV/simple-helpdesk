import { FunctionComponent } from 'react';
import DisclosureCard from '../disclosure-card';
import { Ticket } from '../../models/ticket/ticket';
import { TicketProp } from '../../models/props/ticket-prop';

const TicketInformation: FunctionComponent<TicketProp> = ({ ticket }) => {
  return (
    <DisclosureCard
      title={'Ticket Information'}
      content={getTicketInformationComponent(ticket)}
      defaultOpen={true}
      className={''}
    />
  );
};

export default TicketInformation;

function getTicketInformationComponent(ticket: Ticket) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Title</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {ticket.ticketDetails[0].title}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">PIC</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {ticket.admin ? ticket.admin.id : '-'}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">PIC Email</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {ticket.admin ? ticket.admin.email : '-'}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Creator Email</dt>
          <dd className="mt-1 text-sm text-gray-900">{ticket.creatorEmail}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Creator Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{ticket.creatorName}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Content</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {ticket.ticketDetails[0].content}
          </dd>
        </div>
      </dl>
    </div>
  );
}
