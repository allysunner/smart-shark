import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase";

const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
  
}

export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico|robots.txt).*)",
  ],
};
