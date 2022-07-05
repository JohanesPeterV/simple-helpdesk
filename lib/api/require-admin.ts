import { NextApiRequest, NextApiResponse } from 'next';
import { CreateTicketDTO } from '../../models/dto/create-ticket-dto';

export default function requireAdmin(handle: Function) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const user = req.session.user;
    if (!user || user?.role !== 'admin') {
      res.status(401).end('Not Authorized');
    }
    handle(req, res);
  };
}
