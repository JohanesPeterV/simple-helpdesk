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

  useEffect(() => {
    setClosedTickets(props.closedTickets);
  }, []);

  return (
    <Container className="">
      {closedTickets ? (
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
          <TicketStack
            title={'Ticket History'}
            tickets={closedTickets}
            className={'w-full'}
          />
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
