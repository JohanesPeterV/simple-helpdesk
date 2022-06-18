import { FunctionComponent, HTMLAttributes } from 'react';

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div
    {...rest}
    className={`py-8 px-6 md:px-16 py-2 w-full min-w-full ${className}`}
  >
    {children}
  </div>
);

export default Container;
