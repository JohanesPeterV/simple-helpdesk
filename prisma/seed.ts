import {PrismaClient} from '@prisma/client'

const argon2 = require('argon2');
const prisma = new PrismaClient();

interface UserData {
    email: string,
    name: string,
    username: string,
    password: string
}

const userDataList: UserData[] = [
    {
        email: 'jp@gmail.com',
        name: 'Johanes Peter Vincentius',
        username: 'JP20-2',
        password: 'passcode99',
    },
    {
        email: 'ga@gmail.com',
        name: 'Skolastika Golbok',
        username: 'GA20-2',
        password: 'bypass',
    },
    {
        email: 'vn@gmail.com',
        name: 'Vincent lawak',
        username: 'VN20-2',
        password: 'gwlucubanget',
    }
]

async function seed() {
    const upsert = async (userData: UserData) => {
        const currPassword = await argon2.hash(userData.password);
        await prisma.admin.upsert({
            where: {
                email: userData.email
            },
            update: {
                email: userData.email,
                name: userData.name,
                username: userData.username,
                password: currPassword,
            },
            create: {
                email: userData.email,
                name: userData.name,
                username: userData.username,
                password: currPassword,
            },
        })
    }
    userDataList.forEach(upsert);
}

seed()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
