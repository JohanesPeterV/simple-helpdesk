import {Fragment, FunctionComponent, HTMLAttributes} from "react";
import {DropdownProps} from "../models/dropdown/dropdown-props";
import {TicketDetail, TicketHeader} from "@prisma/client";
import {ChevronRightIcon, DotsCircleHorizontalIcon, MailIcon} from "@heroicons/react/solid";
import TicketCard from "./ticket-card";
import {Ticket} from "../models/ticket/ticket";


export interface TicketStackProps {
    title: string,
    tickets: Ticket[],
}

const TicketStack: FunctionComponent<TicketStackProps> =
    ({
         title,
         tickets,

     }) => {
        return <div className="rounded-lg md:w-1/2 bg-white shadow overflow-hidden h-fit">
            <div className="bg-gray-200 font-bold sm:text-lg px-4 py-2 flex items-center">
                {title}
            </div>
            {tickets.length > 0 ?
                <ul className="divide-y divide-gray-200">
                    {
                        tickets.map((ticket) => (
                            <TicketCard ticket={ticket} key={ticket.id}/>
                        ))
                    }
                </ul> :
                <h3 className="sm:text-lg font-bold text-center py-6">
                    You have no ongoing tickets
                </h3>}
        </div>


    };

export default TicketStack;
