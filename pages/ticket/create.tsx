import type {NextPage} from 'next'
import Image from 'next/image'
import {FormEventHandler, FunctionComponent, useState} from "react";
import Router from "next/router";
import axios from "axios";
import Container from "../../components/container";
import Card from "../../components/card";
import Input from "../../components/input";
import Button from "../../components/button";

const Create: NextPage = ({}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const onSubmit: FormEventHandler = async e => {
        e.preventDefault();
        // const userCredential = {
        //     username: username,
        //     password: password
        // };
        // const temp = await axios.post('/api/auth/login', userCredential);
        await Router.push('/');
    };
    return (
        <Container className='py-2 w-full min-w-full'>
            <form
                onSubmit={onSubmit}
                className='space-y-8 divide-y divide-gray-200 '>
                <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Ticket</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Request by submitting a ticket.
                        </p>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div
                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="first_name"
                                   className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    autoComplete="given-name"
                                    className="max-w-lg border-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div
                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Description
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="max-w-lg border-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    defaultValue={''}
                />
                                <p className="mt-2 text-sm text-gray-500">Describe what do you need in your ticket.</p>
                            </div>
                        </div>

                    </div>
                </div>
                <Button isLoading={false} type='submit' className={'hover:bg-sky-700 bg-sky-600 text-white'}>
                    Submit
                </Button>
            </form>
        </Container>
    )
}


export default Create
