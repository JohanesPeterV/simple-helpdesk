import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PopupProps = {
  show: boolean;
  className: string;
  closeCallback: Function;
} & HTMLAttributes<HTMLDivElement>;
const PopupModal: FunctionComponent<PopupProps> = ({
  className,
  children,
  show,
  closeCallback,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  if (show && isBrowser) {
    const popupRoot = document.getElementById('popup-modal-root');
    if (popupRoot != null) {
      return ReactDOM.createPortal(
        <div className="fixed w-screen min-h-screen flex top-0 right-0 left-0 z-30 justify-center items-center">
          <div className={`fixed flex justify-center z-50 ${className}`}>
            {children}
          </div>
          <div
            onClick={() => {
              closeCallback();
            }}
            className="fixed z-40 w-screen min-h-screen bg-black bg-opacity-50 flex top-0 right-0 left-0 z-50 justify-center items-center"
          ></div>
        </div>,
        popupRoot
      );
    }
    return null;
  }
  return null;
};

export default PopupModal;
