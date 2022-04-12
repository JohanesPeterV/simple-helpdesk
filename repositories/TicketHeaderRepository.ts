import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient} from "@prisma/client";
import TicketStatusRepository from "./TicketStatusRepository";

const prisma = new PrismaClient();

const SCHEMA = prisma.ticketHeader;
export default class TicketHeaderRepository {
    static create = async (user: User, ticketStatusId: string) => {
        return await SCHEMA.create({
            data: {
                creatorEmail: user.email,
                creatorName: user.name,
                ticketStatus: {
                    connect: {
                        id: ticketStatusId
                    }
                },
                solveDetail: '',
            },
        });
    }


}



