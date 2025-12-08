import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";

async function getUserFromToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(COOKIE_NAME)?.value || null;
  let user = null;

  if (token) {
    user = await getUserFromToken(token);
  }

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAdminRoute = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";

  //Not logged in: only /admin is protected; /challenges is PUBLIC now
  if (!user && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  //Logged in as NORMAL USER but trying to access admin routes → block
  if (user && !user.isAdmin && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/challenges";
    return NextResponse.redirect(url);
  }

  //Logged-in users shouldn't see login/register
  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = user.isAdmin ? "/admin" : "/challenges";
    return NextResponse.redirect(url);
  }

  //Redirect "/" based on role when token exists
  if (user && isHomePage) {
    const url = request.nextUrl.clone();
    url.pathname = user.isAdmin ? "/admin" : "/challenges";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/admin/:path*", "/login", "/register"],
};
