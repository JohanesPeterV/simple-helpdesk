import { FunctionComponent } from "react";
import { Ticket } from "../../models/ticket/ticket";
import TicketWithDetailsCard from "./ticket-with-details-card";

const TicketWithDetailsStack: FunctionComponent<TicketWithDetailsStackProps> = ({
    title,
    tickets,
    className,
    useDisclosure,
  }) => getTicketStack(title, tickets, className)

  export default TicketWithDetailsStack;

  export interface TicketWithDetailsStackProps {
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
          }
        >
          {tickets.map((ticket) => (
            <TicketWithDetailsCard ticket={ticket} key={ticket.id} />
          ))}
        </ul>
      ) : (
        <h3 className="sm:text-lg font-bold text-center py-6">
          You have no {title.toLowerCase()}
        </h3>
      );
    }
  }