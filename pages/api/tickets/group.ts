// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {withIronSessionApiRoute} from 'iron-session/next'
import {sessionOptions} from "../../../lib/session";

const prisma = new PrismaClient();
const argon2 = require('argon2');


export default withIronSessionApiRoute(handleTesting, sessionOptions)


async function handleTesting(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {title, description} = await req.body;
    const user = req.session.user;
    if (user) {
        console.log('masuk nih')
    }

}


