import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient, TicketStatus} from "@prisma/client";
import {TicketDetailParameter} from "../models/ticket/ticket-detail-parameter";
import header from "../components/header";

const prisma = new PrismaClient();

const SCHEMA = prisma.ticketHeader;
export default class TicketRepository {


    private static getAll = async (user: User, conditions: Object) => {
        return user.role === 'Admin' ?
            await SCHEMA.findMany({
                where: conditions,
                include: {
                    ticketDetails: true
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })
            :
            await SCHEMA.findMany({
                where: {
                    ...{
                        creatorEmail: user.email,
                    },
                    ...conditions
                },
                include: {
                    ticketDetails: true
                },
                orderBy: {
                    createdAt: 'asc'
                }

            });
    }

    static getPending = async (user: User) => {
        return TicketRepository.getAll(user, {
            ticketStatus: TicketStatus.PENDING
        });
    }

    static getOnGoing = async (user: User) => {
        return TicketRepository.getAll(user, {
            ticketStatus: TicketStatus.ONGOING
        });
    }


}



