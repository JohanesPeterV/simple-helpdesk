import {
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
} from 'react';
import { Admin } from '@prisma/client';
import { Ticket } from '../models/ticket/ticket';

interface ResponsiveMobileProps {
  desktopChild: ReactElement;
  mobileChild: ReactElement;
}

const ResponsiveMobile: FunctionComponent<ResponsiveMobileProps> = ({
  desktopChild,
  mobileChild,
}) => (
  <>
    <div className="invisible lg:visible">{desktopChild}</div>
    <div className="visible lg:invisible">{mobileChild}</div>
  </>
);

export default ResponsiveMobile;
