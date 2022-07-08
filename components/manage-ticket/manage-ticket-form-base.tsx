import { FormEventHandler, Fragment, FunctionComponent, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Admin } from '@prisma/client';
import Button from '../button';
import TicketService from '../../services/ticket-service';
import Router from 'next/router';
import { Ticket } from '../../models/ticket/ticket';
import { toast } from 'react-hot-toast';

interface ManageTicketFormProps {
  admins: Admin[];
  selectedAdmin: Admin;
  ticket: Ticket;
}

const ManageTicketFormBase: FunctionComponent<ManageTicketFormProps> = ({
  admins,
  selectedAdmin,
  ticket,
}) => {
  const [selected, setSelected] = useState(selectedAdmin);
  const noPIC = !ticket.admin;
  const updateCurrentPIC =
    ticket.admin && selected.username !== ticket.admin.username;
  const onSubmit: FormEventHandler = async () => {
    const assignPICDTO = {
      adminId: selected.id,
      ticketId: ticket.id,
    };
    await toast.promise(TicketService.assignPIC(assignPICDTO), {
      loading: 'Assigning PIC',
      success: 'Assign PIC success',
      error: 'Assign PIC failed. Please try again.',
    });
    await Router.push('/');
  };
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-2 pt-2">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Assign PIC to ticket
              </Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                  <span className="block truncate">{selected.username}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {admins.map((admin) => (
                      <Listbox.Option
                        key={admin.id}
                        className={({ active }) =>
                          (active ? 'text-white bg-sky-600' : 'text-gray-900') +
                          ' cursor-default select-none relative py-2 pl-3 pr-9'
                        }
                        value={admin}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={
                                (selected ? 'font-semibold' : 'font-normal') +
                                ' block truncate'
                              }
                            >
                              {admin.username}
                            </span>

                            {selected ? (
                              <span
                                className={
                                  (active ? 'text-white' : 'text-sky-600') +
                                  ' absolute inset-y-0 right-0 flex items-center pr-4'
                                }
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <div className="mt-4 border-t border-gray-200">
          <Button
            type="submit"
            className={
              (!noPIC && !updateCurrentPIC
                ? 'bg-gray-400'
                : 'hover:bg-sky-700 bg-sky-600') + ' text-white w-full'
            }
            disabled={!noPIC && !updateCurrentPIC}
          >
            Assign
          </Button>
        </div>
      </form>

      <div className="space-y-2 mt-4">
        <div className="block text-sm font-medium text-gray-700">
          Delete Ticket
        </div>
        <Button
          type="submit"
          className="hover:bg-red-700 bg-red-600 text-white w-full"
          onClick={async () => {
            await toast.promise(TicketService.delete(ticket), {
              loading: 'Deleting Ticket...',
              success: 'Delete ticket success',
              error: 'Delete ticket failed. Please try again.',
            });
            await Router.push('/');
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
};
export default ManageTicketFormBase;
