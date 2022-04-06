import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import {ReactElement} from "react";
import Container from "../components/container";

const Home: NextPage = () => {
    return (
        <Container className=''>
            <div className="max-w-screen-2xl w-full  mt-4 sm:mt-6 lg:mt-8 ">
                <div className="rounded-lg bg-white shadow overflow-hidden">
                    <div className="bg-gray-200 font-bold sm:text-lg px-4 py-2 flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-teacher"
                             className="svg-inline--fa fa-chalkboard-teacher fa-w-20 h-4 w-4 sm:h-5 sm:w-5 mr-2"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path fill="currentColor"
                                  d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z">
                            </path>
                        </svg>
                        Pending Tickets
                    </div>
                    <div className="text-center py-3">
                        <h3 className="sm:text-lg font-bold"> You have no pending
                            tickets
                        </h3>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Home
