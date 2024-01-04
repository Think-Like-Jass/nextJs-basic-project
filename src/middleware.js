import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";

export function middleware(request) {
    const authToken = request.cookies.get('authToken')?.value;
    console.log(authToken, request.nextUrl.pathname);
    if (authToken) {
        if (request.nextUrl.pathname.startsWith('/api/v1/auth')) {
            if (request.nextUrl.pathname.startsWith('/api/v1/auth/logout'))
                return NextResponse.next();

            return NextResponse.json({ success: 0, message: 'You are already logged in.' });
        }
        else {
            try {
                const info = jwt.verify(authToken, process.env.JWT_SECRET_KEY || 'secret');
                request.userId = info.userId;
                return NextResponse.next();
            }
            catch (error) {
                console.log(error);
                const response = NextResponse.json({ success: 401, message: 'Un-authorized access denied.' });
                // response.cookies.set('authToken', '', { path: '/', maxAge: 0, httpOnly: true, secure: true })
                return response;
            }
        }
    }
    else {
        if (!request.nextUrl.pathname.startsWith('/api/v1/auth')) {
            return NextResponse.json({ success: 401, message: 'Un-authorized access denied.' });
        }
        else {
            if (request.nextUrl.pathname.startsWith('/api/v1/auth/logout'))
                return NextResponse.json({ success: 0, message: 'Please login to start your session.' });

            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: [
        '/api/:path*',
    ],
}