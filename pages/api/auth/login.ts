// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const argon2 = require('argon2');

import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from "../../../lib/session";
import axios, {AxiosResponse} from "axios";

export default withIronSessionApiRoute(handleLogin, sessionOptions);


function login(req: NextApiRequest, user: User) {
    return new Promise(async resolve => {
        req.session.user = user;
        await req.session.save();
        resolve(user);
    })
}

async function findAdmin(username: string) {
    return await prisma.admin.findUnique({
        where: {
            username: username.toUpperCase(),
        }
    });
}


async function handleLogin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {username, password} = await req.body;
    const admin = await findAdmin(await username);
    if (admin !== null) {
        if (await argon2.verify(admin.password, password)) {
            const user = new User(admin.id, admin.name, admin.username, admin.email, 'admin');
            res.status(200).json(await login(req, user));
        }
        else {
            res.status(401).json({message: 'Wrong password'})
        }
    } else {
        axios.post('https://bluejack.binus.ac.id/lapi/api/Account/LogOnBinusian', {
            'username': username,
            'password': password
        }).then(async (response: AxiosResponse<any>) => {
            const binusian = response.data;
            if (binusian !== null) {
                const user = new User(binusian.id, binusian.name, binusian.username, binusian.email, 'user');
                res.status(200).json(await login(req, user));
            } else {
                res.status(401).end('User not found');
            }
        }).catch((error) => {
            res.status(401).end('User not found');
        });


    }

}

