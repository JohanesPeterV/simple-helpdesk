import { NextApiRequest, NextApiResponse } from 'next';

export default function requireAuth(handle: Function) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const user = req.session.user;
    if (!user) {
      res.status(401).end('Not Authorized');
    }
    handle(req, res);
  };
}
