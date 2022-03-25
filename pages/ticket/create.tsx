import type {NextPage} from 'next'
import Image from 'next/image'
import {FormEventHandler, FunctionComponent, useState} from "react";
import Router from "next/router";
import axios from "axios";
import Container from "../../components/container";
import Card from "../../components/card";
import Input from "../../components/input";
import Button from "../../components/button";

const Login: NextPage = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit: FormEventHandler = async e => {
        e.preventDefault();
        const userCredential={
            username: username,
            password: password
        };
        const temp=await axios.post('/api/auth/login',userCredential);
        await Router.push('/');
    };
    return (
        <Container className='mx-auto flex h-screen flex-col items-center justify-center space-y-3'>
                <form
                    onSubmit={onSubmit}
                    className='grid grid-cols-1 gap-4'>
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
