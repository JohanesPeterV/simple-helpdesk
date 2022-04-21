import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment, FunctionComponent, HTMLAttributes } from 'react';
import Router from 'next/router';
import { DropdownProps } from '../models/dropdown/dropdown-props';

const NavigationDropdown: FunctionComponent<DropdownProps> = ({
  label,
  links,
  className,
}) => (
  <Menu
    as="div"
    className={`-m-3 flex flex-col rounded-lg hover:bg-gray-50 ${className}`}
  >
    <Menu.Button
      type="button"
      className="flex ml-4 p-3 text-base font-medium text-gray-900"
      aria-expanded="false"
    >
      <span>{label}</span>
      <ChevronDownIcon
        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-sky-200"
        aria-hidden="true"
      />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items>
        {links.map((link) => (
          <Menu.Item key={link.path}>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-sky-500 text-white' : 'text-gray-900'
                } group flex rounded-md items-center w-full px-12 py-2 text-sm`}
                onClick={() => {
                  Router.push(link.path);
                }}
              >
                {link.label}
              </button>
            )}
          </Menu.Item>
        ))}
        {/*</div>*/}
      </Menu.Items>
    </Transition>
  </Menu>
);

export default NavigationDropdown;
