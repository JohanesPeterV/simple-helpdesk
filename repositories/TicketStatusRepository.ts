import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const SCHEMA = prisma.ticketStatus;
export default class TicketStatusRepository {
    static getByName = async (name : string) => {
        return await SCHEMA.findUnique(
            {
                where: {
                    name: name
                }
            }
        );
    }

}



