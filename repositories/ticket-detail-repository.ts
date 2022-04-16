import User from "../models/auth/user";
import { prisma } from '../db/prisma'
import {TicketDetailParameter} from "../models/ticket/ticket-detail-parameter";

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



