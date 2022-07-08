import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/auth/user';
import { PrismaClient } from '@prisma/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from '../../../lib/session';
import { prisma } from '../../../lib/prisma';
import requireAuth from '../../../lib/api/require-auth';

export default withIronSessionApiRoute(
  requireAuth(handleLogout),
  ironSessionOptions
);

function handleLogout(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json(new User());
}
