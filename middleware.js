import { NextRequest, NextResponse } from "next/server";

export function middleware(req, res) {
  console.log("Request", req.nextUrl.pathname);

  const response = NextResponse.next();
  response.cookies.set("Cookie1", "true");
  return response;
}

export const config = {
  matcher: "/",
};
