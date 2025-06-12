// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which paths are protected and require authentication
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/settings",
  // Add other protected paths here
];

// Define paths that should be accessible only to non-authenticated users
const authPaths = [
  "/login",
  "/register",
  // Add other auth paths here
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = request.cookies.has("auth-token");

  // Check if trying to access protected paths without auth
  if (
    protectedPaths.some((path) => pathname.startsWith(path)) &&
    !hasAuthCookie
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (authPaths.some((path) => pathname.startsWith(path)) && hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (except auth-related ones that need to be checked)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/(?!auth)).*)",
    "/api/auth/:path*",
  ],
};
