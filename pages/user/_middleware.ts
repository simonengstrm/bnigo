import DatabaseService from "../../lib/db.service";
import { hasCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for the user pages
 * Runs before the page is rendered
 */

export default async function isLoggedIn(req : NextRequest) {
  // Check if the logged in cookie is set
  if (!hasCookie("loggedIn")) {
    return NextResponse.redirect("/");
  }
  return NextResponse.next();
}