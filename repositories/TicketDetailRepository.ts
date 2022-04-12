import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {TicketDetailParameter} from "../models/ticket-detail-parameter";

const prisma = new PrismaClient();

const SCHEMA= prisma.ticketDetail;
export default class TicketDetailRepository {
    static create = async (user: User, ticketDetailParameter: TicketDetailParameter) => {
        return await SCHEMA.create({
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

}



