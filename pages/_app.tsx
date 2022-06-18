import type { AppProps } from 'next/app';
import AuthLayout from '../components/auth-layout';
import '../styles/globals.css';
import Router, { useRouter } from 'next/router';
import GuestLayout from '../components/guest-layout';
import { Toaster } from 'react-hot-toast';
import '../styles/background.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isGuestPath = ['/login', '/register'].some((path) =>
    router.route.includes(path)
  );

  if (isGuestPath)
    return (
      <GuestLayout>
        <Toaster />
        <>
          <Component {...pageProps} />
        </>
      </GuestLayout>
    );

  return (
    <AuthLayout {...pageProps}>
      <Toaster />
      <Component {...pageProps} />
    </AuthLayout>
  );
}
