import User from '../models/auth/user';
import { prisma } from '../lib/prisma';
import { TicketDetailParameter } from '../models/ticket/ticket-detail-parameter';
import Mailer from '../lib/mailer/mailer';

const SCHEMA = prisma.ticketDetail;
export default class TicketDetailRepository {
  static create = async (
    user: User,
    ticketDetailParameter: TicketDetailParameter
  ) => {
    const email = await Mailer.sendEmail(user.email, {
      subject: ticketDetailParameter.title,
      content: ticketDetailParameter.content,
    });
    return SCHEMA.create({
      data: {
        creatorEmail: user.email,
        creatorName: user.name,
        title: ticketDetailParameter.title,
        content: ticketDetailParameter.content,
        emailMessageId: email.id,
        ticketHeader: {
          connect: { id: ticketDetailParameter.headerId },
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
