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
import binusPicture from '../public/images/simple_helpdesk.png';
import ribbonPicture from '../public/images/ribbon.png';
import LoginParticleBackground from '../components/login-particle-background';
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
    <Container className="px-0 md:px-0 flex h-screen flex-col items-center justify-center space-y-0 login-bg">
      <div className="h-full w-full absolute z-10">
        <LoginParticleBackground />
      </div>
      <Card className="w-80 pt-0 z-20 backdrop-blur-sm border-none shadow-md shadow hover:shadow-xl">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-center pt-2">
            <div className="  flex flex-row justify-center items-center w-11/12">
                <Image alt="Binus Logo" src={binusPicture} />
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
      <footer className="z-50 group sm:text-lg text-xs fixed inset-x-0 bottom-3 text-center text-white">
        <p className="block group-hover:hidden">
          Copyright &copy; 2022 - SLC - Binus University
        </p>
        <p className="hidden group-hover:block">
          Copyright &copy; 2022 - Gabriella, Johanes, Vincent - SLC - Binus University
        </p>
      </footer>
    </Container>
  );
};

export default Login;
