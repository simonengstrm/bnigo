import { NextApiRequest, NextApiResponse } from "next";
import DatabaseService from "../../../lib/db.service";
import { setCookie } from "cookies-next";


export default async function login(req : NextApiRequest, res : NextApiResponse) {
  const db = new DatabaseService();
  const dbpassword = (await db.getUser(req.body.user.username)).password;

  if (dbpassword == req.body.password) {
    // Save logged in cookie
    setCookie("bnigoLoggedIn", JSON.stringify(req.body.user), {maxAge: 60 * 60 * 24 * 7, httpOnly: true, sameSite: "strict", path: "/"});
    res.status(200).json({ message: "Logged in" });
  } else {
    // Return error
    res.status(404).json({ error: "Invalid username or password" });
  }
}