import type { NextPage } from 'next';
import Image from 'next/image';
import Card from '../components/card';
import Container from '../components/container';
import Button from '../components/button';
import Input from '../components/input';
import { FormEventHandler, useState } from 'react';
import Router from 'next/router';
import AuthService from '../services/auth-service';
import { toast } from 'react-hot-toast';
import binusPicture from '../public/images/binus.png';
import ribbonPicture from '../public/images/ribbon.png';
import shootingStar from '../public/images/shootingstar.png';

const Login: NextPage = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const userCredential = {
      username: username,
      password: password,
    };
    await toast.promise(AuthService.logIn(userCredential), {
      loading: 'Logging in...',
      success: 'Log in success',
      error: 'Wrong username or password.',
    });
    await Router.push('/');
  };
  return (
    <Container className="mx-auto flex h-screen flex-col items-center justify-center space-y-3">
      <Image
        src={shootingStar}
        layout="fill"
        className="min-w-standard-screen z-0"
      />
      <Card className="w-full w-80 pt-0 z-10 bg-opacity-40 backdrop-blur-sm">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex items-start justify-start pl-2">
            <div className="w-9/12 flex flex-row space-x-3 space-y-2.5">
              <div className="w-1/5">
                <Image src={ribbonPicture} />
              </div>
              <div className="w-11/12">
                <Image src={binusPicture} />
              </div>
            </div>
          </div>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            required
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <Button
            type="submit"
            className={'hover:bg-sky-700 bg-sky-600 text-white'}
          >
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
