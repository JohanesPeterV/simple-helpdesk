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
    <div className="hidden lg:block">{desktopChild}</div>
    <div className="block lg:hidden">{mobileChild}</div>
  </>
);

export default ResponsiveMobile;
