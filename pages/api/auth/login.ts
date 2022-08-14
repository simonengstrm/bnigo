import { NextApiRequest, NextApiResponse } from "next";
import DatabaseService from "../../../lib/db.service";
import cookie from "cookie";
import bcrypt from "bcryptjs";
import jose from "jose";
import { KeyObject } from "crypto";

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

      const jwt = new jose.SignJWT({"username": body.user.username}).sign(new TextEncoder().encode(process.env.JWT_SECRET));

      const headers = cookie.serialize("bnigoLoggedIn", "true", {
          path: "/",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        });
      res.setHeader("Set-Cookie", headers);
      res.status(200).json({ message: "Logged in" });
    } else {
      // Return error
      res.status(401).json({error: "Invalid username or password"});
    }
  } else {
    res.status(405).json({ error: "Method not allowed. You used "+req.method+" instead of POST" });
  }

}