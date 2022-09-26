import { NextRequest, NextResponse } from "next/server";
import verify from "../../lib/auth.service";

/**
 * Checks if the user is logged in
 * If so redirect to user
 * If not continue to login
 */

export default async function isLoggedIn(req : NextRequest) {
  if (req.cookies.bnigoLoggedIn) {
    // Logged in or faulty cookie
    if (await verify(req.cookies.bnigoLoggedIn)) {
      console.log("Verified cookie");
      // Correct cookie
      return NextResponse.redirect(new URL("/user", req.url));
    }
    // Faulty cookie = continue to login
    return NextResponse.next();
  }
  // No cookie = cant be logged in
  return NextResponse.next();
}