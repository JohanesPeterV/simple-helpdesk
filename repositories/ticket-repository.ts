import User from '../models/auth/user';
import { TicketStatus } from '@prisma/client';
import TicketHeaderRepository from './ticket-header-repository';
import TicketDetailRepository from './ticket-detail-repository';
import { CreateTicketDTO } from '../models/dto/create-ticket-dto';
import { Ticket } from '../models/ticket/ticket';
import { prisma } from '../lib/prisma';
import { FilterParameter } from '../models/parameters/filter-parameter';
import { PaginateTicketParameter } from '../models/parameters/paginate-ticket-parameter';

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
      user.role === 'admin' ? {} : { creatorEmail: user.email };
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
      user.role === 'admin' ? {} : { creatorEmail: user.email };
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
  private static getLength = async (user: User, conditions: Object) => {
    const authCondition =
      user.role === 'admin' ? {} : { creatorEmail: user.email };
    const queryCondition = {
      ...conditions,
      ...authCondition,
    };
    return await SCHEMA.count({
      where: queryCondition,
    });
  };
  static getFilteredCondition = (filterParameter: FilterParameter) => {
    const status = filterParameter.status;
    const title = filterParameter.title;
    const content = filterParameter.content;
    const keyword = filterParameter.keyword;

    const creationEndDateString = filterParameter.creationTimeRange.endDate;
    const creationStartDateString = filterParameter.creationTimeRange.startDate;

    const doneEndDateString = filterParameter.doneTimeRange.endDate;
    const doneStartDateString = filterParameter.doneTimeRange.startDate;

    let creationStartDate = new Date(creationStartDateString);
    let creationEndDate = new Date(creationEndDateString);

    let doneStartDate = new Date(doneStartDateString);
    let doneEndDate = new Date(doneEndDateString);

    creationEndDate.setDate(creationEndDate.getDate() + 1);
    doneEndDate.setDate(doneEndDate.getDate() + 1);

    const ticketStatus =
      status === 'ALL STATUS'
        ? {}
        : status === 'CLOSED'
        ? TicketStatus.CLOSED
        : status === 'ONGOING'
        ? TicketStatus.ONGOING
        : TicketStatus.PENDING;
    const dateCondition = {
      createdAt: {
        lte: creationEndDateString === '' ? new Date() : creationEndDate,
        gte:
          creationStartDateString === ''
            ? new Date('1970-01-01')
            : creationStartDate,
      },
      doneAt: {
        lte: doneEndDateString === '' ? undefined : doneEndDate,
        gte: doneStartDateString === '' ? undefined : doneStartDate,
      },
    };
    return {
      ticketStatus: ticketStatus,
      OR: [
        {
          ticketDetails: {
            some: {
              title: {
                contains: title,
                mode: 'insensitive',
              },
              content: {
                contains: content,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          OR: [
            {
              ticketDetails: {
                some: {
                  title: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              ticketStatus: ticketStatus,
              ticketDetails: {
                some: {
                  content: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              ticketStatus: ticketStatus,
              ticketDetails: {
                some: {
                  creatorEmail: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              ticketStatus: ticketStatus,
              ticketDetails: {
                some: {
                  creatorName: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              ticketStatus: ticketStatus,
              creatorEmail: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              ticketStatus: ticketStatus,
              creatorName: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
      ...dateCondition,
    };
  };

  static getFilteredTickets = async (
    user: User,
    paginateTicketParameter: PaginateTicketParameter
  ) => {
    const limit = paginateTicketParameter.dataPerPage;
    const skip =
      (paginateTicketParameter.page - 1) * paginateTicketParameter.dataPerPage;

    return TicketRepository.getAllWithDetails(
      user,
      TicketRepository.getFilteredCondition(
        paginateTicketParameter.filterParameter
      ),
      limit,
      skip
    );
  };

  static getPending = async (user: User, limit?: number) =>
    TicketRepository.getAllWithOneDetail(
      user,
      {
        ticketStatus: TicketStatus.PENDING,
      },
      limit
    );

  static getOnGoing = async (user: User, limit?: number) =>
    TicketRepository.getAllWithOneDetail(
      user,
      {
        ticketStatus: TicketStatus.ONGOING,
      },
      limit
    );

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

  static getFilteredTicketLength = async function (
    user: User,
    filterParameter: FilterParameter
  ) {
    return TicketRepository.getLength(
      user,
      TicketRepository.getFilteredCondition(filterParameter)
    );
  };
}
