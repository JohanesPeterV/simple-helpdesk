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
        type="submit"
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
            className="p-4 flex flex-col justify-center items-center"
            title="Manage Ticket"
          >
            {children}
            <h1 className=" text-md font-semibold">Are you sure ?</h1>
            <h1 className="pb-4 text-lg  font-light">{message}</h1>
            <div className="flex w-full justify-center space-x-2">
              <Button
                className=""
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <div>
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
