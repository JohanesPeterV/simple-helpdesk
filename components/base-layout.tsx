import { FunctionComponent, HTMLAttributes } from 'react';
import Head from 'next/head';

const BaseLayout: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => (
  <>
    <Head>
      <title>RnD Helpdesk</title>
    </Head>

    {children}
  </>
);

export default BaseLayout;
