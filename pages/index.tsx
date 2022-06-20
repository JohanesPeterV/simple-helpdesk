import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from '../components/container';
import { ironSessionOptions } from '../lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import { TicketGrouping } from '../models/ticket/ticket-grouping';
import TicketPresenter from '../presenters/ticket-presenter';
import TicketStack from '../components/ticket/ticket-stack';
import DisclosureCard from '../components/disclosure-card';

interface TicketGroupingProp {
  ticketGrouping: TicketGrouping;
}

const Home: NextPage<TicketGroupingProp> = (props) => {
  const [ticketGrouping, setTicketGrouping] = useState<TicketGrouping>();

  useEffect(() => {
    setTicketGrouping(props.ticketGrouping);
  }, []);

  return (
    <Container>
      {ticketGrouping ? (
        <div className="flex flex-col xl:flex-row xl:space-x-8 space-y-8 xl:space-y-0 justify-start">
          <DisclosureCard
            title={'Ongoing Tickets'}
            titleClassName=""
            defaultOpen={true}
            className="h-fit xl:w-1/2"
          >
            <TicketStack
              title="Ongoing Tickets"
              tickets={ticketGrouping.ongoingTickets}
            />
          </DisclosureCard>
          <DisclosureCard
            title={'Ongoing Tickets'}
            titleClassName=""
            defaultOpen={true}
            className="h-fit xl:w-1/2"
          >
            <TicketStack
              title="Pending Tickets"
              tickets={ticketGrouping.pendingTickets}
            />
          </DisclosureCard>
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
            ticketGrouping:
              await TicketPresenter.getPendingAndOngoingTicketsGroup(
                req.session.user,
                10
              ),
          }
        : {},
    };
  },
  ironSessionOptions
);
