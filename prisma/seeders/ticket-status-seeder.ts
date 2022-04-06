import {PrismaClient} from "@prisma/client";

const argon2 = require('argon2');
const prisma = new PrismaClient();

interface TicketStatus {
    name: string
}

const ticketStatusList: TicketStatus[] = [
    {
        name: 'Pending'
    },
    {
        name: 'On Going'
    },
    {
        name: 'Closed'
    }
]

async function deleteAllTicketStatus() {
    await prisma.ticketStatus.deleteMany({})
}

export default async function seedTicketStatus() {
    await deleteAllTicketStatus();
    await prisma.ticketStatus.createMany({
        data: ticketStatusList
    })
}
