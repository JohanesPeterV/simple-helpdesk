import User from '../models/auth/user';
import { prisma } from '../db/prisma';

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
