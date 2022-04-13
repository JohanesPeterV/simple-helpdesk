import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {TicketDetailParameter} from "../models/ticket/ticket-detail-parameter";
import header from "../components/header";

const prisma = new PrismaClient();

const SCHEMA = prisma.ticketDetail;
export default class TicketDetailRepository {
    static create = (user: User, ticketDetailParameter: TicketDetailParameter) => {
        return SCHEMA.create({
            data: {
                creatorEmail: user.email,
                creatorName: user.name,
                title: ticketDetailParameter.title,
                content: ticketDetailParameter.content,
                emailMessageId: '',
                ticketHeader: {
                    connect: {id: ticketDetailParameter.headerId}
                }
            },
        });
    }
    static getByHeader = (ticketHeaderId: string) => {
        return SCHEMA.findFirst({
            where: {
                ticketHeaderId: ticketHeaderId
            },
        })
    }

}



