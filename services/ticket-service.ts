import axios from 'axios';
import { PaginateClosedTicket, PaginateTicket, TicketLength } from '../models/ticket/ticket';
import { CreateTicketDTO } from '../models/dto/create-ticket-dto';
import { AssignPICDTO } from '../models/dto/assign-pic-dto';


const SERVICE_NAME = 'tickets';
export default class TicketService {
  static create(ticket: CreateTicketDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
  }

  static assignPIC(assignPICDTO: AssignPICDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/assign-pic', assignPICDTO);
  }
  static viewClosedTicketPaginate(paginate: PaginateClosedTicket){
    return axios.post('/api/'+ SERVICE_NAME + '/closed-ticket-pagination', paginate);
  }

  static getClosedTicketLength(ticketLength: TicketLength){
    return axios.post('/api/' + SERVICE_NAME + '/closed-ticket-length', ticketLength)
  }

  static viewAllTicketPaginate(paginate: PaginateTicket){
    return axios.post('/api/'+ SERVICE_NAME + '/all-ticket-pagination', paginate)
  }
}
