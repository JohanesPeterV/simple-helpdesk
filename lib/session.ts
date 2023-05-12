import type { IronSessionOptions } from 'iron-session';
import User from '../models/auth/user';


export const ironSessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: process.env.COOKIE_NAME ?? 'login',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
    
  }
}
