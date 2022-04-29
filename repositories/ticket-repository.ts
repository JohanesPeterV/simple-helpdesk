import User from '../models/auth/user';
import { PrismaClient, TicketStatus } from '@prisma/client';
import TicketHeaderRepository from './ticket-header-repository';
import TicketDetailRepository from './ticket-detail-repository';
import { CreateTicketDTO } from '../models/dto/create-ticket-dto';
import { Ticket } from '../models/ticket/ticket';
import { prisma } from '../lib/prisma';
import Mailer from '../lib/mailer/mailer';
import ticketDetail from '../components/ticket/ticket-detail';

const SCHEMA = prisma.ticketHeader;
const SCHEMA_CHILD = prisma.ticketDetail;
export default class TicketRepository {
  static get = async (user: User, id: string) => {
    return user.role === 'admin'
      ? await SCHEMA.findUnique({
          where: {
            id: id,
          },
          include: {
            ticketDetails: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            admin: true,
          },
        })
      : await SCHEMA.findFirst({
          where: {
            id: id,
            creatorEmail: user.email,
          },
          include: {
            ticketDetails: {
              orderBy: {
                createdAt: 'asc',
              },
            },
            admin: true,
          },
        });
  };
  static create = async (user: User, ticketDTO: CreateTicketDTO) => {
    const ticketHeader = await TicketHeaderRepository.create(user);
    const ticketDetail = await TicketDetailRepository.create(user, {
      title: ticketDTO.title,
      content: ticketDTO.content,
      headerId: ticketHeader.id,
    });
    const ticket: Ticket = {
      ...ticketHeader,
      admin: null,
      ticketDetails: [ticketDetail],
    };
    return ticket;
  };
  static delete = async (ticketId: string) => {
    await SCHEMA_CHILD.deleteMany({
      where: {
        ticketHeaderId: {
          equals: ticketId,
        },
      },
    });
    return await SCHEMA.deleteMany({
      where: {
        id: {
          equals: ticketId,
        },
      },
    });
  };

  private static getAllWithOneDetail = async (
    user: User,
    conditions: Object,
    limitDetail: number = 1,
    limit: number = 0,
    skip: number = 0
  ) => {
    return user.role === 'admin'
      ? await SCHEMA.findMany({
          where: conditions,
          include: {
            ticketDetails: {
              take: limitDetail ? limitDetail : undefined,
            },
            admin: {},
          },
          skip: skip != 0 ? skip : undefined,
          take: limit != 0 ? limit : undefined,
          orderBy: [
            {
              createdAt: 'asc',
            },
            {
              ticketStatus: 'asc',
            },
          ],
        })
      : await SCHEMA.findMany({
          where: {
            ...{
              creatorEmail: user.email,
            },
            ...conditions,
          },
          include: {
            ticketDetails: {
              take: limit ? limit : undefined,
            },
            admin: {},
          },
          skip: skip != 0 ? skip : undefined,
          take: limit != 0 ? limit : undefined,
          orderBy: [
            {
              createdAt: 'asc',
            },
            {
              ticketStatus: 'asc',
            },
          ],
        });
  };

  private static getAllWithDetails = async (user: User, conditions: Object) => {
    return user.role === 'admin'
      ? await SCHEMA.findMany({
          where: conditions,
          include: {
            ticketDetails: {},
            admin: {},
          },
          orderBy: [
            {
              createdAt: 'asc',
            },
            {
              ticketStatus: 'asc',
            },
          ],
        })
      : await SCHEMA.findMany({
          where: {
            ...{
              creatorEmail: user.email,
            },
            ...conditions,
          },
          include: {
            ticketDetails: {},
            admin: {},
          },
          orderBy: [
            {
              createdAt: 'asc',
            },
            {
              ticketStatus: 'asc',
            },
          ],
        });
  };

  static getAllTickets = async (user: User) => {
    return TicketRepository.getAllWithDetails(user, {});
  };
  static getPending = async (user: User) =>
    TicketRepository.getAllWithOneDetail(user, {
      ticketStatus: TicketStatus.PENDING,
    });

  static getOnGoing = async (user: User) =>
    TicketRepository.getAllWithOneDetail(user, {
      ticketStatus: TicketStatus.ONGOING,
    });

  static getClosed = async (
    user: User,
    limit?: number,
    skip?: number,
    userParam?: String
  ) =>
    TicketRepository.getAllWithOneDetail(
      user,
      {
        ticketStatus: TicketStatus.CLOSED,
        admin: {
          username: userParam == 'All' ? undefined : userParam,
        },
      },
      1,
      limit,
      skip
    );

  static getClosedLength = async function (userParam?: String) {
    let conditions: any;
    if (userParam == 'All') {
      conditions = {
        ticketStatus: TicketStatus.CLOSED,
      };
    } else {
      conditions = {
        ticketStatus: TicketStatus.CLOSED,
        admin: {
          username: userParam,
        },
      };
    }
    return SCHEMA.count({
      where: conditions,
    });
  };
}
