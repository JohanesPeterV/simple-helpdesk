import { FunctionComponent, useState } from 'react';
import { Admin } from '@prisma/client';
import { Ticket } from '../../models/ticket/ticket';
import ManageTicketFormBase from './manage-ticket-form-base';
import Card from '../card';
import Button from '../button';
import PopupModal from '../popup-modal';

interface ManageTicketFormProps {
  admins: Admin[];
  selectedAdmin: Admin;
  ticket: Ticket;
}

const ManageTicketFormMobile: FunctionComponent<ManageTicketFormProps> = ({
  admins,
  selectedAdmin,
  ticket,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 ">
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-full bg-sky-600 p-0 text-white rounded-none"
      >
        Manage Ticket
      </Button>
      <PopupModal
        className="w-80"
        show={showModal}
        closeCallback={() => {
          setShowModal(false);
        }}
      >
        <div className="w-full">
          <Card className="p-4" title="Manage Ticket">
            <ManageTicketFormBase
              ticket={ticket}
              selectedAdmin={selectedAdmin}
              admins={admins}
            />
          </Card>
        </div>
      </PopupModal>
    </div>
  );
};
export default ManageTicketFormMobile;
