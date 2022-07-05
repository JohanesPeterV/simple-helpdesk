import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Container from '../components/container';
import { ironSessionOptions } from '../lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import { TicketGrouping } from '../models/ticket/ticket-grouping';
import TicketPresenter from '../presenters/ticket-presenter';
import TicketStack from '../components/ticket/ticket-stack';
import DisclosureCard from '../components/disclosure-card';
import SectionCard from '../components/section-card';

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
        <div className="flex flex-col space-y-8  justify-start">
          {/*<DisclosureCard*/}
          {/*  title={'Ongoing Tickets'}*/}
          {/*  titleClassName=""*/}
          {/*  defaultOpen={true}*/}
          {/*  className="h-fit "*/}
          {/*>*/}
          {/*  <TicketStack*/}
          {/*    title="Ongoing Tickets"*/}
          {/*    tickets={ticketGrouping.ongoingTickets}*/}
          {/*  />*/}
          {/*</DisclosureCard>*/}
          {/*<DisclosureCard*/}
          {/*  title={'Pending Tickets'}*/}
          {/*  titleClassName=""*/}
          {/*  defaultOpen={true}*/}
          {/*  className="h-fit "*/}
          {/*>*/}
          {/*  <TicketStack*/}
          {/*    title="Pending Tickets"*/}
          {/*    tickets={ticketGrouping.pendingTickets}*/}
          {/*  />*/}
          {/*</DisclosureCard>*/}
          <div className="flex w-full justify-start space-x-4">
            <SectionCard title="Ongoing Tickets">
              <TicketStack
                title="Ongoing Tickets"
                tickets={ticketGrouping.ongoingTickets}
              />
            </SectionCard>

            <SectionCard title="Pending Tickets">
              <TicketStack
                title="Pending Tickets"
                tickets={ticketGrouping.pendingTickets}
              />
            </SectionCard>
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
