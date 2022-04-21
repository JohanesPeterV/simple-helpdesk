import type { NextPage } from 'next';
import Container from '../../components/container';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import TicketController from '../../controllers/ticket-controller';
import { ironSessionOptions } from '../../lib/session';
import { TicketProp } from '../../models/props/ticket-prop';
import TicketInformation from '../../components/ticket/ticket-information';
import TicketDetail from '../../components/ticket/ticket-detail';
import { Else, If, Then } from 'react-if';

const Id: NextPage<TicketProp> = ({ ticket }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container className="space-y-4">
      {ticket ? (
        <>
          <section aria-labelledby="applicant-information-title">
            <TicketInformation ticket={ticket} />
          </section>
          <section aria-labelledby="notes-title">
            <TicketDetail ticketDetails={ticket.ticketDetails} />
          </section>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="lg:text-2xl md:text-xl sm:text-lg">
            Ticket doesn't exist or you don't have the permission.
          </h1>
        </div>
      )}
    </Container>
  );
};

export default Id;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query, res }) {
    return {
      props: {
        ticket:
          req.session.user && query.id
            ? await TicketController.get(req.session.user, query.id.toString())
            : null,
      },
    };
  },
  ironSessionOptions
);
