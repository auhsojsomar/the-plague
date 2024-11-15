import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/api/tokenApi";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const adminId = request.cookies.get("adminId")?.value;

  if (!token && request.nextUrl.pathname !== "/admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (token && request.nextUrl.pathname !== "/admin") {
    try {
      const isAdminValid = await verifyAdminToken(token, adminId);

      if (!isAdminValid) {
        console.error("Invalid admin token. Redirecting to /admin.");
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
