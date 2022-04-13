// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const argon2 = require('argon2');

import {withIronSessionApiRoute} from 'iron-session/next'
import {ironSessionOptions} from "../../../lib/session";
import axios, {AxiosResponse} from "axios";


export default withIronSessionApiRoute(handleLogout, ironSessionOptions)

function handleLogout(req: NextApiRequest, res: NextApiResponse<User>) {
    req.session.destroy();
    res.json(new User());
}
