import User from '../models/auth/user';
import { prisma } from '../lib/prisma';

import Mailer from '../lib/mailer/mailer';
import { CreateTicketDetailDTO } from '../models/dto/create-ticket-detail-dto';

const SCHEMA = prisma.ticketDetail;
export default class TicketDetailRepository {
  static create = async (
    user: User,
    createTicketDetailDTO: CreateTicketDetailDTO
  ) => {
    const email = await Mailer.sendEmail(user.email, {
      subject: createTicketDetailDTO.title,
      content: createTicketDetailDTO.content,
    });
    return SCHEMA.create({
      data: {
        creatorEmail: user.email,
        creatorName: user.name,
        title: createTicketDetailDTO.title,
        content: createTicketDetailDTO.content,
        emailMessageId: email.id,
        ticketHeader: {
          connect: { id: createTicketDetailDTO.headerId },
        },
      },
    });
  };
  static getByHeader = (ticketHeaderId: string) => {
    return SCHEMA.findFirst({
      where: {
        ticketHeaderId: ticketHeaderId,
      },
    });
  };
}
