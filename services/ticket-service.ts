import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import {CreateTicketDTO} from "../models/ticket/create-ticket-dto";
import User from "../models/auth/user";
import superjson from "superjson";
import TicketRepository from "../repositories/ticket-repository";
import {TicketDetail, TicketHeader} from "@prisma/client";

const SERVICE_NAME = 'tickets';
export default class TicketService {
    static create(ticket: CreateTicketDTO) {
        return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
    }

}



