import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/api/tokenApi";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  // If the user is already on the /admin page (login page), do not redirect
  if (!token && request.nextUrl.pathname !== "/admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If token exists, verify it
  if (token && request.nextUrl.pathname !== "/admin") {
    try {
      const isAdminValid = await verifyAdminToken();

      if (!isAdminValid) {
        console.log("Invalid admin token. Redirecting to /admin.");
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch (error: unknown) {
      // Narrowing the error type
      if (error instanceof Error) {
        console.error("Error verifying token:", error.message);
      } else {
        console.error("An unknown error occurred during token verification.");
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // If token is valid or on the /admin page, proceed to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"], // Apply middleware to /admin and all subroutes
};
