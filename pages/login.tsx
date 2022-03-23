import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Card from "../components/card";
import Container from "../components/container";
import Button from "../components/button";
import Input from "../components/input";
import Link from 'next/link';
import {FormEventHandler, FunctionComponent, useState} from "react";
import {redirect} from "next/dist/server/api-utils";
import Router from "next/router";
import axios from "axios";

const Login: NextPage = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit: FormEventHandler = async e => {
        e.preventDefault();
        const userCredential={
            username: username,
            password: password
        }

        const temp=await axios.post('/api/auth/login',userCredential);
        await Router.push('/')
    };
    return (
        <Container className='mx-auto flex h-screen flex-col items-center justify-center space-y-3'>
            <Card className='w-full max-w-sm'>
                <form
                    onSubmit={onSubmit}
                    className='grid grid-cols-1 gap-4'>
                    <div className='flex flex-col items-start justify-center pl-8'>
                        <div className='w-2/3'>
                            <Image src="/images/binus.png" layout='responsive' width={177} height={121}/>
                        </div>

                    </div>
                    <Input
                        onChange={e => setUsername(e.target.value)}
                        type='text'
                        placeholder='Username'
                        required
                    />
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                        required
                    />

                    <Button isLoading={false} type='submit' className={'hover:bg-sky-700 bg-sky-600 text-white'}
                    >
                        Login
                    </Button>
                </form>
            </Card>

        </Container>
    )
}

// export async function getStaticProps() {
//     // const res = await fetch('https://.../posts')
//     // const posts = await res.json()
//
//     const auth = await import("../services/auth-service")
//     const login = auth.default.login
//     // .then(e => {
//
//     // e.default.login(userName, password).then(e => {
//     //     console.log(e);
//     // });
//     // });
//
//
//     return {
//         props: {
//             login,
//         },
//     }
// }

export default Login
