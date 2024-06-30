export { default } from "next-auth/middleware"
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
    const token = await getToken({ req });
    console.log(!req.nextUrl.pathname.startsWith("/dashboard/customer"))
    if (!token) return NextResponse.redirect(new URL("/sign-in",req.url));
    console.log(token)
    console.log(req.nextUrl.pathname.startsWith("/dashboard/admin"))
    switch (token.user) {
        case "Customer":
            if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
                return NextResponse.redirect(new URL("/dashboard/customer", req.url));
            }
            break;
        case "Admin":
            if (req.nextUrl.pathname.startsWith("/dashboard/customer")) {
                return NextResponse.redirect(new URL("/dashboard/admin", req.url));
            }
            break;
    }
}

export const config = { matcher: ["/dashboard/customer","/dashboard/admin"] }