import { FunctionComponent } from 'react';
import DisclosureCard from '../disclosure-card';
import { TicketDetail } from '@prisma/client';
import { TicketDetailsProp } from '../../models/props/ticket-details-prop';
import Card from '../card';

const TicketDetail: FunctionComponent<TicketDetailsProp> = ({
  ticketDetails,
}) => getTicketDetailComponent(ticketDetails);

export default TicketDetail;

function getTicketDetailComponent(ticketDetails: TicketDetail[]) {
  return (
    <div className="px-4 sm:px-6 pb-6">
      <ul className="space-y-6 divide-y divide-solid">
        {ticketDetails.map((ticketDetail) => (
          <li className="pt-6" key={ticketDetail.id}>
            <div className="flex space-x-3">
              <div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-gray-900">
                    {ticketDetail.title}
                  </a>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{ticketDetail.content}</p>
                </div>
                <div className="mt-2 text-sm space-x-2">
                  <span className="text-gray-500 font-medium">
                    {ticketDetail.createdAt.toLocaleString('en-GB')}
                  </span>
                  <span className="text-gray-500 font-medium"></span>
                </div>
              </div>
            </div>
          </li>
        ))}
        <li className="pt-6">
          <div className="flex space-x-3">
            <div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-900">
                  Data testing
                </a>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <p>Data buat testing UI </p>
              </div>
              <div className="mt-2 text-sm space-x-2">
                <span className="text-gray-500 font-medium">
                  tanggal sekian
                </span>
                <span className="text-gray-500 font-medium"></span>
              </div>
            </div>
          </div>
        </li>
        <li className="pt-6">
          <div className="flex space-x-3">
            <div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-900">
                  Data testing
                </a>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <p>Data buat testing UI </p>
              </div>
              <div className="mt-2 text-sm space-x-2">
                <span className="text-gray-500 font-medium">
                  tanggal sekian
                </span>
                <span className="text-gray-500 font-medium"></span>
              </div>
            </div>
          </div>
        </li>
        <li className="pt-6">
          <div className="flex space-x-3">
            <div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-900">
                  Data testing
                </a>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <p>Data buat testing UI </p>
              </div>
              <div className="mt-2 text-sm space-x-2">
                <span className="text-gray-500 font-medium">
                  tanggal sekian
                </span>
                <span className="text-gray-500 font-medium"></span>
              </div>
            </div>
          </div>
        </li>
        <li className="pt-6">
          <div className="flex space-x-3">
            <div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-900">
                  Data testing
                </a>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <p>Data buat testing UI </p>
              </div>
              <div className="mt-2 text-sm space-x-2">
                <span className="text-gray-500 font-medium">
                  tanggal sekian
                </span>
                <span className="text-gray-500 font-medium"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
