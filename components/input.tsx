import { FunctionComponent, InputHTMLAttributes } from 'react';

const Input: FunctionComponent<
  InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
> = (props) => {
  const classNames = [
    'transition',
    'rounded-lg',
    'placeholder-zinc-400',
    'caret-zinc-400',
    'border-slate-300',
    'focus:border-slate-400',
    'shadow',
    'hover:shadow-md',
    'focus:shadow-md',
    'focus:ring-0',
    'focus:outline-none',
    'py-2',
    'px-2',
    'font-medium',
  ].join(' ');

  const { children, className, type, value } = props;

  switch (type) {
    case 'select':
      return (
        <select {...props} className={`${classNames} ${className}`}>
          {children}
        </select>
      );

    case 'textarea':
      return (
        <textarea {...props} rows={7} className={`${classNames} ${className}`}>
          {value}
        </textarea>
      );
  }

  return <input {...props} className={`${classNames} ${className}`} />;
};

export default Input;
