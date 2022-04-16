import {FunctionComponent} from "react";
import {TicketStatus} from "@prisma/client";
import {CheckCircleIcon, ChevronRightIcon, DotsCircleHorizontalIcon, MailIcon} from "@heroicons/react/solid";
import {Ticket} from "../../models/ticket/ticket";
import {Else, If, Then} from "react-if";


export interface TicketProp {
    ticket: Ticket,
}

const TicketCard: FunctionComponent<TicketProp> =
    ({
         ticket,

     }) => {
        return <li>
            <a href={'ticket/' + ticket.id} className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div
                            className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                                <p className="text-m font-medium text-sky-600 truncate">{ticket.ticketDetails[0].title}</p>
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
                                        <If condition={ticket.ticketStatus === TicketStatus.ONGOING}>
                                            <Then>
                                                <DotsCircleHorizontalIcon
                                                    className="flex-shrink-0 mr-1.5 h-6 w-6 text-sky-600"
                                                    aria-hidden="true"/>

                                            </Then>
                                            <Else>
                                                <If condition={ticket.ticketStatus === TicketStatus.PENDING}>
                                                    <Then>
                                                        <DotsCircleHorizontalIcon
                                                            className="flex-shrink-0 mr-1.5 h-6 w-6 text-red-400"
                                                            aria-hidden="true"/>

                                                    </Then>
                                                    <Else>
                                                        <CheckCircleIcon
                                                            className="flex-shrink-0 mr-1.5 h-6 w-6 text-green-600"
                                                            aria-hidden="true"/>


                                                    </Else>
                                                </If>
                                            </Else>
                                        </If>


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