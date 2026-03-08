import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROUTES, PRIVATE_ROUTES } from "@/constants/routes";
import { COOKIE_CONFIG } from "@/config/app";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/_next/static")) {
    return NextResponse.next();
  }
  const isAuthRoute = AUTH_ROUTES.includes(path);
  const isPrivateRoute = PRIVATE_ROUTES.includes(path);

  console.log("path", path);
  console.log("isAuthRoute", isAuthRoute);
  console.log("isPrivateRoute", isPrivateRoute);
  const isLoggedIn = request.cookies.get(COOKIE_CONFIG.loggedIn) || "";
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/account/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
