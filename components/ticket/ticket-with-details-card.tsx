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

const TicketWithDetailsCard: FunctionComponent<TicketProp> = ({ ticket }) => {
    return (
      <li>
        <a href={'/ticket/' + ticket.id} className="z-0 block hover:bg-gray-50 bg-gray-100 mb-2 drop-shadow-md">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-m font-medium text-sky-600 truncate">
                    {ticket.ticketDetails[0].title}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MailIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="truncate">{ticket.creatorEmail}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <UserIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="truncate">{ticket.admin?.username ?? "-"}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      {ticket.createdAt.toLocaleString('en-GB')}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <If
                        condition={ticket.ticketStatus === TicketStatus.ONGOING}
                      >
                        <Then>
                          <DotsCircleHorizontalIcon
                            className="flex-shrink-0 mr-1.5 h-6 w-6 text-sky-600"
                            aria-hidden="true"
                          />
                        </Then>
                        <Else>
                          <If
                            condition={
                              ticket.ticketStatus === TicketStatus.PENDING
                            }
                          >
                            <Then>
                              <DotsCircleHorizontalIcon
                                className="flex-shrink-0 mr-1.5 h-6 w-6 text-red-400"
                                aria-hidden="true"
                              />
                            </Then>
                            <Else>
                              <CheckCircleIcon
                                className="flex-shrink-0 mr-1.5 h-6 w-6 text-green-600"
                                aria-hidden="true"
                              />
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
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className='flex justify-center items-center w-100 mx-6 pb-2 pt-2 sm:mx-8 border-gray-300 border-t'>
          </div>
          <div className='px-6 pb-4 sm:px-8'>
              {
                  ticket.ticketDetails.map((t, idx) => (
                    <div className='flex items-center px-2 mb-2'>
                        <div>
                            <TagIcon
                                className="h-4 w-4 text-gray-400 mr-2"
                                aria-hidden="true"
                            />
                        </div>
                        <div className='text-sm text-gray-500'>
                            <p>{t.content}</p>
                        </div>
                    </div>
                  ))
              }
          </div>
        </a>
      </li>
    );
  };
  
  export default TicketWithDetailsCard;
  