import {withIronSessionApiRoute} from 'iron-session/next'
import {NextApiRequest, NextApiResponse} from 'next'
import User from "../../../models/auth/user";
import {ironSessionOptions} from "../../../lib/session";

export default withIronSessionApiRoute(handleUser, ironSessionOptions)

async function handleUser(req: NextApiRequest, res: NextApiResponse<User>) {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json(new User())
    }
}
