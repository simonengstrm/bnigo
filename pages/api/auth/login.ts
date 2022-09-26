import { NextApiRequest, NextApiResponse } from "next";
import DatabaseService from "../../../lib/db.service";
import Cookies from "cookies";
import bcrypt from "bcryptjs";
import {SignJWT} from "jose";

export default async function login(req : NextApiRequest, res : NextApiResponse) {
  if (!process.env.JWT_SECRET) {
    res.status(500).json({error: "Internal server error"})
  }

  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const db = new DatabaseService();
    const dbuser = await db.getUser(body.user.username);

    if (!dbuser) {
      res.status(404).json({ message: "User not found" });
    }

    if (bcrypt.compareSync(body.user.password, dbuser.password)) {
      // Save logged in cookie

      const jwt = await new SignJWT({"username": body.user.username})
        .setProtectedHeader({ alg: "HS256" })
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));


      let cookies = new Cookies(req, res);
      cookies.set("bnigoLoggedIn", jwt, {
          path: "/",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          overwrite: true,
        });
      res.status(200).json({ message: "Logged in" });
    } else {
      // Return error
      res.status(401).json({error: "Invalid username or password"});
    }
  } else {
    res.status(405).json({ error: "Method not allowed. You used "+req.method+" instead of POST" });
  }

}