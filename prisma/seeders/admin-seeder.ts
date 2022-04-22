import { prisma } from '../../lib/prisma';
import { Admin } from '@prisma/client';

const argon2 = require('argon2');

interface AdminSeed {
  email: string;
  name: string;
  username: string;
  password: string;
}

const adminSeedList: AdminSeed[] = [
  {
    email: 'jp@gmail.com',
    name: 'Johanes Peter Vincentius',
    username: 'JP20-2',
    password: 'passcode99',
  },
  {
    email: 'ga@gmail.com',
    name: 'Skolastika Gabriella Theresendia Prasetyo',
    username: 'GA20-2',
    password: 'bypass',
  },
  {
    email: 'vn@gmail.com',
    name: 'Vincent lawak',
    username: 'VN20-2',
    password: 'gwlucubanget',
  },
];

let adminIdList: string[] = [];

async function upsertAdmin(adminSeed: AdminSeed) {
  const currPassword = await argon2.hash(adminSeed.password);
  const admin = await prisma.admin.upsert({
    where: {
      email: adminSeed.email,
    },
    update: {
      email: adminSeed.email,
      name: adminSeed.name,
      username: adminSeed.username,
      password: currPassword,
    },
    create: {
      email: adminSeed.email,
      name: adminSeed.name,
      username: adminSeed.username,
      password: currPassword,
    },
  });
  adminIdList.push(admin.id);
}

export default function seedAdmins() {
  adminSeedList.forEach(upsertAdmin);
  return adminIdList;
}
