import { FunctionComponent, HTMLAttributes, useState } from 'react';
import Card from '../card';
import Button from '../button';
import PopupModal from '../popup-modal';

interface ConfirmationButtonProps {
  label: string;
  message: string;
  className: string;
  callback: Function;
}

const ConfirmationButton: FunctionComponent<
  ConfirmationButtonProps & HTMLAttributes<HTMLDivElement>
> = ({ children, label, message, className, callback }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        type="button"
        className={className}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {label}
      </Button>
      <PopupModal
        className="w-80"
        show={showModal}
        closeCallback={() => {
          setShowModal(false);
        }}
      >
        <div className="w-full">
          <Card
            className=" p-4 py-6 flex flex-col justify-center items-center"
            title="Manage Ticket"
          >
            {children}
            <h1 className="text-xl font-semibold">Confirmation</h1>
            <h1 className="pb-4 text-lg  font-light">{message}</h1>
            <div className="flex w-full justify-center space-x-2">
              <div className="w-1/2">
                <Button
                  className={className}
                  onClick={() => {
                    callback();
                  }}
                >
                  {label}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </PopupModal>
    </>
  );
};
export default ConfirmationButton;
