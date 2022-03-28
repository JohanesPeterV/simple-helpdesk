import {Fragment, FunctionComponent, HTMLAttributes} from "react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {Menu, Transition} from '@headlessui/react'
import Dropdown from "./dropdown";
import Link from 'next/link'
import AuthService from "../services/AuthService";
import {useRouter} from "next/router";

const ticketLinks = [
    {
        label: 'Create',
        path: '/ticket/create'
    }, {
        label: 'History',
        path: '/ticket/history'
    },
];
const Header: FunctionComponent<HTMLAttributes<HTMLDivElement>> =
    () => {
        const router = useRouter();
        return <div>
            <div className="relative bg-white">
                <div
                    className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10 shadow top-0 z-10">
                    <div className="-mr-2 -my-2 md:hidden">
                        <button type="button"
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                        <nav className="flex space-x-10">

                            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Home
                            </a>
                            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                2
                            </a>

                            <Dropdown links={ticketLinks} className={''}/>
                        </nav>
                        <div className="flex items-center md:ml-12">
                            <a onClick={() => {
                                AuthService.logOut().then(() => {
                                    router.reload();
                                });
                            }}
                               className="text-base font-medium text-gray-700 hover:text-red-500">
                                Log Out

                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div
                        className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img className="h-8 w-auto" src="/img/logos/workflow-mark-indigo-600.svg"
                                         alt="Workflow"/>
                                </div>
                                <div className="-mr-2">
                                    <button type="button"
                                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">

                            </div>
                        </div>
                        <div className="py-6 px-5">
                            <div className="grid grid-cols-2 gap-4">

                                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Home
                                </a>


                                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    2
                                </a>

                                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    3
                                </a>
                            </div>
                            <div className="mt-6">
                                <a
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                                    onClick={() => {
                                        AuthService.logOut().then(() => {
                                            router.reload();
                                        });
                                    }}
                                >
                                    Log Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

export default Header;
