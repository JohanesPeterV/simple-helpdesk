import { FunctionComponent, HTMLAttributes } from 'react';
import BaseLayout from './base-layout';

const GuestLayout: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => <BaseLayout>{children}</BaseLayout>;

export default GuestLayout;
