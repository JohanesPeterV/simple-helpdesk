import { truncate } from 'fs';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from '../../components/container';
import TicketWithDetailsStack from '../../components/ticket/ticket-with-details-stack';
import TicketController from '../../controllers/ticket-controller';
import { ironSessionOptions } from '../../lib/session';
import { PaginateTicketParameter, Ticket } from '../../models/ticket/ticket';
import ReactPaginate from 'react-paginate';
import TicketService from '../../services/ticket-service';

interface AllTicketsProps {
  allTickets: Ticket[];
  allTicketsLength: number;
}

const ViewAllTickets: NextPage<AllTicketsProps> = (props) => {
  const [allTickets, setAllTickets] = useState<Ticket[]>();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<Ticket[] | undefined>();

  const [countData, setCountData] = useState<number>();
  const dataPerPage = 5;
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(Math.ceil(countData! / dataPerPage));
  }, [countData]);

  useEffect(() => {
    setAllTickets(props.allTickets);
    setOutput(props.allTickets);
    setCountData(props.allTicketsLength);

    console.log(props.allTicketsLength);
  }, [allTickets]);

  async function handlePageClick(data: any) {
    const currPage = data.selected + 1;

    const paginate: PaginateTicketParameter = {
      page: currPage,
      dataPerPage: dataPerPage,
    };
    const paginateData = await TicketService.viewAllTicketPaginate(paginate);
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
            pageLinkClassName={''}
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
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
            <TicketWithDetailsStack
              title={'Ticket History'}
              tickets={output}
              className={'w-full'}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default ViewAllTickets;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            allTickets: await TicketController.getAllTickets({
              user: req.session.user,
              limit: 5,
            }),
            allTicketsLength: await TicketController.getAllTicketsLength(),
          }
        : {},
    };
  },
  ironSessionOptions
);
