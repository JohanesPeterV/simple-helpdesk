import type {NextPage} from 'next'

import {PropsWithChildren, useEffect, useState} from "react";
import Container from "../components/container";
import {ironSessionOptions, sessionOptions} from "../lib/session";
import User from "../models/auth/user";
import {withIronSessionSsr} from "iron-session/next";


import TicketService from "../services/ticket-service";
import {TicketGrouping} from "../models/ticket/ticket-grouping";
import {
    CheckCircleIcon,
    ChevronRightIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    MinusCircleIcon
} from "@heroicons/react/solid";
import TicketController from "../repositories/ticket-controller";
import TicketStack from "../components/ticket-stack";

interface HomeProps {
    ticketGrouping: TicketGrouping
}

// /e<(TicketHeader & { ticketDetails: TicketDetail[] })[]>
const Home: NextPage<HomeProps> = (props) => {
    const [ticketGrouping, setTicketGrouping] = useState<TicketGrouping>();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setTicketGrouping(props.ticketGrouping)
    }, []);
    return (
        <Container className=''>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 justify-start">
                <div className="rounded-lg md:w-1/2 bg-white shadow overflow-hidden h-fit">
                    <div className="bg-gray-200 font-bold sm:text-lg px-4 py-2 flex items-center">
                        Ongoing Tickets
                    </div>
                    <TicketStack title={'Ongoing Tickets'} tickets={props.ticketGrouping.ongoingTickets}/>
                </div>
                <div className="rounded-lg md:w-1/2 bg-white shadow overflow-hidden h-fit">
                    <div className="bg-gray-200 font-bold sm:text-lg px-4 py-2 flex items-center">
                        Pending Tickets
                    </div>
                    <TicketStack title={'Pending Tickets'} tickets={props.ticketGrouping.pendingTickets}/>

                </div>

            </div>
        </Container>
    )
}
export default Home;


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
        return {
            props: req.session.user ? {
                ticketGrouping: await TicketController.getTicketsGroup(req.session.user)
            } : {},
        }
    },
    ironSessionOptions
)

