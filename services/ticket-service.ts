import axios from 'axios';
import { CreateTicketDTO } from '../models/ticket/create-ticket-dto';

const SERVICE_NAME = 'tickets';
export default class TicketService {
  static create(ticket: CreateTicketDTO) {
    return axios.post('/api/' + SERVICE_NAME + '/create', ticket);
  }
}
