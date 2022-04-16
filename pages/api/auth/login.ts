import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/auth/user'
import { Admin, PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../../lib/session'
import axios from 'axios'
import { prisma } from '../../../db/prisma'

const argon2 = require('argon2')

export default withIronSessionApiRoute(handleLogin, ironSessionOptions)

async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body
  const admin = await findAdmin(await username)
  admin
    ? await adminLogin(admin, password, res, req)
    : await loginBinusian(username, password, res, req)
}

async function findAdmin(username: string) {
  return await prisma.admin.findUnique({
    where: {
      //admin usernames are always uppercase
      username: username.toUpperCase(),
    },
  })
}

async function loginBinusian(
  username: string,
  password: string,
  res: NextApiResponse,
  req: NextApiRequest
) {
  const response = await logOnBinusian(username, password)
  const binusian = response.data
  if (binusian !== null) {
    const user = new User(
      binusian.User.UserId,
      binusian.User.Name,
      binusian.User.UserName,
      binusian.User.Emails ? binusian.User.Emails[0].Email : '',
      'user'
    )
    res.status(200).json(await login(req, user))
  } else {
    res.status(401).end('User not found')
  }
}

async function adminLogin(
  admin: Admin,
  password: string,
  res: NextApiResponse,
  req: NextApiRequest
) {
  if (await argon2.verify(admin.password, password)) {
    const user = new User(
      admin.id,
      admin.name,
      admin.username,
      admin.email,
      'admin'
    )
    res.status(200).json(await login(req, user))
  } else {
    res.status(401).json({ message: 'Wrong password' })
  }
}

async function logOnBinusian(username: string, password: string) {
  return await axios.post(
    'https://bluejack.binus.ac.id/lapi/api/Account/LogOnBinusian',
    {
      username: username,
      password: password,
    }
  )
}

function login(req: NextApiRequest, user: User) {
  return new Promise(async (resolve) => {
    req.session.user = user
    await req.session.save()
    resolve(user)
  })
}
