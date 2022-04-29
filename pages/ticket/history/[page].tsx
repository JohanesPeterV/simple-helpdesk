import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import "@material-tailwind/react/tailwind.css";
import { withIronSessionSsr } from 'iron-session/next';
import ReactPaginate from 'react-paginate';
import { count } from 'console';
import axios from 'axios';
import { User } from 'next-auth';
import { useRouter } from 'next/router';
import Container from '../../../components/container';
import TicketController from '../../../controllers/ticket-controller';
import { ironSessionOptions } from '../../../lib/session';
import { Ticket } from '../../../models/ticket/ticket';
import { route } from 'next/dist/server/router';




interface HistoryProps {
  closedTickets: Ticket[];
  sessionUser: User;
}

const Page: NextPage<HistoryProps> = (props) => {

const router = useRouter();
const [page, setPage] = useState<number>(0);

  const [closedTickets, setClosedTickets] = useState<Ticket[]>();
  const [input, setInput]  = useState('')
  const [output, setOutput] = useState<Ticket[] | undefined>();
  const [countData, setCountData] = useState<number>();
  const dataPerPage = 3;
  const [countPage, setCountPage] = useState(0);


  useEffect(() => {
    setClosedTickets(props.closedTickets);
    setOutput(props.closedTickets)
    setCountData(props.closedTickets.length);
    setCountPage(Math.ceil(countData! / dataPerPage));

  }, [closedTickets]);

  useEffect(() => {
    setOutput([])
    if(input === ""){
      setOutput(closedTickets)
      return
    }
    closedTickets?.filter(val => {
      if(val.admin?.username.toLowerCase().includes(input.toLowerCase())){
        setOutput(output => [...output ?? [], val])
      }
    })
  }, [input])

  async function handlePageClick(data: any){
    const currPage: number = data.selected + 1;
    
    router.push('/ticket/history/' + currPage);
    
  }

  return (
    <Container className="">
      {output ? (
        <ReactPaginate
          pageCount={countPage}
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          marginPagesDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center'}
          pageClassName={'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1 border text-base font-medium'}
          pageLinkClassName={''}
          nextClassName={'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1 border text-base font-medium'}
          previousClassName={'bg-white border-gray-300 text-gray-500 hover:bg-border-50 relative inline-flex items-center px-3 py-1 border text-base font-medium'}
          activeClassName={'z-10 bg-gray-200 text-indigo-600 relative inline-flex items-center px-3 py-1 border text-base font-medium'}
        />
        // <div>
        //   <div className='mb-6'>
        //     <input onChange={e => setInput(e.target.value)} className='py-2 px-4 border-2 border-gray-300 rounded-md' type="text" placeholder='Search by Admin'/>
        //   </div>

        //   <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
        //     <TicketStack
        //       title={'Ticket History'}
        //       tickets={output}
        //       className={'w-full'}
        //     />
        //   </div>
        // </div>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default Page;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            closedTickets: await TicketController.getClosedTickets(
              {user: req.session.user}
            ),
            sessionUser: req.session.user
          }
        : {},
    };
  },
  ironSessionOptions
);
