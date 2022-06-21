import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

const ConditionComponent: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & { condition: boolean }
> = ({ condition, children, ...rest }) => {
  if (condition) {
    return <div>{children}</div>;
  }
  return <></>;
};

export default ConditionComponent;
