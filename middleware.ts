import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { method, nextUrl, headers } = req;
    const queryParams = Object.fromEntries(nextUrl.searchParams);
    const ip = headers.get("x-forwarded-for") || "Unknown IP";
    const userAgent = headers.get("user-agent");

    const log = {
        method,
        url: nextUrl.pathname,
        queryParams,
        ip,
        userAgent,
    }
    console.log(JSON.stringify(log));

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};
