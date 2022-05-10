import axios from 'axios';
import {
  PaginateClosedTicketParameter,
  PaginateTicketParameter,
  UserNameParameter,
} from '../models/ticket/ticket';
import { CreateTicketDTO } from '../models/dto/create-ticket-dto';
import { AssignPICDTO } from '../models/dto/assign-pic-dto';
import { Ticket } from '../models/ticket/ticket';

const SERVICE_NAME = 'tickets';
export default class TicketService {
  static create(ticket: CreateTicketDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
  }

  static assignPIC(assignPICDTO: AssignPICDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/assign-pic', assignPICDTO);
  }
  static viewClosedTicketPaginate(paginate: PaginateClosedTicketParameter) {
    return axios.post(
      '/api/' + SERVICE_NAME + '/closed-ticket-pagination',
      paginate
    );
  }

  static delete(ticket: Ticket) {
    return axios.post('/api/' + SERVICE_NAME + '/delete', {
      ticketId: ticket.id,
    });
  }

  static viewAllTicketPaginate(paginate: PaginateTicketParameter) {
    return axios.post(
      '/api/' + SERVICE_NAME + '/all-ticket-pagination',
      paginate
    );
  }
  static getClosedTicketLength(ticketLength: UserNameParameter) {
    return axios.post(
      '/api/' + SERVICE_NAME + '/closed-ticket-length',
      ticketLength
    );
  }
}
