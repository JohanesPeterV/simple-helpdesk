import { ChevronDownIcon } from '@heroicons/react/solid';
import { FunctionComponent, HTMLAttributes } from 'react';
import Router from 'next/router';
import { DropdownProps } from '../models/dropdown/dropdown-props';

const NavigationDropdown: FunctionComponent<DropdownProps> = ({
  label,
  links,
  className,
  labelClassName,
}) => (
  <div className={'group pb-4 ' + className}>
    <div className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none ">
      <p className={`group-hover:text-sky-500 ${labelClassName}`}>{label}</p>
      <ChevronDownIcon
        className="w-5 h-5 ml-2 -mr-1 text-violet-200 group-hover:text-sky-500 "
        aria-hidden="true"
      />
    </div>
    <div className="relative">
      <div className="hidden transition-all delay-500 group-hover:block transition-all absolute -left-4 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="">
          {links.map((link) => (
            <div key={link.path}>
              <button
                className="hover:text-sky-500 bg-white hover:bg-neutral-50 font-medium text-gray-900 group flex rounded-md items-center w-full px-5 py-3 text-sm"
                onClick={() => {
                  Router.push(link.path);
                }}
              >
                {link.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default NavigationDropdown;
