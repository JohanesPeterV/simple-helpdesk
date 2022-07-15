import { truncate } from 'fs';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { FormEventHandler, useEffect, useState } from 'react';
import Container from '../../components/container';
import TicketWithDetailsStack from '../../components/ticket/ticket-with-details-stack';
import TicketPresenter from '../../presenters/ticket-presenter';
import { ironSessionOptions } from '../../lib/session';
import { Ticket } from '../../models/ticket/ticket';
import ReactPaginate from 'react-paginate';
import TicketService from '../../services/ticket-service';
import { PaginateTicketParameter } from '../../models/parameters/paginate-ticket-parameter';
import { FilterParameter, RangeDate } from '../../models/parameters/filter-parameter';
import Input from '../../components/input';
import Button from '../../components/button';
import DisclosureCard from '../../components/disclosure-card';

interface AllTicketsProps {
  allTickets: Ticket[];
  allTicketsLength: number;
}

const ViewAllTickets: NextPage<AllTicketsProps> = (props) => {
  const [allTickets, setAllTickets] = useState<Ticket[]>();
  const [input, setInput] = useState('');
  const [textFilter, setTextFilter] = useState('');
  const [output, setOutput] = useState<Ticket[] | undefined>();

  const [countData, setCountData] = useState<number>();
  const dataPerPage = 5;
  const [page, setPage] = useState(0);
  const [currPage, setCurrPage] = useState(0);

  const [statusParam, setStatusParam] = useState('ALL STATUS');
  const [titleContentParam, setTitleContentParam] = useState('');
  const [creationStartDateParam, setCreationStartDateParam] = useState('');
  const [creationEndDateParam, setCreationEndDateParam] = useState('');
  const [doneStartDateParam, setDoneStartDateParam] = useState('');
  const [doneEndDateParam, setDoneEndDateParam] = useState('');


  useEffect(() => {
    setPage(Math.ceil(countData! / dataPerPage));
  }, [countData]);

  useEffect(() => {
    setAllTickets(props.allTickets);
    setOutput(props.allTickets);
    setCountData(props.allTicketsLength);

    console.log(props.allTickets);
  }, [allTickets]);

  async function handlePageClick(data: any) {
    const currPage = data.selected + 1;
    setCurrPage(data.selected);

    const creationRangeDate: RangeDate = {
      startDate: creationStartDateParam,
      endDate: creationEndDateParam
    }

    const doneRangeDate: RangeDate = {
      startDate: doneStartDateParam,
      endDate: doneEndDateParam
    }

    const filterParameter: FilterParameter = {
      status: statusParam,
      title: titleContentParam,
      keyword: textFilter,
      creationTimeRange: creationRangeDate,
      doneTimeRange: doneRangeDate
    };

    const paginate: PaginateTicketParameter = {
      page: currPage,
      dataPerPage: dataPerPage,
      filterParameter: filterParameter,
    };
    const paginateData = await TicketService.viewAllTicketPaginate(paginate);
    setOutput(paginateData.data);
  }

  function statusDropDownChange(data: any) {
    const status = data.target.value;
    setStatusParam(status)
  }

  function titleInputChange(data: any){
    setTitleContentParam(data.target.value)
  }

  function creationStartDateInputChange(data: any){
    const date = data.target.value;
    const ISOdate = date === '' ? '' : new Date(date).toISOString().substring(0, 10);
    setCreationStartDateParam(ISOdate);
  }

  function creationEndDateInputChange(data: any){
    const date = data.target.value;
    const ISOdate = date === '' ? '' : new Date(date).toISOString().substring(0, 10);
    setCreationEndDateParam(ISOdate);
  }

  function doneStartDateInputChange(data: any){
    const date = data.target.value;
    const ISOdate = date === '' ? '' : new Date(date).toISOString().substring(0, 10);
    setDoneStartDateParam(ISOdate);
  }

  function doneEndDateInputChange(data: any){
    const date = data.target.value;
    const ISOdate = date === '' ? '' : new Date(date).toISOString().substring(0, 10);
    setDoneEndDateParam(ISOdate);
  }

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    
    const creationRangeDate: RangeDate = {
      startDate: creationStartDateParam,
      endDate: creationEndDateParam
    }

    const doneRangeDate: RangeDate = {
      startDate: doneStartDateParam,
      endDate: doneEndDateParam
    }

    const filterParameter: FilterParameter = {
      status: statusParam,
      title: titleContentParam,
      keyword: textFilter,
      creationTimeRange: creationRangeDate,
      doneTimeRange: doneRangeDate
    };
    const length = await TicketService.getAllTicketLength(filterParameter);
    setCountData(length.data)
    
    console.log("length: " + length.data);
    const thePage = 1;
    setCurrPage(thePage-1);
    const paginate: PaginateTicketParameter = {
      page: thePage,
      dataPerPage: dataPerPage,
      filterParameter: filterParameter
    };
    
    const paginateData = await TicketService.viewAllTicketPaginate(paginate);

    setOutput(paginateData.data);
  };

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
            forcePage={currPage}
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

          <div>

          <form onSubmit={onSubmit}>
            <Input
                id="search-full-text"
                name="search-full-text"
                onChange={(e) => {
                  setTextFilter(e.target.value);
                }}
                type="text"
                className="border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md hover:shadow-md focus:shadow-md focus:ring-0 focus:outline-none focus:border-slate-400 mr-2 w-full text-lg"
                placeholder='Search...'
                defaultValue={''}
              />

            <DisclosureCard
                defaultOpen={false}
                className={'w-full h-min mb-2.5 rounded'}
                title="Filter"
            >
              <select
                className="border-2 border-gray-300 border-solid w-full max-w-sm px-2 py-2.5 rounded-md text-gray-500 my-3"
                name=""
                id=""
                value={statusParam}
                onChange={statusDropDownChange}
              >
                <option value="ALL STATUS">ALL STATUS</option>
                <option value="CLOSED">CLOSED</option>
                <option value="PENDING">PENDING</option>
                <option value="ONGOING">ONGOING</option>

              </select>

              <Input
                onChange={titleInputChange}
                type="text"
                placeholder="Title or Content"
              />

              <p>Creation Time</p>
              <Input
                onChange={creationStartDateInputChange}
                type="date"
              />
              -
              <Input
                onChange={creationEndDateInputChange}
                type="date"
              />

              <Button
                  type="submit"
                  className={'hover:bg-sky-700 bg-sky-600 text-white'}>
                  Filter
              </Button>
            </DisclosureCard>
          </form>

            <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
              <TicketWithDetailsStack
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

export default ViewAllTickets;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            allTickets: await TicketPresenter.getAllTickets({
              user: req.session.user,
              limit: 5,
            }, 'ALL STATUS', '', '', '', '', '', ''),
            allTicketsLength: await TicketPresenter.getAllTicketsLength('ALL STATUS', '', '', '', '', '', ''),
          }
        : {},
    };
  },
  ironSessionOptions
);
