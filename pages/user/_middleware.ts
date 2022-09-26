import { NextRequest, NextResponse } from "next/server";
import verify from "../../lib/auth.service";
/**
 * Middleware for the user pages
 * Runs before the page is rendered
 */

export default async function isLoggedIn(req : NextRequest) {
  console.log("Running user middleware");
  // Check if jwt signature is valid
  if (req.cookies.bnigoLoggedIn) {
    if(await verify(req.cookies.bnigoLoggedIn)) {
      console.log("Verified cookie in user");
      return NextResponse.next();
    } else {
      console.log("Invalid cookie in user");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}