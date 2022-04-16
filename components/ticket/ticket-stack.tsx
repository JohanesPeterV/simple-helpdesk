import { FunctionComponent } from 'react'
import TicketCard from './ticket-card'
import { Ticket } from '../../models/ticket/ticket'
import DisclosureCard from '../disclosure-card'

const TicketStack: FunctionComponent<TicketStackProps> = ({
  title,
  tickets,
}) => (
  <DisclosureCard
    title={title}
    content={getTicketStack(tickets)}
    defaultOpen={true}
    className={'md:w-1/2 h-fit'}
  />
)

export default TicketStack

function getTicketStack(tickets: Ticket[]) {
  {
    return tickets.length > 0 ? (
      <ul className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </ul>
    ) : (
      <h3 className="sm:text-lg font-bold text-center py-6">
        You have no ongoing tickets
      </h3>
    )
  }
}

export interface TicketStackProps {
  title: string
  tickets: Ticket[]
}
