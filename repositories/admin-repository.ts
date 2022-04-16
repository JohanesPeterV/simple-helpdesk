import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const SCHEMA = prisma.admin;

export default class AdminRepository {
    static get = async (adminId: string) => {
        return SCHEMA.findUnique({
            where: {
                id: adminId
            }
        });
    }

}



