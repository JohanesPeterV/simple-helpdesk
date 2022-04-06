import type {AppProps} from 'next/app'
import Layout from "../components/layout";
import '../styles/globals.css'
import {useRouter} from "next/router";
import GuestLayout from "../components/guest-layout";
import {Toaster} from "react-hot-toast";

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    const isGuestPath = ['/login', '/register'].some(path =>
        router.route.includes(path)
    );



    if (isGuestPath) return <GuestLayout>
        <Toaster />
        <Component {...pageProps}/>
    </GuestLayout>

    return <Layout {...pageProps}>
        <Toaster />
        <Component {...pageProps}/>

    </Layout>
}
