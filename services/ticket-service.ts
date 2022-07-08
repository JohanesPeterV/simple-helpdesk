import axios from 'axios';
import { CreateTicketDTO } from '../models/dto/create-ticket-dto';
import { AssignPICDTO } from '../models/dto/assign-pic-dto';
import { Ticket } from '../models/ticket/ticket';
import { UserNameParameter } from '../models/parameters/user-name-parameter';
import { PaginateClosedTicketParameter } from '../models/parameters/paginate-closed-ticket-parameter';
import { PaginateTicketParameter } from '../models/parameters/paginate-ticket-parameter';
import { FilterParameter } from '../models/parameters/filter-parameter';
import { CloseTicketParameter } from '../models/parameters/close-ticket-parameter';

const SERVICE_NAME = 'tickets';
export default class TicketService {
  static create(ticket: CreateTicketDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
  }

  static createDetail(ticket: CreateTicketDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/create-detail', ticket);
  }
  
  static assignPIC(assignPICDTO: AssignPICDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/assign-pic', assignPICDTO);
  }

  static closeTicket(closeTicketParameter: CloseTicketParameter) {
    return axios.post('/api/' + SERVICE_NAME + '/close-ticket', closeTicketParameter);
  }

  static viewClosedTicketPaginate(paginate: PaginateClosedTicketParameter) {
    return axios.post(
      '/api/' + SERVICE_NAME + '/get-closed-paginated',
      paginate
    );
  }

  static delete(ticket: Ticket) {
    return axios.post('/api/' + SERVICE_NAME + '/delete', {
      ticketId: ticket.id,
    });
  }

  static viewAllTicketPaginate(paginate: PaginateTicketParameter) {
    return axios.post('/api/' + SERVICE_NAME + '/get-all-paginated', paginate);
  }

  static getClosedTicketLength(ticketLength: UserNameParameter) {
    return axios.post(
      '/api/' + SERVICE_NAME + '/get-closed-length',
      ticketLength
    );
  }

  static getAllTicketLength(filterParameter: FilterParameter) {
    return axios.post(
      '/api/' + SERVICE_NAME + '/get-all-length',
      filterParameter
    );
  }
}
