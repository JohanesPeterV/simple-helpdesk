import { FunctionComponent, HTMLAttributes } from 'react';
import Header from './header';
import BaseLayout from './base-layout';

const AuthLayout: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => (
  <BaseLayout>
    <Header />

    <div id="popup-modal-root" />
    {children}
  </BaseLayout>
);

export default AuthLayout;
