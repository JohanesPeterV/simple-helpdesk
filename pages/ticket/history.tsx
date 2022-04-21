import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from '../../components/container';
import { ironSessionOptions } from '../../lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import { TicketGrouping } from '../../models/ticket/ticket-grouping';
import TicketController from '../../controllers/ticket-controller';
import { Ticket } from '../../models/ticket/ticket';
import TicketStack from '../../components/ticket/ticket-stack';

interface HistoryProps {
  closedTickets: Ticket[];
}

const History: NextPage<HistoryProps> = (props) => {
  const [closedTickets, setClosedTickets] = useState<Ticket[]>();
  const [input, setInput]  = useState('')
  const [output, setOutput] = useState<Ticket[] | undefined>();

  useEffect(() => {
    setClosedTickets(props.closedTickets);
    setOutput(props.closedTickets)
  }, [closedTickets]);

  useEffect(() => {
    setOutput([])
    closedTickets?.filter(val => {
      if(val.admin?.username.toLowerCase().includes(input.toLowerCase())){
        setOutput(output => [...output ?? [], val])
      }
    })

  }, [input])
  return (
    <Container className="">
      {output ? (
        <div>
          <div className='mb-6'>
            <input onChange={e => setInput(e.target.value)} className='py-2 px-4 border-2 border-gray-300 rounded-md' type="text" placeholder='Search by Admin'/>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
            <TicketStack
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
export default History;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            closedTickets: await TicketController.getClosedTickets(
              req.session.user
            ),
          }
        : {},
    };
  },
  ironSessionOptions
);
