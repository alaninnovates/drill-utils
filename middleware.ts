import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (
        pathname === '/login' ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api')
    ) {
        return NextResponse.next();
    }
    const authCookie = request.cookies.get('auth');
    if (authCookie?.value === 'true') {
        return NextResponse.next();
    }

    const password = request.nextUrl.searchParams.get('password');
    if (password) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('password', password);
        return NextResponse.redirect(loginUrl);
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon).*)',
    ],
};
