import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient, TicketStatus, TicketHeader} from "@prisma/client";

const prisma = new PrismaClient();
const SCHEMA = prisma.ticketHeader;
export default class TicketHeaderRepository {
    static create = async (user: User) => {
        return await SCHEMA.create({
            data: {
                creatorEmail: user.email,
                creatorName: user.name,
                solveDetail: '',
            },
        });
    }


    private static getAll = async (user: User, conditions: Object) => {
        return user.role === 'Admin' ?
            await SCHEMA.findMany({
                where: conditions
            }) :
            await SCHEMA.findMany({
                where: {
                    ...{
                        creatorEmail: user.email
                    },
                    ...conditions
                },
            });
    }


}



