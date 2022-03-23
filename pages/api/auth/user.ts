import {withIronSessionApiRoute} from 'iron-session/next'
import {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {sessionOptions} from "../../../lib/session";

export default withIronSessionApiRoute(userHandler, sessionOptions)

async function userHandler(req: NextApiRequest, res: NextApiResponse<User>) {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json(new User())
    }
}
