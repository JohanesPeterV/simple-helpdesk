import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import ribbonPicture from '../public/images/ribbon.png';
import binusPicture from '../public/images/binus.png';
import { NextPage } from 'next';
import { UserProp } from '../models/props/user-prop';
import AuthService from '../services/auth-service';
import User from '../models/auth/user';
import Router from 'next/router';

const Header: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      AuthService.user().then((user) => {
        setUser(user.data);
      });
    }
  });
  return (
    <header className="w-full flex top-0 px-6 md:px-16">
      <div className="flex flex-row justify-between w-full items-center">
        <button
          onClick={() => {
            Router.push('/');
          }}
          className="flex w-36 md:w-48 space-x-2"
        >
          <div className="w-1/5">
            <Image src={ribbonPicture} />
          </div>
          <div className="w-11/12">
            <Image src={binusPicture} />
          </div>
        </button>
        <div className="flex font-semibold text-lg md:text-2xl text-gray-500">
          Welcome,<p className="text-sky-600">&nbsp;{user?.username}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
