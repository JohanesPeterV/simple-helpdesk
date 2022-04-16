import {ChevronDownIcon} from "@heroicons/react/solid";
import {FunctionComponent, HTMLAttributes} from "react";
import Router from "next/router";
import {DropdownProps} from "../models/dropdown/dropdown-props";


const NavigationDropdown: FunctionComponent<DropdownProps> =
    ({
         label,
         links,
         className

     }) => (
        <div className='group pb-4'>
            <div
                className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none ">
                {label}
                <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-violet-200 group-hover:text-sky-200"
                    aria-hidden="true"
                />
            </div>
            <div className='relative'>
                <div
                    className="hidden transition-all delay-500 group-hover:block transition-all absolute -left-4 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        {
                            links.map(
                                link => (
                                    <div key={link.path}>
                                        <button
                                            className='hover:bg-gray-200 font-medium text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm'
                                            onClick={() => {
                                                Router.push(link.path);
                                            }}
                                        >
                                            {link.label}
                                        </button>

                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );

export default NavigationDropdown;
