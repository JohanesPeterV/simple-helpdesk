import {Fragment, FunctionComponent, HTMLAttributes} from "react";
import {DropdownProps} from "../models/dropdown/dropdown-props";
import {TicketDetail, TicketHeader} from "@prisma/client";
import {ChevronRightIcon, DotsCircleHorizontalIcon, MailIcon} from "@heroicons/react/solid";
import {Ticket} from "../models/ticket/ticket";


export interface TicketProp {
    ticket: Ticket,
}

const TicketCard: FunctionComponent<TicketProp> =
    ({
         ticket,

     }) => {
        return  <li>
            <a href={'ticket/'+ticket.id} className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div
                            className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                                <p className="text-sm font-medium text-indigo-600 truncate">{ticket.ticketDetails[0].title}</p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <MailIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"/>
                                    <span className="truncate">{ticket.creatorEmail}</span>
                                </p>
                            </div>

                            <div className="hidden md:block">
                                <div>
                                    <p className="text-sm text-gray-900">
                                        {ticket.createdAt.toLocaleString('en-GB')}
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <DotsCircleHorizontalIcon
                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400"
                                            aria-hidden="true"/>
                                        {ticket.ticketStatus}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"/>
                    </div>
                </div>
            </a>
        </li>

    };

export default TicketCard;
