import seedAdmin from './seeders/admin-seeder'
import { prisma } from '../db/prisma'

async function seed() {
  seedAdmin()
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
