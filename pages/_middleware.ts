import {NextRequest, NextResponse} from 'next/server'
import axios from "axios";
import {redirect} from "next/dist/server/api-utils";


function redirectToPage(req: NextRequest, route: string) {
    const url = req.nextUrl.clone();
    url.pathname = route;
    return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {

    let hasToken = req.cookies[process.env.COOKIE_NAME ?? 'login'];
    const isBypassPath = ['login', 'register'].some(path =>
        req.nextUrl.href.includes(path)
    );
    if (isBypassPath && !hasToken) return NextResponse.next();

    const isGuestOnly = isBypassPath && hasToken;
    if (isGuestOnly) return redirectToPage(req, '/');

    return hasToken ? NextResponse.next() : redirectToPage(req, '/login');

}

