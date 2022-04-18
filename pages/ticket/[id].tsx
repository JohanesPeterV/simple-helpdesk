import type { NextPage } from 'next';
import Container from '../../components/container';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import TicketController from '../../controllers/ticket-controller';
import { ironSessionOptions } from '../../lib/session';
import { TicketProp } from '../../models/props/ticket-prop';
import TicketInformation from '../../components/ticket/ticket-information';
import TicketDetail from '../../components/ticket/ticket-detail';

const Id: NextPage<TicketProp> = ({ ticket }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container className="space-y-4">
      <section aria-labelledby="applicant-information-title">
        <TicketInformation ticket={ticket} />
      </section>
      <section aria-labelledby="notes-title">
        <TicketDetail ticketDetails={ticket.ticketDetails} />
      </section>
    </Container>
  );
};

export default Id;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    return {
      props:
        req.session.user && query.id
          ? {
              ticket: await TicketController.get(
                req.session.user,
                query.id.toString()
              ),
            }
          : {},
    };
  },
  ironSessionOptions
);
