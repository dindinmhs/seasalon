export { default } from "next-auth/middleware"
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
    const token = await getToken({ req });
    if (!token) return NextResponse.redirect(new URL("/sign-in",req.url));
    const pathname = req.nextUrl.pathname
    switch (token.user) {
        case "Customer":
            if (pathname.startsWith("/dashboard/admin/branch") || pathname.startsWith("/dashboard/admin/services") || pathname.startsWith("/dashboard/admin/profile")) {
                return NextResponse.redirect(new URL("/dashboard/customer/booking", req.url));
            }
            break;
        case "Admin":
            if (pathname.startsWith("/dashboard/customer/booking") || pathname.startsWith("/dashboard/customer/history") || pathname.startsWith("/dashboard/customer/profile")) {
                return NextResponse.redirect(new URL("/dashboard/admin/services", req.url));
            }
            break;
    }
}

export const config = { matcher: ["/dashboard/customer/booking","/dashboard/customer/history","/dashboard/customer/profile","/dashboard/admin","/dashboard/admin/branch","/dashboard/admin/services","/dashboard/admin/profile"] }
