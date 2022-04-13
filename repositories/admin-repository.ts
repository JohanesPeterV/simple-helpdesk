import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import User from "../models/auth/user";
import {PrismaClient, Admin, TicketStatus} from "@prisma/client";

const prisma = new PrismaClient();
const SCHEMA = prisma.admin;
export default class AdminRepository {

    static get = async (adminId: string) => {
        return SCHEMA.findUnique({
            where: {
                id: adminId
            }
        });
    }

}



