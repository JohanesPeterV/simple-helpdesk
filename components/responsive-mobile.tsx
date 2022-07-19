import { FunctionComponent, ReactElement } from 'react';
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
