import axios from 'axios';
import { CreateTicketDTO } from '../models/ticket/create-ticket-dto';
import { PaginateClosedTicket, TicketLength } from '../models/ticket/ticket';

const SERVICE_NAME = 'tickets';
export default class TicketService {
  static create(ticket: CreateTicketDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
  }

  static viewClosedTicketPaginate(paginate: PaginateClosedTicket){
    return axios.post('/api/'+ SERVICE_NAME + '/pagination', paginate);
  }

  static getClosedTicketLength(ticketLength: TicketLength){
    return axios.post('/api/' + SERVICE_NAME + '/closed-ticket-length', ticketLength)
  }
}
