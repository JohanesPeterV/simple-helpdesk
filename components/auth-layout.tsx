import { FunctionComponent, HTMLAttributes } from 'react';
import Navbar from './web-structure/navbar';
import BaseLayout from './base-layout';
import Header from './web-structure/header';

const AuthLayout: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => (
  <BaseLayout>
    <Header />
    <Navbar />
    <div id="popup-modal-root" />
    {children}
  </BaseLayout>
);

export default AuthLayout;
