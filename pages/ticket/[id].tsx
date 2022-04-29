import type { NextPage } from 'next';
import Container from '../../components/container';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import TicketController from '../../controllers/ticket-controller';
import { ironSessionOptions } from '../../lib/session';
import TicketInformation from '../../components/ticket/ticket-information';
import TicketDetail from '../../components/ticket/ticket-detail';
import Button from '../../components/button';
import Card from '../../components/card';
import AdminController from '../../controllers/admin-controller';
import { Ticket } from '../../models/ticket/ticket';
import { Admin } from '@prisma/client';
import ManageTicketForm from '../../components/manage-ticket-form';

interface TicketDetailProp {
  ticket: Ticket;
  admins: Admin[];
  selectedAdmin: Admin;
}

const Id: NextPage<TicketDetailProp> = ({ ticket, admins, selectedAdmin }) => {
  const router = useRouter();
  const { id } = router.query;
  return ticket ? (
    <>
      <Container className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex-auto ">
          <section aria-labelledby="applicant-information-title">
            <TicketInformation ticket={ticket} />
          </section>
          <section aria-labelledby="notes-title">
            <TicketDetail ticketDetails={ticket.ticketDetails} />
          </section>
        </div>
        {admins ? (
          <ManageTicketForm
            admins={admins}
            selectedAdmin={selectedAdmin}
            ticket={ticket}
          />
        ) : (
          <></>
        )}
      </Container>
    </>
  ) : (
    <Container className="space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="lg:text-2xl md:text-xl sm:text-lg">
          Ticket doesn't exist or you don't have the permission.
        </h1>
      </div>
    </Container>
  );
};

export default Id;

function test() {}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    if (!req.session.user || !query.id) {
      return {
        props: {},
      };
    }
    const ticket = await TicketController.get(
      req.session.user,
      query.id.toString()
    );

    const admins = await AdminController.getActiveAdmins();
    const selectedAdmin =
      ticket && ticket.admin
        ? ticket.admin
        : admins
        ? admins.find((admin) => admin.username === req.session.user?.username)
        : admins[0];
    return {
      props: {
        ticket: ticket,
        ...(req.session.user.role === 'admin'
          ? {
              admins: admins,
              selectedAdmin: selectedAdmin,
            }
          : {}),
      },
    };
  },
  ironSessionOptions
);
