import DatabaseService from "../../lib/db.service";
import { NextRequest, NextResponse } from "next/server";
import { UnorderedBulkOperation } from "mongodb";

/**
 * Middleware for the user pages
 * Runs before the page is rendered
 */

export default async function isLoggedIn(req : NextRequest) {
  // Check if the logged in cookie is set
  if (!req.cookies.bnigoLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}