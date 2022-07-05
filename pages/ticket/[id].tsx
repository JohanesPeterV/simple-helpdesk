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
import Button from '../../components/button';
import { FormEventHandler, useState } from 'react';
import TicketService from '../../services/ticket-service';
import { toast } from 'react-hot-toast';
import Router from 'next/router';
import Input from '../../components/input';
import ConditionComponent from '../../components/condition-component';
import { CreateTicketDetailDTO } from '../../models/dto/create-ticket-detail-dto';

interface TicketDetailProp {
  ticket: Ticket;
  admins: Admin[];
  selectedAdmin: Admin;
}

const Id: NextPage<TicketDetailProp> = ({ ticket, admins, selectedAdmin }) => {
  const [content, setContent] = useState('');

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const ticketDetail: CreateTicketDetailDTO = {
      title: 'RE#' + ticket.ticketDetails.length + ' : ' + ticket.ticketDetails[0].title,
      content: content,
      headerId: ticket.id
    };

    await toast.promise(TicketService.createDetail(ticketDetail), {
      loading: 'Replying...',
      success: 'Reply Success',
      error: 'Reply failed',
    });
    await Router.reload();
  };

  return ticket ? (
    <>
      <Container className="flex flex-row ">
        <div className="md:w-60 lg:w-1/2 flex-auto">
          <section aria-labelledby="applicant-information-title">
            <TicketInformation ticket={ticket} />
          </section>
          <section aria-labelledby="notes-title">
            <TicketDetail ticketDetails={ticket.ticketDetails} />
          </section>

          <form
            onSubmit={onSubmit}
            className="px-4 sm:px-6 pb-6 h-40 mb-20 space-y-3 space-y-6"
          >
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Reply Ticket
            </label>
            <Input
              id="reply-content"
              name="reply-content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              type="textarea"
              className="border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md h-full w-full pl-2 pt-2 hover:shadow-md focus:shadow-md focus:ring-0 focus:outline-none focus:border-slate-400"
              defaultValue={''}
            />
            <div className="flex flex-col items-end">
              <Button
                className={
                  'bg-sky-600 text-white font-bold hover:bg-sky-700 px-10 py-2'
                }
                type="submit"
              >
                Reply
              </Button>
            </div>
          </form>
        </div>
        <ConditionComponent condition={!!admins}>
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
        </ConditionComponent>
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
