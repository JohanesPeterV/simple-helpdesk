import { FunctionComponent, HTMLAttributes } from 'react';

const ConditionComponent: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & { condition: boolean }
> = ({ condition, children }) => {
  if (condition) {
    return <div>{children}</div>;
  }
  return <></>;
};

export default ConditionComponent;
