import { prisma } from '../../db/prisma';

const argon2 = require('argon2');

interface Admin {
  email: string;
  name: string;
  username: string;
  password: string;
}

const adminList: Admin[] = [
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

async function upsertAdmin(admin: Admin) {
  const currPassword = await argon2.hash(admin.password);
  await prisma.admin.upsert({
    where: {
      email: admin.email,
    },
    update: {
      email: admin.email,
      name: admin.name,
      username: admin.username,
      password: currPassword,
    },
    create: {
      email: admin.email,
      name: admin.name,
      username: admin.username,
      password: currPassword,
    },
  });
}

export default function seedAdmin() {
  adminList.forEach(upsertAdmin);
}
