import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();

  const publicRoutes = [
    '/admin/login',
    '/api/admin/logout',
  ];

  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith("/admin") && !token) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};