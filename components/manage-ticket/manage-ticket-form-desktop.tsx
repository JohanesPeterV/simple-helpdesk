import { FunctionComponent } from 'react';
import { Admin } from '@prisma/client';
import { Ticket } from '../../models/ticket/ticket';
import DisclosureCard from '../disclosure-card';
import ManageTicketFormBase from './manage-ticket-form-base';

interface ManageTicketFormProps {
  admins: Admin[];
  selectedAdmin: Admin;
  ticket: Ticket;
}

const ManageTicketFormDesktop: FunctionComponent<ManageTicketFormProps> = ({
  admins,
  selectedAdmin,
  ticket,
}) => {
  return (
    <div className="lg:w-72">
      <DisclosureCard
        titleClassName="text-sm "
        className="p-4"
        title="Manage Ticket"
        defaultOpen={true}
      >
        <ManageTicketFormBase
          ticket={ticket}
          selectedAdmin={selectedAdmin}
          admins={admins}
        />
      </DisclosureCard>
    </div>
  );
};
export default ManageTicketFormDesktop;
