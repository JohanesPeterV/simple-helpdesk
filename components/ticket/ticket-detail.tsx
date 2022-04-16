import {FunctionComponent} from "react";
import DisclosureCard from "../disclosure-card";
import {TicketDetail} from "@prisma/client";
import {TicketDetailsProp} from "../../models/props/ticket-details-prop";

const TicketDetail: FunctionComponent<TicketDetailsProp> =
    ({
         ticketDetails,
     }) => {
        return <DisclosureCard title={'Ticket Detail'} content={getTicketDetailComponent(ticketDetails)}
                               defaultOpen={true} className={''}/>
    };

export default TicketDetail;

function getTicketDetailComponent(ticketDetails: TicketDetail[]) {
    return <div className="px-4 py-6 sm:px-6">
        <ul className="space-y-8">
            {ticketDetails.map((ticketDetail) => (
                <li key={ticketDetail.id}>
                    <div className="flex space-x-3">
                        <div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                    {ticketDetail.title}
                                </a>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                                <p>
                                    {ticketDetail.content}
                                </p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                                                    <span
                                                        className="text-gray-500 font-medium">
                                                        {ticketDetail.createdAt.toLocaleString('en-GB')}
                                                    </span>
                                <span className="text-gray-500 font-medium"></span>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>

}
