import { NextRequest, NextResponse } from "next/server";

/**
 * Checks if the user is logged in
 * If so redirect to user
 * If not continue to login
 */

export default async function isLoggedIn(req : NextRequest) {
  if (req.cookies.bnigoLoggedIn) {
    return NextResponse.redirect(new URL("/user", req.url));
  }
  return NextResponse.next();
}