import {NextRequest, NextResponse} from 'next/server'


function redirectToPage(req: NextRequest, route: string) {
    const url = req.nextUrl.clone();
    url.pathname = route;
    return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {

    let hasToken = req.cookies[process.env.COOKIE_NAME ?? 'login'];

    const isGuestPath = ['login', 'register'].some(path =>
        req.nextUrl.href.includes(path)
    );
    if (isGuestPath && !hasToken) return NextResponse.next();

    const isGuestOnly = isGuestPath && hasToken;
    if (isGuestOnly) return redirectToPage(req, '/');

    return hasToken ? NextResponse.next() : redirectToPage(req, '/login');
}

