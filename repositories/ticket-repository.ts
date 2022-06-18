import User from '../models/auth/user';
import { TicketStatus } from '@prisma/client';
import TicketHeaderRepository from './ticket-header-repository';
import TicketDetailRepository from './ticket-detail-repository';
import { CreateTicketDTO } from '../models/dto/create-ticket-dto';
import { Ticket } from '../models/ticket/ticket';
import { prisma } from '../lib/prisma';

const SCHEMA = prisma.ticketHeader;
const SCHEMA_CHILD = prisma.ticketDetail;
export default class TicketRepository {
  static get = async (user: User, id: string) => {
    if (user.role === 'admin') {
      return await SCHEMA.findUnique({
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
      });
    }

    return await SCHEMA.findFirst({
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
    limit: number = 0,
    skip: number = 0
  ) => {
    const authCondition =
      user.role === 'admin' ? { creatorEmail: user.email } : {};
    const queryConditions = {
      ...conditions,
      ...authCondition,
    };
    return await SCHEMA.findMany({
      where: queryConditions,
      include: {
        ticketDetails: {
          take: 1,
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

  private static getAllWithDetails = async (
    user: User,
    conditions: Object,
    limit: number = 0,
    skip: number = 0
  ) => {
    const authCondition =
      user.role === 'admin'
        ? {}
        : {
            creatorEmail: user.email,
          };
    const queryCondition = {
      ...conditions,
      ...authCondition,
    };
    return await SCHEMA.findMany({
      where: queryCondition,
      include: {
        ticketDetails: {},
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

  static getAllTickets = async (user: User, limit?: number, skip?: number) => {
    return TicketRepository.getAllWithDetails(user, {}, limit, skip);
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
      limit,
      skip
    );

  static getClosedLength = async function (username: string) {
    return SCHEMA.count({
      where: {
        ticketStatus: TicketStatus.CLOSED,
        ...(username === 'All'
          ? {}
          : {
              admin: {
                username: username,
              },
            }),
      },
    });
  };

  static getAllTicketLength = async function () {
    return SCHEMA.count();
  };
}
