import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";
import {withIronSessionApiRoute} from 'iron-session/next'
import {ironSessionOptions} from "../../../lib/session";

const prisma = new PrismaClient();
const argon2 = require('argon2');

export default withIronSessionApiRoute(handleLogout, ironSessionOptions)

function handleLogout(req: NextApiRequest, res: NextApiResponse<User>) {
    req.session.destroy();
    res.json(new User());
}
