import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase";

const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
  if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return updateSession(request) 
  }

  return updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico|robots.txt).*)",
  ],
};
