import User from '../models/auth/user'
import { PrismaClient, TicketStatus } from '@prisma/client'
import TicketHeaderRepository from './ticket-header-repository'
import TicketDetailRepository from './ticket-detail-repository'
import { CreateTicketDTO } from '../models/ticket/create-ticket-dto'
import { Ticket } from '../models/ticket/ticket'
import { prisma } from '../db/prisma'

const SCHEMA = prisma.ticketHeader
export default class TicketRepository {
  static get = async (user: User, id: string) => {
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
    })
  }

  static create = async (user: User, ticketDTO: CreateTicketDTO) => {
    const ticketHeader = await TicketHeaderRepository.create(user)
    const ticketDetail = await TicketDetailRepository.create(user, {
      title: ticketDTO.title,
      content: ticketDTO.content,
      headerId: ticketHeader.id,
    })
    const ticket: Ticket = {
      ...ticketHeader,
      admin: null,
      ticketDetails: [ticketDetail],
    }
    return ticket
  }

  private static getAll = async (conditions: Object) => {
    return await SCHEMA.findMany({
      where: conditions,
      include: {
        ticketDetails: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  static getPending = async (conditions: Object) => {
    return TicketRepository.getAll({
      ticketStatus: TicketStatus.PENDING,
      ...conditions,
    })
  }

  static getOnGoing = async (conditions: Object) => {
    return TicketRepository.getAll({
      ticketStatus: TicketStatus.ONGOING,
      ...conditions,
    })
  }
  static getHistory = async (conditions: Object) => {
    return TicketRepository.getAll({
      ticketStatus: TicketStatus.CLOSED,
      ...conditions,
    })
  }
}
