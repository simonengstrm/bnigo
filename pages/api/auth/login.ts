import { NextApiRequest, NextApiResponse } from "next";
import DatabaseService from "../../../lib/db.service";
import { setCookie } from "cookies-next";

export default async function login(req : NextApiRequest, res : NextApiResponse) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const db = new DatabaseService();
    const dbpassword = (await db.getUser(body.user.username)).password;

    if (dbpassword == body.user.password) {
      // Save logged in cookie
      res.status(200).json({ message: "Login successfull" });
    } else {
      // Return error
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed. You used "+req.method+" instead of POST" });
  }

}