import seedAdmins from './seeders/admin-seeder';
import { prisma } from '../db/prisma';
import seedTicket from './seeders/ticket-seeder';

async function seed() {
  const admins = seedAdmins();
  await seedTicket(admins);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
