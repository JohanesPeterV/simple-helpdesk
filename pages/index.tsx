import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from '../components/container';
import { ironSessionOptions } from '../lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import { TicketGrouping } from '../models/ticket/ticket-grouping';
import TicketPresenter from '../presenters/ticket-presenter';
import TicketStack from '../components/ticket/ticket-stack';
import TicketController from '../controllers/ticket-controllers';

interface HomeProps {
  ticketGrouping: TicketGrouping;
}

const Home: NextPage<HomeProps> = (props) => {
  const [ticketGrouping, setTicketGrouping] = useState<TicketGrouping>();

  useEffect(() => {
    setTicketGrouping(props.ticketGrouping);
  }, []);

  return (
    <Container className="sm:px-12 px-2.5">
      {ticketGrouping ? (
        <div className="flex flex-col xl:flex-row xl:space-x-8 space-y-8 xl:space-y-0 justify-start">
          <TicketStack
            title={'Ongoing Tickets'}
            tickets={ticketGrouping.ongoingTickets}
            className={'xl:w-1/2'}
            useDisclosure={true}
          />
          <TicketStack
            title={'Pending Tickets'}
            tickets={ticketGrouping.pendingTickets}
            className={'xl:w-1/2'}
            useDisclosure={true}
          />
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default Home;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            ticketGrouping: await TicketController.getTicketsGroup(
              req.session.user
            ),
          }
        : {},
    };
  },
  ironSessionOptions
);
