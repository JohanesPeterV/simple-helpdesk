import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment, FunctionComponent, HTMLAttributes, RefObject } from 'react';
import Router from 'next/router';
import { DropdownProps } from '../models/dropdown/dropdown-props';

const MobileNavigationDropdown: FunctionComponent<
  DropdownProps & { activePath: string; callback: Function }
> = ({ label, links, className, labelClassName, activePath, callback }) => (
  <Menu as="div" className={`group -m-3 flex flex-col rounded-lg ${className}`}>
    <Menu.Button
      type="button"
      className="flex ml-4 p-3 text-base font-medium text-gray-900 "
      aria-expanded="false"
    >
      <span className={`group-hover:text-sky-500 ${labelClassName}`}>
        {label}
      </span>
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
                onClick={() => {
                  Router.push(link.path);
                  callback(link.path);
                }}
                className={`${
                  active ? 'text-sky-500' : 'text-gray-900'
                } flex rounded-md items-center w-full px-12 py-2 text-sm ${
                  link.path === activePath ? 'text-sky-600' : ''
                }`}
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

export default MobileNavigationDropdown;
