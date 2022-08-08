import DatabaseService from "../../lib/db.service";
import { hasCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { UnorderedBulkOperation } from "mongodb";

/**
 * Middleware for the user pages
 * Runs before the page is rendered
 */

export default async function isLoggedIn(req : NextRequest) {
  // Check if the logged in cookie is set
  if (!hasCookie("bnigoLoggedIn")) {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  return NextResponse.next();
}