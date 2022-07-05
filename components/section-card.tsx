import { FunctionComponent, HTMLAttributes, ReactElement } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Else, If, Then } from 'react-if';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Card from './card';

type DisclosureProp = {
  title: string;
  titleClassName?: string;
  defaultOpen?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const SectionCard: FunctionComponent<DisclosureProp> = ({
  title,
  defaultOpen,
  className,
  children,
}) => (
  <Card className={`px-0 pt-2 pb-2 divide-y-2 w-full ${className}`}>
    <div className="px-8 py-4 flex items-center text-left  md:text-lg font-semibold">
      {title}
    </div>
    <div className="px-6 py-4">{children}</div>
  </Card>
);

export default SectionCard;
