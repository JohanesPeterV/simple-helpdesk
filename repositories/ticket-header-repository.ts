import User from '../models/auth/user';
import { prisma } from '../lib/prisma';
import { AssignPICDTO } from '../models/dto/assign-pic-dto';
import { TicketStatus } from '@prisma/client';
import { CloseTicketParameter } from '../models/parameters/close-ticket-parameter';

const SCHEMA = prisma.ticketHeader;
export default class TicketHeaderRepository {
  static create = async (user: User) => {
    return await SCHEMA.create({
      data: {
        creatorEmail: user.email,
        creatorName: user.name,
        solveDetail: '',
      },
    });
  };

  static assignPIC = async (assignPICDTO: AssignPICDTO) => {
    return await SCHEMA.update({
      where: {
        id: assignPICDTO.ticketId,
      },
      data: {
        adminId: assignPICDTO.adminId,
        ticketStatus: TicketStatus.ONGOING,
      },
    });
  };

  static closeTicket = async (closeTicketParameter: CloseTicketParameter) => {
    const date = new Date();

    return await SCHEMA.update({
      where: {
        id: closeTicketParameter.ticketHeaderId,
      },
      data: {
        solveDetail: closeTicketParameter.solveDetail,
        ticketStatus: TicketStatus.CLOSED,
        doneAt: date,
      },
    });
  };

  private static getAll = async (user: User, conditions: Object) => {
    return user.role === 'Admin'
      ? await SCHEMA.findMany({
          where: conditions,
        })
      : await SCHEMA.findMany({
          where: {
            ...{
              creatorEmail: user.email,
            },
            ...conditions,
          },
        });
  };
}
