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
  }, [props.ticketGrouping]);

  return (
    <Container>
      {ticketGrouping ? (
        <div className="flex flex-col space-y-8  justify-start">
          <div className="flex flex-col lg:flex-row w-full justify-start space-y-4 lg:space-y-0 lg:space-x-4">
            <DisclosureCard
              defaultOpen={true}
              className={'w-full h-min'}
              title="Ongoing Tickets"
            >
              <TicketStack
                title="Ongoing Tickets"
                tickets={ticketGrouping.ongoingTickets}
              />
            </DisclosureCard>

            <DisclosureCard
              defaultOpen={true}
              className={'w-full h-min'}
              title="Pending Tickets"
            >
              <TicketStack
                title="Pending Tickets"
                tickets={ticketGrouping.pendingTickets}
              />
            </DisclosureCard>
          </div>
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
