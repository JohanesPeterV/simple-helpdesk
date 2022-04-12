import axios from "axios";
import {NextRouter} from "next/router";
import {UserCredential} from "../models/auth/user-credential";
import {Ticket} from "../models/ticket";

const SERVICE_NAME = 'tickets';
export default class TicketService {
    static create(ticket: Ticket) {
        return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
    }

    static getAllTickets() {
        return axios.get('/api/' + SERVICE_NAME + '/group');
    }
}



