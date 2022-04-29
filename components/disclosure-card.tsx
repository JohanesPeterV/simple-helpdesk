import { FunctionComponent, HTMLAttributes, ReactElement } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Else, If, Then } from 'react-if';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Card from './card';

type DisclosureProp = {
  title: string;
  defaultOpen: boolean;
  className: string;
} & HTMLAttributes<HTMLDivElement>;

const DisclosureCard: FunctionComponent<DisclosureProp> = ({
  title,
  defaultOpen,
  className,
  children,
}) => (
  <Card className={className}>
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full">
            <h2 className="flex items-center text-left text-xl font-bold ">
              <If condition={open}>
                <Then>
                  <ChevronDownIcon className="h-6 w-6" />
                </Then>
                <Else>
                  <ChevronRightIcon className="h-6 w-6" />
                </Else>
              </If>
              <span className="ml-2">{title}</span>
            </h2>
          </Disclosure.Button>

          <Transition
            enter="transition"
            enterFrom="transform -translate-y-4 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-4 opacity-0"
          >
            <Disclosure.Panel className="mt-4 border-t border-gray-200 ">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  </Card>
);

export default DisclosureCard;
