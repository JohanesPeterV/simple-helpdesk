import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {Fragment, FunctionComponent, HTMLAttributes} from "react";
import Router from "next/router";

interface Link {
    label: string,
    path: string
}

interface DropdownProps {
    links: Link[],
    className: string
}

const Dropdown: FunctionComponent<DropdownProps> =
    ({
         links,
         className

     }) => {


        return <Menu as="div" className={`relative ${className}`}>
            <Menu.Button type="button"
                         className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none "
                         aria-expanded="false">
                <span>Ticket</span>
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
                <Menu.Items
                    className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        {
                            links.map(
                                link => (
                                    <Menu.Item key={link.path}>
                                        {({active}) => (
                                            <button
                                                className={`${
                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                onClick={() => {
                                                    Router.push(link.path);
                                                }}
                                            >
                                                {link.label}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            )
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    };

export default Dropdown;
