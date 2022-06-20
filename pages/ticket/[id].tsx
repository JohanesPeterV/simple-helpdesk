import type { NextPage } from 'next';
import Container from '../../components/container';
import { withIronSessionSsr } from 'iron-session/next';
import TicketPresenter from '../../presenters/ticket-presenter';
import { ironSessionOptions } from '../../lib/session';
import TicketInformation from '../../components/ticket/ticket-information';
import TicketDetail from '../../components/ticket/ticket-detail';
import AdminPresenter from '../../presenters/admin-presenter';
import { Ticket } from '../../models/ticket/ticket';
import { Admin } from '@prisma/client';
import ManageTicketFormDesktop from '../../components/manage-ticket/manage-ticket-form-desktop';
import ResponsiveMobile from '../../components/responsive-mobile';
import ManageTicketFormMobile from '../../components/manage-ticket/manage-ticket-form-mobile';

interface TicketDetailProp {
  ticket: Ticket;
  admins: Admin[];
  selectedAdmin: Admin;
}

const Id: NextPage<TicketDetailProp> = ({ ticket, admins, selectedAdmin }) => {
  return ticket ? (
    <>
      <Container className="flex flex-row ">
        <div className="md:w-60 lg:w-1/2 flex-auto ">
          <section aria-labelledby="applicant-information-title">
            <TicketInformation ticket={ticket} />
          </section>
          <section aria-labelledby="notes-title">
            <TicketDetail ticketDetails={ticket.ticketDetails} />
          </section>
        </div>
        {admins ? (
          <ResponsiveMobile
            desktopChild={
              <ManageTicketFormDesktop
                admins={admins}
                selectedAdmin={selectedAdmin}
                ticket={ticket}
              />
            }
            mobileChild={
              <ManageTicketFormMobile
                admins={admins}
                selectedAdmin={selectedAdmin}
                ticket={ticket}
              />
            }
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
          Ticket don&apos;t exist or you don&apos;t have the permission.
        </h1>
      </div>
    </Container>
  );
};

export default Id;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    if (!req.session.user || !query.id) {
      return {
        props: {},
      };
    }
    const ticket = await TicketPresenter.get(
      req.session.user,
      query.id.toString()
    );

    const admins = await AdminPresenter.getActiveAdmins();

    let selectedAdmin = getCurrentTicketSelectedAdmin({
      ticket: ticket,
      admins: admins,
      userName: req.session.user?.username,
    });

    if (ticket && ticket.admin) {
      selectedAdmin = ticket.admin;
      if (admins) {
        selectedAdmin = admins.find(
          (admin) => admin.username === req.session.user?.username
        );
      }
    }
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

function getCurrentTicketSelectedAdmin(parameterObject: {
  ticket?: Ticket | null;
  admins?: Admin[];
  userName: string;
}) {
  if (parameterObject.ticket && parameterObject.ticket.admin) {
    return parameterObject.ticket.admin;
  }
  if (parameterObject.admins) {
    return parameterObject.admins.find(
      (admin) => admin.username === parameterObject.userName
    );
  }
  return null;
}
