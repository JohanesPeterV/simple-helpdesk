// import { IconName } from '../../types/hero-icon-name';
import LoadingIcon from './loading-icon';
import dynamic from 'next/dynamic';
import {
    ButtonHTMLAttributes,
    ComponentProps,
    ComponentType,
    FunctionComponent,
} from 'react';
import {Else, If, Then} from 'react-if';

interface Props {
    isLoading?: boolean;
    iconType?: 'solid' | 'outline';
}

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement> & Props> =
    ({
         children,
         className,
         isLoading,
         iconType,
         onClick,
         ...rest
     }) => {

        let Icon: ComponentType<ComponentProps<'svg'>> = () => <></>;

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
                    'rounded',
                    'px-4',
                    'py-2',
                    'shadow',
                    'hover:shadow-md',
                    'focus:shadow-md',
                    'active:shadow-lg',
                    isLoading ? 'animate-pulse' : '',
                    className,
                ].join(' ')}
                disabled={isLoading}
                onClick={e => {
                    e.stopPropagation();
                    if (onClick) onClick(e);
                }}
            >
                {children}
            </button>
        );
    };

export default Button;
