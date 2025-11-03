import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.PASSWORD || '';

export async function POST(request: NextRequest) {
    const { password } = await request.json();

    if (password === PASSWORD) {
        const response = NextResponse.json({ success: true });
        response.cookies.set('auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
        });
        return response;
    } else {
        return NextResponse.json({ success: false }, { status: 401 });
    }
}
