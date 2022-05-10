import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from '../../components/container';
import { ironSessionOptions } from '../../lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import TicketController from '../../controllers/ticket-controller';
import {
  PaginateClosedTicketParameter,
  Ticket,
} from '../../models/ticket/ticket';
import TicketStack from '../../components/ticket/ticket-stack';
import ReactPaginate from 'react-paginate';
import User from '../../models/auth/user';
import TicketService from '../../services/ticket-service';
import UserController from '../../controllers/user-controller';
import { UserNameParameter } from '../../models/parameters/user-name-parameter';

interface HistoryProps {
  closedTickets: Ticket[];
  closedTicketsLength: number;
  admins: User[];
}

const History: NextPage<HistoryProps> = (props) => {
  const [admins, setAdmins] = useState<User[]>();
  const [closedTickets, setClosedTickets] = useState<Ticket[]>();
  const [output, setOutput] = useState<Ticket[] | undefined>();

  const [countData, setCountData] = useState<number>();
  const dataPerPage = 5;
  const [page, setPage] = useState(0);

  const [userParam, setUserParam] = useState('All');

  useEffect(() => {
    setPage(Math.ceil(countData! / dataPerPage));
  }, [countData]);

  useEffect(() => {
    setAdmins(props.admins);
    setClosedTickets(props.closedTickets);
    setOutput(closedTickets);
    console.log(props.admins);

    setCountData(props.closedTicketsLength);
  }, [closedTickets]);

  async function handlePageClick(data: any) {
    const currPage = data.selected + 1;

    const paginate: PaginateClosedTicketParameter = {
      page: currPage,
      dataPerPage: dataPerPage,
      user: userParam,
    };
    const paginateData = await TicketService.viewClosedTicketPaginate(paginate);
    setOutput(paginateData.data);
  }

  async function dropDownChange(data: any) {
    const initial = data.target.value;
    setUserParam(initial);

    const userNameParameter: UserNameParameter = {
      userName: initial,
    };
    const length = await TicketService.getClosedTicketLength(userNameParameter);
    setCountData(length.data);

    const currPage = 1;
    const paginate: PaginateClosedTicketParameter = {
      page: currPage,
      dataPerPage: dataPerPage,
      user: initial,
    };

    const paginateData = await TicketService.viewClosedTicketPaginate(paginate);
    setOutput(paginateData.data);
  }

  return (
    <Container className="">
      {output ? (
        <div>
          <ReactPaginate
            pageCount={page}
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            marginPagesDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center mb-5'}
            pageClassName={
              'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1 border text-base font-medium'
            }
            nextClassName={
              'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1 border text-base font-medium'
            }
            previousClassName={
              'bg-white border-gray-300 text-gray-500 hover:bg-border-50 relative inline-flex items-center px-3 py-1 border text-base font-medium'
            }
            activeClassName={
              'z-10 bg-gray-200 text-indigo-600 relative inline-flex items-center px-3 py-1 border text-base font-medium'
            }
          />
          <div>
            <select
              className="border-2 border-gray-300 border-solid w-full max-w-sm px-2 py-2.5 rounded-md text-gray-500 my-3"
              name=""
              id=""
              value={userParam}
              onChange={dropDownChange}
            >
              <option value="All">All</option>

              {admins!.map((admin) => (
                <option key={admin.username} value={admin.username}>
                  {admin.username}
                </option>
              ))}
            </select>

            <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
              <TicketStack
                title={'Ticket History'}
                tickets={output}
                className={'w-full'}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default History;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            closedTickets: await TicketController.getClosedTickets({
              user: req.session.user,
              limit: 5,
            }),
            closedTicketsLength: await TicketController.getClosedTicketsLength(
              req.session.user.username
            ),
            admins: await UserController.getAllAdmin(),
          }
        : {},
    };
  },
  ironSessionOptions
);
