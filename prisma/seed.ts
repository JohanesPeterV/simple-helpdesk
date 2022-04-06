import {PrismaClient} from '@prisma/client'
import seedAdmin from "./seeders/admin-seeder";
import seedTicketStatus from "./seeders/ticket-status-seeder";
const prisma = new PrismaClient();

async function seed() {
    seedAdmin();
    await seedTicketStatus();
}

seed()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
