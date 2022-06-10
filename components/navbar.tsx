import { Fragment, FunctionComponent, HTMLAttributes } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { Transition, Popover } from '@headlessui/react';
import NavigationDropdown from './navigation-dropdown';
import AuthService from '../services/auth-service';
import { useRouter } from 'next/router';
import MobileNavigationDropdown from './mobile-navigation-dropdown';
import { route } from 'next/dist/server/router';

const navigations = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Ticket',
    child: [
      {
        label: 'Create Ticket',
        path: '/ticket/create',
      },
      {
        label: 'Ticket History',
        path: '/ticket/history',
      },
      {
        label: 'View All Tickets',
        path: '/ticket/view-all-tickets',
      },
    ],
  },
];
const Navbar: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const router = useRouter();
  return (
    <Popover className="relative bg-white">
      {({ open }) => (
        <>
          <div>
            <div className="relative bg-white">
              <div className="flex justify-between items-center px-4 pt-6 pb-2 sm:px-6 md:justify-start md:space-x-10 border-b-2 border-t-2 top-0 z-10">
                <div className="-mr-2 -my-2 pb-4 md:hidden ">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>

                <div className="hidden z-10 md:flex-1 md:flex md:items-center md:justify-between">
                  <nav className="flex space-x-10 ">
                    {navigations.map((nav) => {
                      if (nav.child) {
                        const isCurrPath = nav.child.some((currNav) => {
                          return currNav.path === router.pathname;
                        });
                        let navClassName = '';
                        let navLabelClassName = '';
                        if (isCurrPath) {
                          navClassName = 'border-sky-600 border-b-2';
                          navLabelClassName = 'text-sky-600 font-bold ';
                        }
                        return (
                          <NavigationDropdown
                            label={nav.label}
                            links={nav.child}
                            key={nav.label}
                            className={navClassName}
                            labelClassName={navLabelClassName}
                          />
                        );
                      }
                      return (
                        <a
                          key={nav.label}
                          href={nav.path}
                          className={
                            'text-base font-medium text-gray-500 hover:text-gray-900 ' +
                            (router.pathname === nav.path
                              ? 'text-sky-600 border-sky-600 border-b-2 font-bold'
                              : '')
                          }
                        >
                          {nav.label}
                        </a>
                      );
                    })}
                  </nav>

                  <div className="flex items-center md:ml-12 pb-4">
                    <a
                      onClick={() => {
                        AuthService.logOut().then(() => {
                          router.reload();
                        });
                      }}
                      className="text-base font-medium text-gray-700 hover:text-red-500"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-2 px-5">
                    <div className="flex items-center justify-between">
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-6">
                        {navigations.map((nav) => {
                          if (nav.child) {
                            const isCurrPath = nav.child.some((currNav) => {
                              return currNav.path === router.pathname;
                            });
                            let navClassName = '';
                            let navLabelClassName = '';
                            if (isCurrPath) {
                              navClassName = 'border-sky-600 border-b-2';
                              navLabelClassName = 'text-sky-600 font-bold ';
                            }
                            return (
                              <div key={nav.label}>
                                <MobileNavigationDropdown
                                  label={nav.label}
                                  links={nav.child}
                                  className={navClassName}
                                  labelClassName={navLabelClassName}
                                />
                              </div>
                            );
                          }
                          return (
                            <a
                              href={nav.path}
                              key={nav.label}
                              className={
                                '-m-3 p-3 flex items-center rounded-lg text-gray-900 hover:bg-gray-50 ' +
                                (router.pathname === nav.path
                                  ? 'text-sky-600 border-sky-600 border-b-2 font-bold'
                                  : '')
                              }
                            >
                              <div className="ml-4 text-base font-medium ">
                                {nav.label}
                              </div>
                            </a>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                  <div className="py-4 px-5">
                    <div className="">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        Log Out
                      </a>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
};

export default Navbar;
