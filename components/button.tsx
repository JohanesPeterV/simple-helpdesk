import {
  ButtonHTMLAttributes,
  ComponentProps,
  ComponentType,
  FunctionComponent,
} from 'react';

const Button: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & Props
> = ({ children, className, disabled, iconType, onClick, ...rest }) => {
  return (
    <button
      {...rest}
      className={[
        'flex',
        'justify-center',
        'items-center',
        'transition',
        'cursor-pointer',
        'outline-0',
        'border',
        'rounded-md',
        'px-4',
        'py-2',
        'shadow',
        'hover:shadow-md',
        'focus:shadow-md',
        'active:shadow-lg',
        className,
      ].join(' ')}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </button>
  );
};

export default Button;

interface Props {
  disabled?: boolean;
  iconType?: 'solid' | 'outline';
}
