import { prisma } from '../lib/prisma';

const SCHEMA = prisma.admin;

export default class AdminRepository {
  static get = async (adminId: string) => {
    return SCHEMA.findUnique({
      where: {
        id: adminId,
      },
    });
  };

  static getAll = async() => {
    return SCHEMA.findMany(
      {
        select: {
          username: true
        }
      }
    );
  }
}
