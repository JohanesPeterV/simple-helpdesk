import { FunctionComponent, HTMLAttributes } from 'react';

const Card: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [
    'transition',
    'border',
    'bg-white',
    'border-slate-300',
    'rounded-2xl',
    'p-6',
    'shadow hover:shadow-md',
  ].join(' ');

  return (
    <div {...rest} className={`${classNames} ${className}`}>
      {children}
    </div>
  );
};

export default Card;